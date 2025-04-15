import { gifs } from '~/server/data/gifs'
import { slugify } from '~/utils/strings'

export default defineEventHandler(async (event) => {
  try {
    const name = getRouterParam(event, 'name')

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
      avatar: `/characters/${(slugify(name!))}.jpg`
    }
  } catch (error) {
    console.error('Error fetching character:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching character'
    })
  }
}) 
