import { serverSupabaseClient } from '#supabase/server'
import { Gif } from '~/types'
import { createManyGif } from '~/server/utils/createGif.service'

export default eventHandler(async (event) => {
  const body = await readBody<{ gifs: Gif[] }>(event)

  const client = await serverSupabaseClient(event)

  return createManyGif({
    gifs: body.gifs.map((gif) => ({
      ...gif,
      filePath: gif.filename,
    })),
    client,
  })
})
