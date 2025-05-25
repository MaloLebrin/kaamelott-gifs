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
export const commentableEntities: CommentEntityType[] = ['gif', 'character', 'episode', 'season']

/**
 * Vérifie si un type d'entité peut recevoir des commentaires
 * @param {string} entityType - Le type d'entité à vérifier
 * @returns {boolean} true si l'entité peut recevoir des commentaires, false sinon
 * @example
 * // Retourne true
 * isCommentable('gif')
 * isCommentable('character')
 * // Retourne false
 * isCommentable('user')
 * isCommentable('invalid')
 */
export function isCommentable(entityType: string): boolean {
  return commentableEntities.includes(entityType as CommentEntityType)
}
