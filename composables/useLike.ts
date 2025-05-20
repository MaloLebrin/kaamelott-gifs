/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToast } from './useToast'
import { Entities, type EpisodeCode, type LikeableEntity } from '~/types'

/** Messages de succès pour chaque type d'entité */
const successMessages = {
  [Entities.GIF]: 'GIF liké !',
  [Entities.CHARACTER]: 'Personnage liké !',
  [Entities.EPISODE]: 'Épisode liké !',
  [Entities.SEASON]: 'Saison likée !'
}

/** État d'un like pour une entité */
interface LikeState {
  /** Indique si l'entité est likée par l'utilisateur courant */
  isLiked: boolean
  /** Nombre total de likes sur l'entité */
  likesCount: number
}

/**
 * Composable pour gérer les likes sur une entité (GIF, Personnage, Épisode, Saison).
 * Gère l'état des likes, le compteur et les interactions avec l'API.
 * 
 * @param {number | EpisodeCode} entityId - L'identifiant de l'entité à liker
 * @param {LikeableEntity} entityType - Le type d'entité (gif, character, episode, season)
 * 
 * @returns {Object} Un objet contenant l'état et les méthodes de gestion des likes
 * @property {Ref<boolean>} isLoading - Indique si une opération de like est en cours
 * @property {Ref<boolean>} isLiked - Indique si l'entité est likée par l'utilisateur courant
 * @property {Ref<number>} likesCount - Le nombre total de likes sur l'entité
 * @property {Function} toggleLike - Fonction pour liker/unliker l'entité
 * 
 * @example
 * ```ts
 * const { isLoading, isLiked, likesCount, toggleLike } = useLike(gifId, 'gif')
 * ```
 */
export const useLike = (entityId: number | EpisodeCode, entityType: LikeableEntity) => {
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
      const { data } = await useFetch<LikeState>(`/api/likes/${entityType}/${entityId}`, {
        headers: useRequestHeaders(['cookie'])
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
        const { error } = await useFetch(`/api/likes/${entityType}/${entityId}`, {
          method: 'POST',
          headers: useRequestHeaders(['cookie'])
        })

        if (error.value) throw error.value
        
        success(successMessages[entityType])
      } else {
        // Retirer le like
        const { error } = await useFetch(`/api/likes/${entityType}/${entityId}`, {
          method: 'DELETE',
          headers: useRequestHeaders(['cookie'])
        })

        if (error.value) throw error.value
        success('Like retiré')
      }
     
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

  return {
    isLoading,
    isLiked,
    likesCount,
    toggleLike
  }
} 
