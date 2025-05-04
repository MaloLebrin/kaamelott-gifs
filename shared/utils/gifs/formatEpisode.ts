/**
 * Format an episode string to an object
 * @param episode - The episode to format
 * @returns The formatted episode
 */
export function formatEpisode(episode: string) {
  if (!episode) {
    return null
  }

  const [code] = episode.split(' - ')

  return code
}

