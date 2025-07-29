import type { Episode } from "~~/shared/types/Episode";
import type { Gif } from "~~/shared/types/Gif";
import type { Season } from "~~/shared/types/Season";
import type { SeasonItem } from "~~/shared/types/structuredData";
import { unique } from "~~/shared/utils/array";

/**
 * Compose a SeasonItem from a Season
 * @param season - The season to compose
 * @returns The composed SeasonItem
 */
export function composeSeasonToStructuredData({
  season,
  episodes,
  gifs,
}: {
  season: Season
  episodes: Episode[]
  gifs: Gif[]
}): SeasonItem {
  return {
    ...season,
    episodes: unique(episodes.map(episode => episode.code)),
    characters: unique(gifs.map(gif => gif.characters).flat()),
    name: season.title,
    number: season.id,
    description: season.resume,
    id: season.id.toString(),
    createdAt: season.createdAt,
    updatedAt: season.createdAt,
  }
}
