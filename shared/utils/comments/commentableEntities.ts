import { Entities } from '~/types'
import type { CommentEntityType } from '~/types/Comments'

/**
 * Liste des types d'entités qui peuvent recevoir des commentaires
 * @constant
 * @type {CommentEntityType[]}
 * @example
 * // Vérifier si une entité peut recevoir des commentaires
 * const canComment = commentableEntities.includes('gif') // true
 * const cannotComment = commentableEntities.includes('user') // false
 */
export const commentableEntities: CommentEntityType[] = [
  Entities.GIF,
  Entities.CHARACTER,
  Entities.EPISODE,
  Entities.SEASON
]

/**
 * Vérifie si un type d'entité peut recevoir des commentaires
 * @param {Entities} entityType - Le type d'entité à vérifier
 * @returns {boolean} true si l'entité peut recevoir des commentaires, false sinon
 * @example
 * // Retourne true
 * isCommentable(Entities.GIF)
 * isCommentable(Entities.CHARACTER)
 * // Retourne false
 * isCommentable('user' as Entities)
 * isCommentable('invalid' as Entities)
 */
export function isCommentable(entityType: Entities): boolean {
  return commentableEntities.includes(entityType as CommentEntityType)
}

/**
 * Mapping des types d'entités vers leurs identifiants correspondants dans l'objet Comment
 * @constant
 * @type {Record<Entities, string>}
 * @description
 * Associe chaque type d'entité à la propriété correspondante dans l'objet Comment.
 * Utilisé pour construire dynamiquement les objets de commentaire en fonction du type d'entité.
 * 
 * @example
 * // Pour un GIF, l'ID est stocké dans la propriété 'gifId'
 * commentableEntitiesIds[Entities.GIF] // 'gifId'
 * // Pour un épisode, l'ID est stocké dans la propriété 'episodeCode'
 * commentableEntitiesIds[Entities.EPISODE] // 'episodeCode'
 */
export const commentableEntitiesIds = {
  [Entities.GIF]: 'gifId',
  [Entities.CHARACTER]: 'characterId',
  [Entities.EPISODE]: 'episodeCode',
  [Entities.SEASON]: 'seasonId'
} 
