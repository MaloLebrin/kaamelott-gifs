import { serverSupabaseClient } from '#supabase/server'
import { Entities } from '~~/shared/types'
import type { Episode } from '~~/shared/types/Episode'
import type { Database } from '~~/shared/types/database.types'
import { formatFromBackToFront } from '~~/shared/utils/gifs/formatFromBackToFront'

export default defineEventHandler(async event => {
  const slug = getRouterParam(event, 'slug') as string

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }

  const client = await serverSupabaseClient<Database>(event)

  // First get the episode to get its code
  const { data: episodeData, error: episodeError } = await client
    .from(Entities.EPISODE)
    .select('*')
    .eq('slug', slug)
    .single()

  if (episodeError) {
    throw createError({ statusCode: 500, statusMessage: episodeError.message })
  }

  if (!episodeData) {
    throw createError({ statusCode: 404, statusMessage: 'Episode not found' })
  }

  const episode = episodeData as Episode

  // Then get the gifs for this episode
  const { data: gifsData, error: gifsError } = await client
    .from(Entities.GIF)
    .select('*')
    .eq('episode', episode.code)

  if (gifsError) {
    throw createError({ statusCode: 500, statusMessage: gifsError.message })
  }

  return {
    gifs: formatFromBackToFront(gifsData || []),
    episode: formatFromBackToFront([episode as unknown as { characters: string }])[0],
  }
}) 
