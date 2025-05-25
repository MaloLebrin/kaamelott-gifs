import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '~/types/database.types'
import type { CommentEntityType, CommentWithUser } from '~/types/Comments'
import { Entities } from '~/types'
import { isCommentable } from '~/shared/utils/comments/commentableEntities'

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
  if (!isCommentable(entityType)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid entity type'
    })
  }

  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient<Database>(event)

  // Construire la requête en fonction du type d'entité
  let query = client
    .from(Entities.COMMENT)
    .select(`
      *,
      user:userId (
        id,
        email,
        user_metadata
      )
    `)
    .eq('status', 'approved')
    .order('createdAt', { ascending: false })

  // Ajouter la condition en fonction du type d'entité
  switch (entityType) {
    case 'gif':
      query = query.eq('gifId', parseInt(entityId))
      break
    case 'character':
      query = query.eq('characterId', parseInt(entityId))
      break
    case 'episode':
      query = query.eq('episodeCode', entityId as string)
      break
    case 'season':
      query = query.eq('seasonId', parseInt(entityId))
      break
  }

  const { data: comments, error } = await query

  if (error) {
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
