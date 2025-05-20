import { serverSupabaseClient } from '#supabase/server'
import { Entities } from '~/types'
import { formatFromBackToFront } from '~/shared/utils/gifs/formatFromBackToFront'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async event => {
  const client = await serverSupabaseClient<Database>(event)

  // First get the episode to get its code
  const { data, error: episodeError } = await client
    .from(Entities.EPISODE)
    .select('*')

  if (episodeError) {
    throw createError({ statusCode: 500, statusMessage: episodeError.message })
  }

  const episodes = data as { characters: string }[]

  return formatFromBackToFront(episodes)
})
