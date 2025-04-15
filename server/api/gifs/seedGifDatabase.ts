import { serverSupabaseClient } from '#supabase/server'
import { createManyGif } from '~/server/services/gif/createManyGifs.service'
import { gifs } from '~/server/data/gifs'
import path from 'path'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const gifsToSeed = gifs.map((gif) => {
    const filePath = path.join(process.cwd(), 'public', 'gifs', `${gif.filename}`)

    return {
      ...gif,
      filePath,
    }
  })

  return createManyGif({
    gifs: gifsToSeed,
    client,
  })
})
