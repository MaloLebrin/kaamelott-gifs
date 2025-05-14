import { useToast } from './useToast'
import { Entities, type LikeableEntity } from '~/types'

const successMessages = {
  [Entities.GIF]: 'GIF liké !',
  [Entities.CHARACTER]: 'Personnage liké !',
  [Entities.EPISODE]: 'Épisode liké !',
  [Entities.SEASON]: 'Saison likée !'
}

interface LikeState {
  isLiked: boolean
  likesCount: number
}

export const useLike = (entityId: number, entityType: LikeableEntity) => {
  const { success, denied } = useToast()
  
  // États
  const isLoading = ref(false)
  const isLiked = ref(false)
  const likesCount = ref(0)

  // Vérifier l'état initial
  const checkInitialState = async () => {
    try {
      const { data } = await useFetch<LikeState>(`/api/likes/${entityType}/${entityId}`)
      if (data.value) {
        isLiked.value = data.value.isLiked
        likesCount.value = data.value.likesCount
      }
    } catch (error) {
      console.error('Error checking initial state:', error)
    }
  }

  // Gérer le like/unlike
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
        const { error } = await useFetch(`/api/likes/${entityType}/${entityId}`, {
          method: 'POST'
        })

        if (error.value) throw error.value
        
        success(successMessages[entityType])
      } else {
        // Retirer le like
        const { error } = await useFetch(`/api/likes/${entityType}/${entityId}`, {
          method: 'DELETE'
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
  onMounted(() => {
    checkInitialState()
  })

  return {
    isLoading,
    isLiked,
    likesCount,
    toggleLike
  }
} 
