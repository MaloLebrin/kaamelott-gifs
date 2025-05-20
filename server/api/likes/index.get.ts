import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { orderingLikes } from '~/shared/utils/likes/orderingLikes'
import type { Database } from '~/types/database.types'
import type { LikeWithRelation } from '~/types/Like'

export default defineEventHandler(async event => {
  const client = await serverSupabaseClient<Database>(event)
  const user = await serverSupabaseUser(event)
  const query = getQuery(event)
  
  // const entityType = query.type as Entities | undefined
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

  const {
    data: likes,
    error,
    count,
  } = await client
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
    .order('createdAt', { ascending: false })
    .range(from, to)
    .overrideTypes<LikeWithRelation[]>( )

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
