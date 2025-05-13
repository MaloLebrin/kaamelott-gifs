import { formatFromBackToFront } from '~/shared/utils/gifs/formatFromBackToFront'
import { serverSupabaseClient } from '#supabase/server'
import { Entities } from '~/types'
import { slugify } from '~/shared/utils/string'
import { charactersData } from '~/server/data/characters'

export default defineEventHandler(async event => {
  const slug = getRouterParam(event, 'slug') as string

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug is required'
    })
  }

  const character = charactersData.find(character => slugify(character.name) === slug)
  const name = character?.name || slug

  const client = await serverSupabaseClient(event)

  const [{ data, error }, { data: characterData, error: characterError }] = await Promise.all([
    client
      .from(Entities.GIF)
      .select('*')
      .or(
        `characters.ilike.%${name}%,characters_speaking.ilike.%${name}%`,
      // Doc: https://supabase.com/docs/reference/javascript/v1/or
      ),
    client.from(Entities.CHARACTER).select('*').eq('slug', slug).single()
  ])

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  if (characterError) {
    throw createError({ statusCode: 500, statusMessage: characterError.message })
  }

  return {
    gifs: formatFromBackToFront(data),
    character: characterData
  }
})
