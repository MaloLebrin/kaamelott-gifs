import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { uploadGifToS3 } from '~/server/services/aws/client'
import { formatCharactersToBack } from '~/shared/utils/gifs/formatCharacters'
import { transformUrl } from '~/shared/utils/gifs/transformUrl'
import { validateNewGif } from '~/shared/utils/gifs/validateNewGif'
import { slugify } from '~/shared/utils/string'
import { Entities } from '~/types/Entities'
import { Gif } from '~/types/Gif'

export default defineEventHandler(async (event) => {
  try {
    const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
    const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY
    const AWS_REGION = process.env.AWS_REGION
    const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
  
    if (!AWS_ACCESS_KEY || !AWS_SECRET_KEY || !AWS_REGION || !AWS_BUCKET_NAME) {
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
  
    const client = await serverSupabaseClient(event)
    const { gifFile, gifData } = validateNewGif(formData)
  
    await uploadGifToS3(gifFile, gifData.filename)
  
    const { data, error } = await client
      .from(Entities.GIF)
      .insert([{
        userId: user.id,
        characters: formatCharactersToBack(gifData.characters),
        characters_speaking: formatCharactersToBack(gifData.characters_speaking),
        episode: gifData.episode,
        filename: gifData.filename,
        quote: gifData.quote?.trim(),
        slug: slugify(gifData.quote?.trim()),
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
