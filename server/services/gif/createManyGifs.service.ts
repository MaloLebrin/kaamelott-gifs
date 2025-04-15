import { Entities, Gif } from "~/types"
import { uploadGifToCloudinary } from "~/shared/utils/cloudinary"

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
    .insert(uploadedGifs.map((gif) => ({
      characters: gif.characters.join(','),
      characters_speaking: gif.characters_speaking.join(','),
      episode: gif.episode,
      filename: gif.filename,
      quote: gif.quote,
      slug: gif.slug,
      url: gif.url,
      public_id: gif.public_id,
    })))
    .select()
  console.log('gifs inserted')

  if (error) {
    console.error('error', error)
    // throw createError({ statusMessage: error.message })
  }

  console.log('data', data)

  return data
}
