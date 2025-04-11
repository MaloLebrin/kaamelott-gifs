import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { slugify } from '~/utils/strings'

export default defineEventHandler(async () => {
  try {
    const gifsPath = join(process.cwd(), 'content', 'gifs.json')
    const gifsData = await readFile(gifsPath, 'utf-8')
    const gifs = JSON.parse(gifsData)

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
