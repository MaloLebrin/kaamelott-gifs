import { formatFromBackToFront } from '~/shared/utils/gifs/formatFromBackToFront'
import { serverSupabaseClient } from '#supabase/server'
import { Entities } from '~/types'
import { slugify } from '~/shared/utils/string'
import { characters } from '~/server/data/characters' 

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') as string

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug is required'
    })
  }

  const character = characters.find((character) => slugify(character.personnage) === slug)
  const name = character?.personnage || slug

  const client = await serverSupabaseClient(event)

  const { data, error } = await client
    .from(Entities.GIF)
    .select('*')
    .or(
      `characters.ilike.%${name}%,characters_speaking.ilike.%${name}%`,
      // Doc: https://supabase.com/docs/reference/javascript/v1/or
    )

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }

  return {
    gifs: formatFromBackToFront(data),
    character: {
      ...character,
      name,
      slug: slugify(name)
    }
  }
})
