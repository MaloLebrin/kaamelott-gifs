import { unique } from "~/shared/utils/array"
import type { Character } from "~/types/Characters"
import type { Episode } from "~/types/Episode"
import type { Season } from "~/types/Season"
import type { CharacterItem } from "~/types/structuredData"

export function composeCharacterToStructuredData({
  character,
  episodes,
  seasons,
}: {
  character: Character
  episodes: Episode[]
  seasons: Season[]
}): CharacterItem {
  const createdAt = episodes[0]?.createdAt

  return {
    name: character.name,
    description: 'Page du personnage',
    createdAt,
    updatedAt: createdAt,
    role: 'Personnage',
    episodes: unique(episodes.map(episode => episode.code)),
    seasons: unique(seasons.map(season => season.id)),
    id: character.name,
  }
}
