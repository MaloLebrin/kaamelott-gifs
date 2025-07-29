import { serverSupabaseClient } from '#supabase/server'
import { Entities } from '~~/shared/types'
import type { Database } from '~~/shared/types/database.types'
import { formatFromBackToFront } from '~~/shared/utils/gifs/formatFromBackToFront'

export default defineEventHandler(async event => {
  const client = await serverSupabaseClient<Database>(event)

  // First get the episode to get its code
  const { data, error: episodeError } = await client
    .from(Entities.EPISODE)
    .select('*')
    .ilike('code', `%kv%`)

  if (episodeError) {
    throw createError({ statusCode: 500, statusMessage: episodeError.message })
  }

  const episodes = data as { characters: string }[]

  return formatFromBackToFront(episodes)
})
