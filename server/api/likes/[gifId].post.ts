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
      message: 'Vous devez être connecté pour liker un GIF'
    })
  }

  // Vérifier si le like existe déjà
  const { data: existingLike } = await client
    .from(Entities.LIKE)
    .select('id')
    .eq('gifId', gifId)
    .eq('userId', user.id)
    .single()

  if (existingLike) {
    throw createError({
      statusCode: 400,
      message: 'Vous avez déjà liké ce GIF'
    })
  }

  // Ajouter le like
  const { error } = await client
    .from(Entities.LIKE)
    .insert([{
      gifId,
      userId: user.id
    }] as never)

  if (error) {
    console.error('Erreur lors de l\'ajout du like:', error)
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de l\'ajout du like'
    })
  }

  return { success: true }
}) 
