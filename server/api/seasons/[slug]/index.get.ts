import { serverSupabaseClient } from '#supabase/server'
import { Entities } from '~/types'
import { formatFromBackToFront } from '~/shared/utils/gifs/formatFromBackToFront'
import type { Season } from '~/types/Season'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async event => {
  const slug = getRouterParam(event, 'slug') as string

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }

  const client = await serverSupabaseClient<Database>(event)

  const { data: seasonData, error } = await client
    .from(Entities.SEASON)
    .select('*')

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  if (!seasonData) {
    throw createError({ statusCode: 404, statusMessage: 'Season not found' })
  }

  const seasons = seasonData as Season[]

  const season = seasons.find(season => season.slug === slug)

  if (!season) {
    throw createError({ statusCode: 404, statusMessage: 'Season not found' })
  }

  const { data: gifsData, error: gifsError } = await client
    .from(Entities.GIF)
    .select('*')
    .ilike('episode', `%S0${season.id}%`)

  const { data: episodesData, error: episodesError } = await client
    .from(Entities.EPISODE)
    .select('*')
    .ilike('code', `%S0${season.id}%`)
    .order('code', { ascending: true })

  if (gifsError) {
    throw createError({ statusCode: 500, statusMessage: gifsError.message })
  }

  return {
    season,
    episodes: formatFromBackToFront(episodesData || []),
    gifs: formatFromBackToFront(gifsData || []),
    otherSeasons: seasons.filter(s => s.id !== season.id)
  }
})
