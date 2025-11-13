import type { EpisodeCode } from '~~/shared/types'

/**
 * Extrait le numéro du livre à partir du code d'un épisode
 * @param {EpisodeCode} code - Le code de l'épisode (ex: 'S01E01')
 * @returns {string | null} Le numéro du livre (ex: '1') ou null si le code est invalide
 * @example
 * getLivreFromCode('S01E01') // '1'
 * getLivreFromCode('S02E05') // '2'
 */
export function getLivreFromCode(code: EpisodeCode) {
  if (!code) {
    return null
  }

  const [livre, _episode] = code.split('E')

  return livre?.replace('S0', '') || null
}

/**
 * Extrait l'identifiant de l'épisode à partir du code d'un épisode
 * @template T - Type de l'objet épisode qui doit avoir une propriété 'code'
 * @param {T} episode - L'objet épisode contenant le code
 * @returns {string} L'identifiant de l'épisode
 * @throws {Error} Si le code de l'épisode est manquant
 * @example
 * getEpisodeId({ code: 'S01E01' }) // '01'
 * getEpisodeId({ code: 'S02E05' }) // '05'
 */
export function getEpisodeId<T extends { code: EpisodeCode }>(episode: T) {
  if (!episode.code) {
    throw new Error('Episode code is required')
  }
  const [_, episodeId] = episode.code.split('E')
  return episodeId
}
