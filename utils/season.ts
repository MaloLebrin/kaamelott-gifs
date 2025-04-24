import type { Season } from "~/types/Season";
import type { SeasonItem } from "~/types/structuredData";
import type { Episode } from "~/types/Episode";
import type { Gif } from "~/types/Gif";
import { unique } from "~/shared/utils/array";

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
