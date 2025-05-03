import { serverSupabaseClient } from '#supabase/server'
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

    // Créer un Set pour avoir des personnages uniques
    const characters = new Set<string>()
    data.forEach((gif: any) => {
      const charactersArrays = gif.characters.split(',')
      const charactersSpeakingArrays = gif.characters_speaking?.split(',') || []

      charactersArrays.forEach((character: string) => {
        characters.add(character)
      })
      charactersSpeakingArrays.forEach((character: string) => {
        characters.add(character)
      })
    })

    // Convertir le Set en Array et trier
    const sortedCharacters = Array.from(characters).sort()

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
