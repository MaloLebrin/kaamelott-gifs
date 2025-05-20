import { describe, test, expect } from 'vitest'
import { formatDate } from './date'

describe('date', () => {
  describe('formatDate', () => {
    test('should format a valid date string in French format', () => {
      // Test avec une date fixe pour éviter les problèmes de timezone
      const date = '2024-01-01T00:00:00Z'
      expect(formatDate(date)).toBe('1 janvier 2024')
    })

    test('should handle different months correctly', () => {
      const dates = [
        { input: '2024-01-15T00:00:00Z', expected: '15 janvier 2024' },
        { input: '2024-02-15T00:00:00Z', expected: '15 février 2024' },
        { input: '2024-03-15T00:00:00Z', expected: '15 mars 2024' },
        { input: '2024-04-15T00:00:00Z', expected: '15 avril 2024' },
        { input: '2024-05-15T00:00:00Z', expected: '15 mai 2024' },
        { input: '2024-06-15T00:00:00Z', expected: '15 juin 2024' },
        { input: '2024-07-15T00:00:00Z', expected: '15 juillet 2024' },
        { input: '2024-08-15T00:00:00Z', expected: '15 août 2024' },
        { input: '2024-09-15T00:00:00Z', expected: '15 septembre 2024' },
        { input: '2024-10-15T00:00:00Z', expected: '15 octobre 2024' },
        { input: '2024-11-15T00:00:00Z', expected: '15 novembre 2024' },
        { input: '2024-12-15T00:00:00Z', expected: '15 décembre 2024' }
      ]

      dates.forEach(({ input, expected }) => {
        expect(formatDate(input)).toBe(expected)
      })
    })

    test('should handle different days correctly', () => {
      const dates = [
        { input: '2024-01-01T00:00:00Z', expected: '1 janvier 2024' },
        { input: '2024-01-15T00:00:00Z', expected: '15 janvier 2024' },
        { input: '2024-01-31T00:00:00Z', expected: '31 janvier 2024' }
      ]

      dates.forEach(({ input, expected }) => {
        expect(formatDate(input)).toBe(expected)
      })
    })

    test('should handle different years correctly', () => {
      const dates = [
        { input: '2020-01-01T00:00:00Z', expected: '1 janvier 2020' },
        { input: '2024-01-01T00:00:00Z', expected: '1 janvier 2024' },
        { input: '2030-01-01T00:00:00Z', expected: '1 janvier 2030' }
      ]

      dates.forEach(({ input, expected }) => {
        expect(formatDate(input)).toBe(expected)
      })
    })

    test('should handle leap years correctly', () => {
      const dates = [
        { input: '2024-02-29T00:00:00Z', expected: '29 février 2024' }, // 2024 est une année bissextile
        { input: '2020-02-29T00:00:00Z', expected: '29 février 2020' }  // 2020 est une année bissextile
      ]

      dates.forEach(({ input, expected }) => {
        expect(formatDate(input)).toBe(expected)
      })
    })
  })
}) 
