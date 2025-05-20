import { Entities, type Season, type Character, type Episode, type Gif } from "~/types"
import type { Like, LikeWithRelation } from "~/types/Like"

/**
 * Liste des types d'entités qui peuvent être likées
 * @constant
 * @type {Entities[]}
 */
export const validEntityTypes = [
  Entities.GIF,
  Entities.CHARACTER,
  Entities.EPISODE,
  Entities.SEASON
]

/**
 * Mapping des types d'entités vers leurs identifiants correspondants dans l'objet Like
 * @constant
 * @type {Record<Entities, string>}
 * @example
 * // Pour un GIF, l'ID est stocké dans la propriété 'gifId'
 * likeableEntitiesIds[Entities.GIF] // 'gifId'
 */
export const likeableEntitiesIds = {
  [Entities.GIF]: 'gifId',
  [Entities.CHARACTER]: 'characterId',
  [Entities.EPISODE]: 'episodeCode',
  [Entities.SEASON]: 'seasonId'
}

/**
 * Détermine le type d'entité du like en fonction des propriétés présentes
 * @param {Like} like - L'objet like à analyser
 * @returns {Entities} Le type d'entité correspondant au like
 * @throws {Error} Si aucun type d'entité n'est trouvé dans le like
 * @example
 * // Retourne Entities.GIF
 * getEntityType({ gifId: '123', userId: '456' })
 * // Retourne Entities.CHARACTER
 * getEntityType({ characterId: '789', userId: '456' })
 */
export function getEntityType(like: Like): Entities {
  if (like.gifId) return Entities.GIF
  if (like.characterId) return Entities.CHARACTER
  if (like.episodeCode) return Entities.EPISODE
  if (like.seasonId) return Entities.SEASON
  throw new Error('Invalid like: no entity type found')
}

/**
 * Récupère l'entité associée au like à partir des relations
 * @param {LikeWithRelation} like - L'objet like avec ses relations
 * @returns {Gif | Character | Episode | Season} L'entité associée au like
 * @throws {Error} Si le type d'entité est invalide
 * @example
 * // Retourne l'objet Gif associé
 * getEntity({ gifId: '123', gifs: { id: '123', url: '...' } })
 * // Retourne l'objet Character associé
 * getEntity({ characterId: '789', characters: { id: '789', name: '...' } })
 */
export function getEntity(like: LikeWithRelation): Gif | Character | Episode | Season {
  const type = getEntityType(like)
  switch (type) {
    case Entities.GIF:
      return like.gifs
    case Entities.CHARACTER:
      return like.characters
    case Entities.EPISODE:
      return like.episodes
    case Entities.SEASON:
      return like.seasons
    default:
      throw new Error('Invalid entity type')
  }
}
