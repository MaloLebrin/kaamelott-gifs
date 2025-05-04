import { serverSupabaseClient } from '#supabase/server'
import { Entities } from '~/types'
import { formatFromBackToFront } from '~/shared/utils/gifs/formatFromBackToFront'

export default defineEventHandler(async event => {
  const client = await serverSupabaseClient(event)

  const { data, error } = await client.from(Entities.GIF).select('*')

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return formatFromBackToFront(data)
})
