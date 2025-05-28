import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { Entities } from '~/types'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async event => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Vous devez être connecté pour supprimer un commentaire'
    })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'ID de commentaire requis'
    })
  }

  const commentId = parseInt(id, 10)
  if (isNaN(commentId)) {
    throw createError({
      statusCode: 400,
      message: 'ID de commentaire invalide'
    })
  }

  const client = await serverSupabaseClient<Database>(event)

  // Vérifier que le commentaire existe et appartient à l'utilisateur
  const { data: comment, error: fetchError } = await client
    .from(Entities.COMMENT)
    .select('id')
    .eq('id', commentId)
    .eq('userId', user.id)
    .single()

  if (fetchError || !comment) {
    throw createError({
      statusCode: 404,
      message: 'Commentaire non trouvé ou vous n\'avez pas les droits pour le supprimer'
    })
  }

  // Supprimer le commentaire
  const { error: deleteError } = await client
    .from(Entities.COMMENT)
    .delete()
    .eq('id', commentId)
    .eq('userId', user.id)

  if (deleteError) {
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la suppression du commentaire'
    })
  }

  return { success: true }
})
