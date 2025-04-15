import { serverSupabaseClient } from '#supabase/server'
import { Gif } from '~/types'
import { Entities } from '~/types/Entities'
import { createManyGif } from '~/server/services/gif/createGif.service'
export default eventHandler(async (event) => {
  const body = await readBody<{gifs: Gif[]}>(event)

  const client = await serverSupabaseClient(event)

  const uploadedGifs = await createManyGif({
    gifs: body.gifs.map((gif) => ({
      ...gif,
      filePath: gif.filename,
    })),
    client,
  })

  const { data, error } = await client
    .from(Entities.GIF)
    .insert(uploadedGifs)
    .select()

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})
