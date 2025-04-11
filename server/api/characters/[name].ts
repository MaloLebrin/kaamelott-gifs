import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export default defineEventHandler(async (event) => {
  try {
    const name = getRouterParam(event, 'name')
    
    // Lire le fichier gifs.json
    const gifsPath = join(process.cwd(), 'content', 'gifs.json')
    const gifsData = await readFile(gifsPath, 'utf-8')
    const gifs = JSON.parse(gifsData)

    // Trouver le premier GIF où le personnage apparaît
    const characterGif = gifs.find((gif: any) => 
      gif.characters.includes(name)
    )

    if (!characterGif) {
      throw createError({
        statusCode: 404,
        message: `Character ${name} not found`
      })
    }

    return {
      name,
      avatar: `/characters/${name?.toLowerCase().replace(/\s+/g, '-')}.jpg`
    }
  } catch (error) {
    console.error('Error fetching character:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching character'
    })
  }
}) 
