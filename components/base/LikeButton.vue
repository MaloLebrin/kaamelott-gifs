<template>
<button
  :class="[
    'inline-flex items-center gap-2 rounded-full px-3 py-1.5 cursor-pointer',
    'transition-all duration-200 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed',
    {
      'bg-red-500/10 hover:bg-red-500/20 animate-heartBeat': isLiked,
      'bg-gray-200/10 hover:bg-gray-200/20': !isLiked,
      'text-sm px-2 py-1': size === 'sm',
      'text-base': size === 'md' || !size,
      'text-lg px-4 py-2': size === 'lg'
    }
  ]"
  :disabled="isLoading"
  type="button"
  :aria-label="`Like ${entityType}`"
  @click="toggleLike">
  <div class="relative flex items-center justify-center">
    <Icon
      :class="[
        'text-xl transition-transform duration-200',
        isLiked ? 'ph:heart-fill text-red-500 scale-110' : 'ph:heart',
      ]"
      :name="isLiked ? 'ph:heart-fill' : 'ph:heart'" />
  </div>
  <span class="font-medium tabular-nums text-gray-800">{{ likesCount.toLocaleString('fr-FR') }}</span>
</button>
</template>

<script setup lang="ts">
import { useLike } from '~/composables/useLike'
import type { EpisodeCode, LikeableEntity } from '~/types'

const props = withDefaults(defineProps<{
  entityId: number | EpisodeCode
  entityType: LikeableEntity
  size?: 'sm' | 'md' | 'lg'
}>(), {
  size: 'md'
})

const { isLoading, isLiked, likesCount, toggleLike } = useLike(props.entityId, props.entityType)
</script>
