import { uploadGifToCloudinary } from "~/server/utils/cloudinary"
import { Entities, Gif } from "~/types"

/**
 * Create many gifs
 * @param gifs - The gifs to create
 * @param client - The supabase client
 * @returns The created gifs
 */
export async function createManyGif({
  gifs,
  client,
}: {
  gifs: (Omit<Gif, 'filePath' | 'url' | 'public_id'> & { filePath: string })[],
  client: any
}) {
  console.log('uploading gifs...')
  const uploadedGifs = await Promise.all(gifs.map(async (gif) => {
    console.log(gif.filename, 'uploading gif...')
    return uploadGifToCloudinary(gif, gif.filePath)
  }))
  console.log('gifs uploaded')

  console.log('inserting gifs...')
  const { data, error } = await client
    .from(Entities.GIF)
    .insert(uploadedGifs)
    .select()
  console.log('gifs inserted')

  if (error) {
    console.error('error', error)
    // throw createError({ statusMessage: error.message })
  }

  console.log('data', data)

  return data
}
