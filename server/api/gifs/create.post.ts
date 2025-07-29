import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { uploadGifToS3 } from '~~/server/services/aws/client'
import { Entities } from '~~/shared/types/Entities'
import type { Gif } from '~~/shared/types/Gif'
import type { Database } from '~~/shared/types/database.types'
import { formatCharactersToBack } from '~~/shared/utils/gifs/formatCharacters'
import { formatEpisode } from '~~/shared/utils/gifs/formatEpisode'
import { transformUrl } from '~~/shared/utils/gifs/transformUrl'
import { validateNewGif } from '~~/shared/utils/gifs/validateNewGif'
import { newSlugify } from '~~/shared/utils/string'

export default defineEventHandler(async event => {
  try {
    const AWS_S3_ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY
    const AWS_S3_SECRET_KEY = process.env.AWS_S3_SECRET_KEY
    const AWS_S3_REGION = 'eu-west-3'
    const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
  
    if (!AWS_S3_ACCESS_KEY || !AWS_S3_SECRET_KEY || !AWS_S3_REGION || !AWS_S3_BUCKET_NAME) {
      console.error('AWS credentials are not set')
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      })
    }
  
    const user = await serverSupabaseUser(event)
  
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }
  
    const formData = await readMultipartFormData(event)
  
    if (!formData) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
      })
    }
  
    const client = await serverSupabaseClient<Database>(event)
    const { gifFile, gifData } = validateNewGif(formData)
  
    await uploadGifToS3(gifFile, gifData.filename)

    const episode = formatEpisode(gifData.episode)
  
    const { data, error } = await client
      .from(Entities.GIF)
      .insert([{
        userId: user.id,
        characters: formatCharactersToBack(gifData.characters),
        characters_speaking: formatCharactersToBack(gifData.characters_speaking),
        episode: episode?.toLowerCase(),
        filename: gifData.filename,
        quote: gifData.quote?.trim(),
        slug: newSlugify(gifData.quote?.trim()),
        url: transformUrl({ fileName: gifData.filename }),
      }] as never)
      .select('slug')
      .single()
  
    if (error || !data) {
      console.error('Error creating gif', error)
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      })
    }
  
    return data as Gif 
  } catch (error) {
    console.error(error, 'error')
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
})
