import type { CommentWithUser } from '~/types/Comments'
import { Entities, type LikeableEntity } from '~/types/Entities'

interface UseCommentFormOptions {
  /** Type d'entité (gif, character, episode, season) */
  entityType?: LikeableEntity
  /** ID de l'entité */
  entityId?: string | number
  /** ID du commentaire à modifier (optionnel) */
  commentId?: number
  /** Contenu initial du commentaire (pour la modification) */
  initialContent?: string
  /** Callback appelé après une modification réussie */
  onSuccess?: () => void
}

/**
 * Composable pour gérer le formulaire de commentaire (création et modification)
 * 
 * @param {UseCommentFormOptions} options - Options de configuration
 * @returns {Object} Un objet contenant l'état et les méthodes de gestion du formulaire
 */
export const useCommentForm = (options: UseCommentFormOptions = {}) => {
  const { success, denied } = useToast()

  // États
  const content = ref(options.initialContent || '')
  const isSubmitting = ref(false)

  const isContentFull = computed(() => content.value.length >= 1000)
  const isSubmitButtonDisabled = computed(() => 
    isSubmitting.value || 
    !content.value.trim() || 
    isContentFull.value || 
    content.value === options.initialContent
  )

  /**
   * Gère la soumission du formulaire (création ou modification)
   * @async
   * @throws {Error} Si une erreur survient lors de la requête API
   */
  async function handleSubmit() {
    if (isSubmitButtonDisabled.value) return

    isSubmitting.value = true
    try {
      if (options.commentId) {
        // Modification d'un commentaire existant
        const { error } = await useFetch(`/api/comments/${options.commentId}`, {
          method: 'PATCH',
          body: {
            content: content.value.trim()
          }
        })

        if (error.value) throw error.value
        success('Commentaire modifié avec succès')
      } else if (options.entityType && options.entityId) {
        // Création d'un nouveau commentaire
        const commentInput = {
          content: content.value.trim(),
          ...(options.entityType === Entities.GIF && { gifId: Number(options.entityId) }),
          ...(options.entityType === Entities.CHARACTER && { characterId: Number(options.entityId) }),
          ...(options.entityType === Entities.EPISODE && { episodeCode: options.entityId }),
          ...(options.entityType === Entities.SEASON && { seasonId: Number(options.entityId) })
        }

        const { error } = await useFetch<CommentWithUser>('/api/comments', {
          method: 'POST',
          body: commentInput
        })

        if (error.value) throw error.value
        content.value = ''
        success('Commentaire publié avec succès')
      }

      options.onSuccess?.()
    } catch (error) {
      console.error('Erreur lors de la soumission du commentaire:', error)
      denied(options.commentId 
        ? 'Impossible de modifier le commentaire'
        : 'Impossible de publier le commentaire'
      )
    } finally {
      isSubmitting.value = false
    }
  }

  /**
   * Réinitialise le formulaire
   */
  function reset() {
    content.value = options.initialContent || ''
  }

  return {
    content,
    isSubmitting,
    handleSubmit,
    reset,
    isContentFull,
    isSubmitButtonDisabled
  }
} 
