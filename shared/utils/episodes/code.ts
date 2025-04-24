/**
 * Get the livre from the code
 * @param code - The code of the episode
 * @returns The livre of the episode
 */
export function getLivreFromCode(code: string) {
  if (!code) {
    return null
  }

  const [livre, _episode] = code.split('E')

  return livre.replace('S0', '')
}

/**
 * Get the episode id from the episode code
 * @param episode - The episode to get the id from
 * @returns The episode id
 */
export function getEpisodeId<T extends { code: string }>(episode: T): string {
  if (!episode.code) {
    throw new Error('Episode code is required')
  }
  const [_, episodeId] = episode.code.split('E')
  return episodeId
}
