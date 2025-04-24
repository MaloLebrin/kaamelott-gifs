import { unique } from "~/shared/utils/array"
import { getLivreFromCode } from "~/shared/utils/episodes/code"
import type { Episode } from "~/types/Episode"
import type { Gif } from "~/types/Gif"
import type { EpisodeItem } from "~/types/structuredData"

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


/**
 * Compose an EpisodeItem from an Episode and an array of Gifs
 * @param episode - The episode to compose
 * @param gifs - The array of gifs
 * @returns The composed EpisodeItem
 */
export function composeEpisodeToStructuredData({
  episode,
  gifs,
}: {
  episode: Episode
  gifs: Gif[]
}): EpisodeItem {
  const episodeId = getEpisodeId(episode)

  return {
    gifs: gifs.map(gif => gif.quote.toString()),
    characters: unique(gifs.map(gif => gif.characters).flat()),
    season: Number(getLivreFromCode(episode.code)),
    number: parseInt(episodeId),
    id: episodeId,
    name: episode.title,
    description: episode.resume || undefined,
    createdAt: episode.createdAt,
    updatedAt: episode.createdAt,
  }
}
