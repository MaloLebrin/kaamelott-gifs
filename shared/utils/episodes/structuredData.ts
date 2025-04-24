import { unique } from "~/shared/utils/array"
import { getEpisodeId, getLivreFromCode } from "~/shared/utils/episodes/code"
import type { Episode } from "~/types/Episode"
import type { Gif } from "~/types/Gif"
import type { EpisodeItem } from "~/types/structuredData"

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
