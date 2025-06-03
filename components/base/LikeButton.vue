<template>
<button
  :class="[
    'inline-flex items-center gap-2 rounded-full px-3 py-1.5 cursor-pointer',
    'transition-all duration-200  disabled:cursor-not-allowed',
    {
      'bg-red-500/10 hover:bg-red-500/20 animate-heartBeat': isLiked,
      'bg-gray-100 hover:bg-gray-200/60': !isLiked,
      'text-sm px-2 py-1': size === 'sm',
      'text-base': size === 'md' || !size,
      'text-lg': size === 'lg',
    }
  ]"
  :disabled="isLoading"
  type="button"
  :aria-label="`Like ${entityType}`"
  @click="handleClick">
  <div class="relative flex items-center justify-center">
    <Icon
      :class="[
        'text-xl transition-transform duration-200',
        {
          'scale-110': isLiked,
          'scale-90': !isLiked
        }
      ]"
      :name="isLiked ? 'ph:heart-fill' : 'ph:heart'" />
  </div>
  <span class="font-medium tabular-nums text-gray-800">{{ likesCount.toLocaleString('fr-FR') }}</span>
</button>
</template>

<script setup lang="ts">
import { successLikeMessage } from '~/shared/utils/likes/likeableEntities';
import { useUiStore } from '~/stores/uiStore'
import { ModalNames } from '~/stores/uiStore/state'
import type { EpisodeCode, LikeableEntity } from '~/types'

const props = withDefaults(defineProps<{
  entityId: number | EpisodeCode
  entityType: LikeableEntity
  size?: 'sm' | 'md' | 'lg'
}>(), {
  size: 'md'
})

const user = useSupabaseUser()
const uiStore = useUiStore()
const { success, denied } = useToast()

// États
const isLoading = ref(false)
const isLiked = ref(false)
const likesCount = ref(0)

/**
   * Vérifie l'état initial des likes pour l'entité
   * @private
   */
const checkInitialState = async () => {
  try {
    const { data } = await useFetch<{
      isLiked: boolean
      likesCount: number
    }>(`/api/likes/${props.entityType}/${props.entityId}`, {
      headers: useRequestHeaders(['cookie']),
    })
    if (data.value) {
      isLiked.value = data.value.isLiked
      likesCount.value = data.value.likesCount
    }
  } catch (error) {
    console.error('Error checking initial state:', error)
  }
}

/**
   * Bascule l'état du like pour l'entité
   * Gère les mises à jour optimistes et le rollback en cas d'erreur
   * @private
   */
const toggleLike = async () => {
  const previousLikedState = isLiked.value
  const previousCount = likesCount.value

  try {
    isLoading.value = true

    // Optimistic update
    isLiked.value = !isLiked.value
    likesCount.value += isLiked.value ? 1 : -1

    if (isLiked.value) {
      // Ajouter le like
      const { error } = await useFetch(`/api/likes/${props.entityType}/${props.entityId}`, {
        method: 'POST',
        headers: useRequestHeaders(['cookie'])
      })

      if (error.value) throw error.value
        
      success(successLikeMessage[props.entityType])
    } else {
      // Retirer le like
      const { error } = await useFetch(`/api/likes/${props.entityType}/${props.entityId}`, {
        method: 'DELETE',
        headers: useRequestHeaders(['cookie'])
      })

      if (error.value) throw error.value
      success('Like retiré')
    }
     
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Rollback en cas d'erreur
    isLiked.value = previousLikedState
    likesCount.value = previousCount
      
    console.error('Error toggling like:', error)
    denied(error.data?.message || 'Erreur lors du like')
  } finally {
    isLoading.value = false
  }
}

// Vérifier l'état initial au montage
onMounted(async () => {
  await checkInitialState()
})

const handleClick = async () => {
  if (!user.value) {
    uiStore.openModal(ModalNames.AUTH_MODAL, window.location.href)
    return
  }

  await toggleLike()
}
</script>
