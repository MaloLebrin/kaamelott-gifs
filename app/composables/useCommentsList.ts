import type { CommentWithUser } from '~~/shared/types/Comments'
import { Entities, type LikeableEntity } from '~~/shared/types/Entities'

interface UseCommentsListOptions {
  /** Type d'entité (gif, character, episode, season) */
  entityType: LikeableEntity
  /** ID de l'entité */
  entityId: string | number
}

/**
 * Composable pour gérer la liste des commentaires et leur soumission
 * 
 * @param {UseCommentsListOptions} options - Options de configuration
 * @returns {Object} Un objet contenant l'état et les méthodes de gestion des commentaires
 * @property {Ref<CommentWithUser[]>} comments - Liste des commentaires
 * @property {Ref<string>} content - Contenu du commentaire en cours de rédaction
 * @property {Ref<boolean>} isSubmitting - Indique si la soumission est en cours
 * @property {Function} handleSubmit - Fonction pour soumettre un nouveau commentaire
 * @property {Function} loadComments - Fonction pour charger les commentaires
 */
export const useCommentsList = (options: UseCommentsListOptions) => {
  const { success, denied } = useToast()

  // États
  const comments = ref<CommentWithUser[]>([])
  const content = ref('')
  const isSubmitting = ref(false)
  const isLoading = ref(true)

  /**
   * Charge les commentaires pour une entité spécifique
   * @async
   * @throws {Error} Si une erreur survient lors de la requête API
   */
  async function loadComments() {
    try {
      const { data, error, pending } = await useFetch<CommentWithUser[]>(`/api/comments/${options.entityType}/${options.entityId}`, {
        deep: true
      })

      if (error.value) throw error.value
      isLoading.value = pending.value
      comments.value = data.value || []
    } catch (error) {
      console.error('Erreur lors du chargement des commentaires:', error)
      denied('Impossible de charger les commentaires')
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Gère la soumission d'un nouveau commentaire
   * @async
   * @throws {Error} Si une erreur survient lors de la requête API
   */
  async function handleSubmit() {
    if (!content.value.trim() || isSubmitting.value) return

    isSubmitting.value = true
    try {
      const commentInput = {
        content: content.value.trim(),
        ...(options.entityType === Entities.GIF && { gifId: Number(options.entityId) }),
        ...(options.entityType === Entities.CHARACTER && { characterId: Number(options.entityId) }),
        ...(options.entityType === Entities.EPISODE && { episodeCode: options.entityId }),
        ...(options.entityType === Entities.SEASON && { seasonId: Number(options.entityId) })
      }

      const { data, error } = await useFetch<CommentWithUser>('/api/comments', {
        method: 'POST',
        body: commentInput
      })

      if (error.value) throw error.value

      // Ajouter le nouveau commentaire à la liste
      comments.value = [data.value as NonNullable<CommentWithUser>, ...comments.value]
      content.value = ''
      success('Commentaire publié avec succès')
    } catch (error) {
      console.error('Erreur lors de la publication du commentaire:', error)
      denied('Impossible de publier le commentaire')
    } finally {
      isSubmitting.value = false
    }
  }

  // Charger les commentaires au montage
  onMounted(async () => {
    await loadComments()
  })

  const isContentFull = computed(() => content.value?.length >= 1000)

  return {
    comments,
    content,
    isSubmitting,
    handleSubmit,
    loadComments,
    isLoading,
    isContentFull,
  }
} 
