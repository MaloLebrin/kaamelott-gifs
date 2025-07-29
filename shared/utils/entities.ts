import type { Character } from "~~/shared/types/Characters"
import type { Episode } from "~~/shared/types/Episode"
import type { Gif } from "~~/shared/types/Gif"
import type { Season } from "~~/shared/types/Season"

/**
 * Vérifie si l'entité est un GIF
 */
export function isGif(entity: Gif | Character | Episode | Season): entity is Gif {
  return 'url' in entity && 'quote' in entity
}

/**
 * Vérifie si l'entité est un personnage
 */
export function isCharacter(entity: Gif | Character | Episode | Season): entity is Character {
  return 'name' in entity && 'imgUrl' in entity
}

/**
 * Vérifie si l'entité est un épisode
 */
export function isEpisode(entity: Gif | Character | Episode | Season): entity is Episode {
  return 'code' in entity && 'title' in entity && 'resume' in entity
}

/**
 * Vérifie si l'entité est une saison
 */
export function isSeason(entity: Gif | Character | Episode | Season): entity is Season {
  return 'title' in entity && 'airDate' in entity && 'episodesCount' in entity
}
