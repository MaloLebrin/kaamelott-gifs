import { formatFromBackToFront } from '~/shared/utils/gifs/formatFromBackToFront'
import { serverSupabaseClient } from '#supabase/server'
import { Entities } from '~/types'

export default defineEventHandler(async (event) => {
  const characterName = getRouterParam(event, 'characterName') as string

  if (!characterName) {
    throw createError({
      statusCode: 400,
      message: 'characterName is required'
    })
  }

  const name = characterName.replace(/-/g, ' ')

  const client = await serverSupabaseClient(event)

  const { data, error } = await client
    .from(Entities.GIF)
    .select('*')
    .or(
      `characters.ilike.%${name}%,characters_speaking.ilike.%${name}%`,
      // Doc: https://supabase.com/docs/reference/javascript/v1/or
    )

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
  return formatFromBackToFront(data)
})
