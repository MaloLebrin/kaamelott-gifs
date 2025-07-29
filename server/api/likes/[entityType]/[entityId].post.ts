import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { Entities, type LikeableEntity } from '~~/shared/types'
import type { Database } from '~~/shared/types/database.types'
import { likeableEntitiesIds, validEntityTypes } from '~~/shared/utils/likes/likeableEntities'

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
      message: 'Vous devez être connecté pour liker'
    })
  }

  // Vérifier si le like existe déjà
  const { data: existingLike } = await client
    .from(Entities.LIKE)
    .select('id')
    .eq(likeableEntitiesIds[entityType], entityId)
    .eq('userId', user.id)
    .single()

  if (existingLike) {
    throw createError({
      statusCode: 400,
      message: 'Vous avez déjà liké cet élément'
    })
  }

  // Ajouter le like
  const { error } = await client
    .from(Entities.LIKE)
    .insert([{
      [likeableEntitiesIds[entityType]]: entityId,
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
