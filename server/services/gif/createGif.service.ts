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
  const uploadedGifs = await Promise.all(gifs.map(async (gif) => {
    return uploadGifToCloudinary(gif, gif.filePath)
  }))

  const { data, error } = await client
    .from(Entities.GIF)
    .insert(uploadedGifs)
    .select()

  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
}
