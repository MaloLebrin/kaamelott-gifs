import type { Character } from "~~/shared/types/Characters"
import type { Episode } from "~~/shared/types/Episode"
import type { Season } from "~~/shared/types/Season"
import type { CharacterItem } from "~~/shared/types/structuredData"
import { unique } from "~~/shared/utils/array"

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
  character: Pick<Character, 'name' | 'description' | 'history' | 'actor' | 'isMainCharacter'>
  episodes: Episode[]
  seasons: Season[]
}): CharacterItem {
  const createdAt = episodes[0]?.createdAt

  return {
    name: character.name,
    description: character.description || 'Page du personnage',
    createdAt,
    updatedAt: createdAt,
    role: character.isMainCharacter ? 'Personnage Principal' : 'Personnage Secondaire',
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
export function composeKeywordsForCharacter(character?: Pick<Character, 'name' | 'slug' | 'actor'>): string {
  if (!character?.name) {
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
    character.actor?.toLocaleLowerCase('fr-FR'),
    'kaamelott',
    'gifs',
    'alexandre astier',
    'série française',
    'moments cultes',
    'collection',
  ]
  return keywords.join(', ')
}
