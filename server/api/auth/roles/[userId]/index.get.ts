import { Entities } from '~/types'
import type { Database } from '~/types/database.types'
import type { Profile } from '~/types/Profiles'
export default defineEventHandler(async event => {
  const client = await serverSupabaseClient<Database>(event)
  const userId = getRouterParam(event, 'userId') as string

  if (!userId) {
    return null
  }

  const { data }: { data: Pick<Profile, 'role'> | null } = await client
    .from(Entities.PROFILE)
    .select('role')
    .eq('userId', userId)
    .single()

  return data
})
