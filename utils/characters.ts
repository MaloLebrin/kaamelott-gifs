import { unique } from "~/shared/utils/array"
import type { Character } from "~/types/Characters"
import type { Episode } from "~/types/Episode"
import type { Season } from "~/types/Season"
import type { CharacterItem } from "~/types/structuredData"

/**
 * Compose the character to structured data
 * @param character - The character to compose
 * @param episodes - The episodes of the character
 * @param seasons - The seasons of the character
 * @returns The character to structured data
 */
export function composeCharacterToStructuredData({
  character,
  episodes,
  seasons,
}: {
  character: Pick<Character, 'name'>
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

/**
 * Compose the keywords for the character
 * @param character - The character to compose the keywords for
 * @returns The keywords for the character
 */
export function composeKeywordsForCharacter(character: Pick<Character, 'name'>): string {
  if (!character.name) {
    return [
      'kaamelott',
      'gifs',
      'alexandre astier',
      'série française',
      'moments cultes',
      'collection',
    ].join(', ')
  }

  const keywords = [
    character.name?.toLocaleLowerCase('fr-FR'),
    'kaamelott',
    'gifs',
    'alexandre astier',
    'série française',
    'moments cultes',
    'collection',
  ]
  return keywords.join(', ')
}
