import { serverSupabaseClient } from '#supabase/server'
import { composeCharacters } from '~/shared/utils/characters/composeCharacters'
import { slugify } from '~/shared/utils/string'
import { Entities, Gif } from '~/types'

export default defineEventHandler(async (event) => {
  try {
    const client = await serverSupabaseClient(event)
    const { data = [], error } = await client.from(Entities.GIF).select('characters, characters_speaking')

    if (error) {
      throw createError({
        statusCode: 500,
        message: 'Error fetching characters'
      })
    }

    if (!data) {
      return []
    }

    const gifs = data as Pick<Gif, 'characters' | 'characters_speaking'>[]

    const sortedCharacters = composeCharacters(data)

    // Créer la liste des personnages avec leurs avatars
    return sortedCharacters.map(character => ({
      name: character,
      avatar: `/characters/${slugify(character)}.jpg`,
      nbGifs: gifs.filter(gif => gif.characters.includes(character) || gif.characters_speaking?.includes(character)).length
    }))
  } catch (error) {
    console.error('Error reading gifs data:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching characters'
    })
  }
}) 
