import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { likeableEntitiesIds, validEntityTypes } from '~/shared/utils/likes/likeableEntities'
import { Entities, type LikeableEntity } from '~/types'
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
    .eq(likeableEntitiesIds[entityType], entityId)
    .eq('userId', user.id)

  if (error) {
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la suppression du like'
    })
  }

  return { success: true }
}) 
