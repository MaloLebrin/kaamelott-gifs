import { serverSupabaseClient } from '#supabase/server'
import { Entities } from '~/types'
import type { Database } from '~/types/database.types'

export default defineEventHandler(async event => {
  const client = await serverSupabaseClient<Database>(event)

  const { data, error } = await client.from(Entities.SEASON).select('*')

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message })
  }
  return data
})
