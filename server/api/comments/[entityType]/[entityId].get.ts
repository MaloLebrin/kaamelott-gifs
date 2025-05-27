import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'
import { Entities } from '~/types'
import { commentableEntitiesIds, isCommentable } from '~/shared/utils/comments/commentableEntities'
import type { CommentEntityType } from '~/types/Comments'

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

  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient<Database>(event)

  const { data: comments, error } = await client
    .from(Entities.COMMENT)
    .select(`
    *,
    users (*),
  `)
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

  // // Transformer les données pour inclure les informations utilisateur
  // const commentsWithUser: CommentWithUser[] = comments.map(comment => ({
  //   ...comment,
  //   user: comment.user ? {
  //     id: comment.user.id,
  //     name: comment.user.user_metadata?.full_name || comment.user.email,
  //     avatar: comment.user.user_metadata?.avatar_url
  //   } : undefined
  // }))

  return comments
}) 
