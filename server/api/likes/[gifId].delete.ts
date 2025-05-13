import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { Entities } from '~/types'
export default defineEventHandler(async event => {
  const gifId = getRouterParam(event, 'gifId')
  if (!gifId) {
    throw createError({
      statusCode: 400,
      message: 'GIF ID is required'
    })
  }

  const client = await serverSupabaseClient(event)
  
  // Vérifier l'authentification
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Vous devez être connecté pour retirer un like'
    })
  }

  // Retirer le like
  const { error } = await client
    .from(Entities.LIKE)
    .delete()
    .eq('gifId', gifId)
    .eq('userId', user.id)

  if (error) {
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la suppression du like'
    })
  }

  return { success: true }
}) 
