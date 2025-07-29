import { serverSupabaseClient } from '#supabase/server'
import { Entities } from '~~/shared/types'
import type { CommentEntityType } from '~~/shared/types/Comments'
import type { Database } from '~~/shared/types/database.types'
import { unique } from '~~/shared/utils/array'
import { commentableEntitiesIds, isCommentable } from '~~/shared/utils/comments/commentableEntities'

export default defineEventHandler(async event => {
  const entityType = getRouterParam(event, 'entityType') as CommentEntityType
  const entityId = getRouterParam(event, 'entityId') as string

  if (!entityType || !entityId) {
    throw createError({
      statusCode: 400,
      message: 'Entity type and ID are required'
    })
  }

  // Vérifier que le type d'entité est valide
  if (!isCommentable(entityType as Entities)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid entity type'
    })
  }

  const client = await serverSupabaseClient<Database>(event)

  const { data: comments, error } = await client
    .from(Entities.COMMENT)
    .select('*')
    .eq('status', 'approved')
    .eq(commentableEntitiesIds[entityType], entityId)
    .order('createdAt', { ascending: false })

  if (error) {
    console.error(error, 'error fetching comments')
    throw createError({
      statusCode: 500,
      message: error.message
    })
  }

  const userIds = unique(comments.map(comment => comment.userId))
  const { data: profiles, error: profilesError } = await client
    .from('profiles')
    .select('*')
    .in('userId', userIds)

  if (profilesError) {
    console.error(profilesError, 'error fetching profiles')
    throw createError({
      statusCode: 500,
      message: profilesError.message
    })
  }

  return comments.map(comment => ({
    ...comment,
    profile: profiles.find(p => p.userId === comment.userId)
  }));
}) 
