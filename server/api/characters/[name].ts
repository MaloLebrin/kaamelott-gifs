import { serverSupabaseClient } from '#supabase/server'
import { slugify } from '~/shared/utils/string'
import { Entities } from '~/types'


export default defineEventHandler(async (event) => {
  try {
    const name = getRouterParam(event, 'name')

    if (!name) {
      throw createError({
        statusCode: 400,
        message: 'Name is required'
      })
    }

    const slug = slugify(name)
  
    // const client = await serverSupabaseClient(event)
  
    // const { data, error } = await client
    //   .from(Entities.GIF)
    //   .select('*')
    //   .or(
    //     `characters.ilike.%${slug}%,characters_speaking.ilike.%${slug}%`,
    //     // Doc: https://supabase.com/docs/reference/javascript/v1/or
    //   )

  
    // if (error) {
    //   throw createError({ statusCode: 500, statusMessage: error.message })
    // }

    return {
      name,
      avatar: `/characters/${slug}.jpg`
    }
    // return data

  } catch (error) {
    console.error('Error fetching character:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching character'
    })
  }
}) 
