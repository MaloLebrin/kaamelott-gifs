import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { LikeableEntity } from '~~/shared/types/Entities'
import type { LikeWithRelation } from '~~/shared/types/Like'
import type { Database } from '~~/shared/types/database.types'
import { likeableEntitiesIds } from '~~/shared/utils/likes/likeableEntities'
import { orderingLikes } from '~~/shared/utils/likes/orderingLikes'

export default defineEventHandler(async event => {
  const client = await serverSupabaseClient<Database>(event)
  const user = await serverSupabaseUser(event)
  const query = getQuery(event)
  
  const entityType = query.type as LikeableEntity | undefined
  const currentPage = Number(query.page) || 1
  const itemsPerPage = Number(query.itemsPerPage) || 21

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const from = (currentPage - 1) * itemsPerPage
  const to = from + itemsPerPage - 1

  const queryBuilder = client
    .from('likes')
    .select(`
    *,
    gifs (*),
    characters (*),
    episodes (*),
    seasons (*)
  `, {
      count: 'exact',
    })
    .eq('userId', user.id)

  if (entityType) {
    queryBuilder.not(likeableEntitiesIds[entityType], 'is', null)
  }

  const {
    data: likes,
    error,
    count,
  } = await queryBuilder
    .order('createdAt', { ascending: false })
    .range(from, to)
    .overrideTypes<LikeWithRelation[]>()

  if (error) {
    throw createError({
      statusCode: 500,
      message: 'Erreur lors de la récupération des favoris'
    })
  }

  const totalPages = count ? Math.ceil(count / itemsPerPage) : 0
  
  return {
    likes: orderingLikes(likes),
    total: count || 0,
    page: currentPage,
    itemsPerPage,
    totalPages,
  }
}) 
