import { serverSupabaseClient } from '#supabase/server'
import { Entities } from '~/types'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') as string
  const client = await serverSupabaseClient(event)

  const { data, error } = await client
    .from(Entities.EPISODE)
    .select('code, title, slug, createdAt')
    .or(
      `characters.ilike.%${slug}%`,
      // Doc: https://supabase.com/docs/reference/javascript/v1/or
    )
    .order('code', { ascending: true })

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return data
})
