import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import { Entities } from '~~/shared/types'
import type { CommentInput } from '~~/shared/types/Comments'
import type { Database } from '~~/shared/types/database.types'

export default defineEventHandler(async event => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const body = await readBody<CommentInput>(event)
  const { content, gifId, characterId, episodeCode, seasonId } = body

  if (!content) {
    throw createError({
      statusCode: 400,
      message: 'Content is required'
    })
  }

  // Vérifier qu'au moins une entité est spécifiée
  if (!gifId && !characterId && !episodeCode && !seasonId) {
    throw createError({
      statusCode: 400,
      message: 'At least one entity (gif, character, episode, or season) must be specified'
    })
  }

  // Vérifier la longueur du contenu
  if (content.length > 1000) {
    throw createError({
      statusCode: 400,
      message: 'Comment content must be less than 1000 characters'
    })
  }

  const client = await serverSupabaseClient<Database>(event)

  // Vérifier que l'entité existe
  if (gifId) {
    const { data: gif } = await client
      .from(Entities.GIF)
      .select('id')
      .eq('id', gifId)
      .single()

    if (!gif) {
      throw createError({
        statusCode: 404,
        message: 'GIF not found'
      })
    }
  }

  if (characterId) {
    const { data: character } = await client
      .from(Entities.CHARACTER)
      .select('id')
      .eq('id', characterId)
      .single()

    if (!character) {
      throw createError({
        statusCode: 404,
        message: 'Character not found'
      })
    }
  }

  if (episodeCode) {
    const { data: episode } = await client
      .from(Entities.EPISODE)
      .select('code')
      .eq('code', episodeCode)
      .single()

    if (!episode) {
      throw createError({
        statusCode: 404,
        message: 'Episode not found'
      })
    }
  }

  if (seasonId) {
    const { data: season } = await client
      .from(Entities.SEASON)
      .select('id')
      .eq('id', seasonId)
      .single()

    if (!season) {
      throw createError({
        statusCode: 404,
        message: 'Season not found'
      })
    }
  }

  // Créer le commentaire
  const { data: comment, error } = await client
    .from(Entities.COMMENT)
    .insert({
      content,
      gifId,
      characterId,
      episodeCode,
      seasonId,
      status: 'approved' // Pour le moment, on approuve directement
    })
    .select()
    .single()

  if (error) {
    throw createError({
      statusCode: 500,
      message: error.message
    })
  }

  return comment
}) 
