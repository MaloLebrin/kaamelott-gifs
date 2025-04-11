// @vitest-environment nuxt
import { describe, test, expect } from 'vitest'
import { slugify } from '~/utils/strings'

describe('slugify', () => {
  test('should convert string to lowercase', () => {
    expect(slugify('HELLO')).toBe('hello')
  })

  test('should replace spaces with hyphens', () => {
    expect(slugify('hello world')).toBe('hello-world')
  })

  test('should replace accented characters', () => {
    expect(slugify('éèêëàáâäåìíîïòóôõöøùúûüýÿñç')).toBe('eeeeaaaaaiiiioooooouuuuyync')
  })

  test('should handle multiple spaces', () => {
    expect(slugify('hello   world')).toBe('hello-world')
  })

  test('should handle apostrophes', () => {
    expect(slugify("l'apostrophe")).toBe('l-apostrophe')
  })

  test('should handle multiple hyphens', () => {
    expect(slugify('hello--world')).toBe('hello-world')
  })

  test('should handle æ character', () => {
    expect(slugify('Cæsar Imperator')).toBe('cæsar-imperator')
  })

  test('should handle complex strings', () => {
    expect(slugify("L'Étranger d'André Gide")).toBe('l-etranger-d-andre-gide')
  })
}) 
