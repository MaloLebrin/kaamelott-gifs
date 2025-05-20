import { serverSupabaseClient } from '#supabase/server'
import { Entities, type LikeableEntity } from '~/types'
import { likeableEntitiesIds, validEntityTypes } from '~/shared/utils/likes/likeableEntities'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async event => {
  const entityType = getRouterParam(event, 'entityType') as LikeableEntity
  const entityId = getRouterParam(event, 'entityId')

  if (!entityType || !entityId) {
    throw createError({
      statusCode: 400,
      message: 'Entity type and ID are required'
    })
  }

  if (!validEntityTypes.includes(entityType as Entities)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid entity type'
    })
  }

  const client = await serverSupabaseClient<Database>(event)
  // Récupérer l'utilisateur
  const { data: { user }, error: userError } = await client.auth.getUser()

  if (userError) {
    console.error(userError, 'error fetching user')
  }
  
  let isLiked = false
  if (user) {
    // Vérifier si l'utilisateur a liké
    const { data: likeData } = await client
      .from(Entities.LIKE)
      .select('id')
      .eq(likeableEntitiesIds[entityType], entityId)
      .eq('userId', user.id)
      .single()

    isLiked = !!likeData
  }

  // Récupérer le nombre de likes
  const { count, error } = await client
    .from(Entities.LIKE)
    .select('*', { count: 'exact', head: true })
    .eq(likeableEntitiesIds[entityType], entityId)

  if (error) {
    console.error(error, 'error fetching likes count')
  }

  return {
    isLiked,
    likesCount: count || 0
  }
}) 
