import { serverSupabaseClient } from '#supabase/server'
import { Entities, Gif } from '~/types'
import { formatFromBackToFront } from '~/shared/utils/gifs/formatFromBackToFront'
import type { Season } from '~/types/Season'
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') as string

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }

  const client = await serverSupabaseClient(event)

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

  const season = seasons.find((season) => season.slug === slug)

  if (!season) {
    throw createError({ statusCode: 404, statusMessage: 'Season not found' })
  }

  const { data: gifsData, error: gifsError } = await client
    .from(Entities.GIF)
    .select('*')
    .ilike('episode', `%S0${season.id}%`)

  if (gifsError) {
    throw createError({ statusCode: 500, statusMessage: gifsError.message })
  }

  return {
    season,
    gifs: formatFromBackToFront(gifsData || []),
    otherSeasons: seasons.filter((s) => s.id !== season.id)
  }
})
