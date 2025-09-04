import { describe, expect, test } from 'vitest'
import type { CommentEntityType } from '~~/shared/types/Comments'
import { commentableEntities, isCommentable } from './commentableEntities'

describe('isCommentable', () => {
  // Test des cas positifs - toutes les entités commentables
  test.each(commentableEntities)('should return true for commentable entity: %s', (entityType: CommentEntityType) => {
    expect(isCommentable(entityType)).toBe(true)
  })

  // Test des cas négatifs - entités non commentables
  test.each(['user', 'invalid', 'comment', 'admin'])('should return false for non-commentable entity: %s', (entityType: string) => {
    expect(isCommentable(entityType)).toBe(false)
  })

  // Test des cas limites
  test('should return false for empty string', () => {
    expect(isCommentable('')).toBe(false)
  })

  test('should return false for null', () => {
    // @ts-expect-error Testing invalid input
    expect(isCommentable(null)).toBe(false)
  })

  test('should return false for undefined', () => {
    // @ts-expect-error Testing invalid input
    expect(isCommentable(undefined)).toBe(false)
  })

  // Test de la cohérence avec la liste des entités commentables
  test('should match the length of commentableEntities array', () => {
    const validCount = commentableEntities.filter(entity => isCommentable(entity)).length
    expect(validCount).toBe(commentableEntities.length)
  })
}) 
