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
  
  // Récupérer l'utilisateur
  const user = await serverSupabaseUser(event)
  
  let isLiked = false
  if (user) {
    // Vérifier si l'utilisateur a liké
    const { data: likeData } = await client
      .from(Entities.LIKE)
      .select('id')
      .eq('gifId', gifId)
      .eq('userId', user.id)
      .single()

    isLiked = !!likeData
  }

  // Récupérer le nombre de likes
  const { count } = await client
    .from(Entities.LIKE)
    .select('*', { count: 'exact', head: true })
    .eq('gifId', gifId)

  return {
    isLiked,
    likesCount: count || 0
  }
}) 
