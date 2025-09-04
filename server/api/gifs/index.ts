import { serverSupabaseClient } from '#supabase/server'
import { Entities } from '~~/shared/types'
import type { Database } from '~~/shared/types/database.types'
import { formatFromBackToFront } from '~~/shared/utils/gifs/formatFromBackToFront'

export default defineCachedEventHandler(async event => {
  const client = await serverSupabaseClient<Database>(event)

  const { data, error } = await client.from(Entities.GIF).select('*')

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return formatFromBackToFront(data)
}, {
  swr: true,
})
