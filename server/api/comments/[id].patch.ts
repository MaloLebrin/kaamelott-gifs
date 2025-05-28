import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { Entities } from '~/types'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async event => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Vous devez être connecté pour modifier un commentaire'
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

  const body = await readBody(event)
  const content = body.content

  if (!content || typeof content !== 'string' || content.length > 1000) {
    throw createError({
      statusCode: 400,
      message: 'Le contenu du commentaire est invalide (1-1000 caractères)'
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
      message: 'Commentaire non trouvé ou vous n\'avez pas les droits pour le modifier'
    })
  }

  // Mettre à jour le commentaire
  const { data: updatedComment, error: updateError } = await client
    .from(Entities.COMMENT)
    .update({
      content,
      updatedAt: new Date().toISOString()
    })
    .eq('id', commentId)
    .eq('userId', user.id)
    .select('*')
    .single()

  if (updateError) {
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la modification du commentaire'
    })
  }

  const { data: profile, error: profileError } = await client
    .from(Entities.PROFILE)
    .select('*')
    .eq('userId', updatedComment.userId)

  if (profileError) {
    console.error(profileError, 'error fetching profile')
    throw createError({
      statusCode: 500,
      message: profileError.message
    })
  }

  return {
    ...updatedComment,
    profile
  }
})
