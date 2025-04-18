import { formatFromBackToFront } from '~/shared/utils/gifs/formatFromBackToFront'
import { serverSupabaseClient } from '#supabase/server'
import { Entities } from '~/types'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') as string

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'slug is required'
    })
  }

  const client = await serverSupabaseClient(event)

  const { data, error } = await client
    .from(Entities.GIF)
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return formatFromBackToFront([data])[0]
})
