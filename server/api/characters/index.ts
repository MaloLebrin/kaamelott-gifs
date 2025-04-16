import { gifs } from '~/server/data/gifs'
import { slugify } from '~/shared/utils/string'

export default defineEventHandler(async () => {
  try {
    
    // Créer un Set pour avoir des personnages uniques
    const characters = new Set<string>()
    gifs.forEach((gif: any) => {
      gif.characters.forEach((character: string) => {
        characters.add(character)
      })
    })

    // Convertir le Set en Array et trier
    const sortedCharacters = Array.from(characters).sort()

    // Créer la liste des personnages avec leurs avatars
    return sortedCharacters.map(character => ({
      name: character,
      avatar: `/characters/${slugify(character)}.jpg`
    }))
  } catch (error) {
    console.error('Error reading gifs data:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching characters'
    })
  }
}) 
