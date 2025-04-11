import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const character = query.character as string | undefined

    // Lire le fichier gifs.json
    const gifsPath = join(process.cwd(), 'content', 'gifs.json')
    const gifsData = await readFile(gifsPath, 'utf-8')
    const gifs = JSON.parse(gifsData)

    // Filtrer par personnage si spécifié
    if (character) {
      return gifs.filter((gif: any) => 
        gif.characters.includes(character)
      )
    }

    return gifs
  } catch (error) {
    console.error('Error reading gifs data:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching gifs'
    })
  }
}) 
