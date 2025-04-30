import { describe, test, expect } from 'vitest'
import { composeSeoTitle, composeSeoDescription } from './seo'

describe('SEO Utils', () => {
  describe('composeSeoTitle', () => {
    test('should return the title with the site name if the title is less than 60 characters', () => {
      expect(composeSeoTitle('Hello')).toBe('Hello Kaamelott GIFs')
    })

    test('should return the title with the site name if the title is more than 60 characters', () => {
      expect(composeSeoTitle('Hello world this is a long title from a gif with a long quote')).toBe('Hello world this is a long title from a gif w... Kaamelott GIFs')
    })

    test('should return the site name if the title is empty', () => {
      expect(composeSeoTitle('')).toBe('Kaamelott GIFs')
    })
  })

  describe('composeSeoDescription', () => {
    test('should return the description with the site name if the description is less than 155 characters', () => {
      expect(composeSeoDescription('Hello')).toBe('Hello')
    })

    test('should return the description with the site name if the description is more than 155 characters', () => {
      expect(composeSeoDescription('Hello world this is a long description from a gif with a long quote...')).toBe('Hello world this is a long description from a gif with a long quote...')
    })

    test('should return the site name if the description is empty', () => {
      expect(composeSeoDescription('')).toBe('Kaamelott GIFs')
    })

    test('should return the description with the site name if the description is more than 155 characters', () => {
      expect(composeSeoDescription("Découvrez les meilleurs GIFs de Livre II de la série Kaamelott. Le Livre II, à la manière du Livre I, ne possède pas d'histoire de fond qui lui est propre, mais commence à initier un mouvement chronologique à la série en faisant référence à des épisodes du premier livre. Le Livre II marque une introduction au Livre III, en cela que les premiers désaccords et les premières tensions se font sentir entre Arthur et Lancelot.")).toBe("Découvrez les meilleurs GIFs de Livre II de la série Kaamelott. Le Livre II, à la manière du Livre I, ne possède pas d'histoire de fond qui lui est propre,...")
    })
  })
})
