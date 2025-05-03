import { describe, test, expect } from 'vitest'
import { formatCharactersToBack, formatCharactersToFront } from './formatCharacters'

describe('formatCharacters', () => {
  describe('formatCharactersToBack', () => {
    test('should return empty string when input is null or undefined', () => {
      expect(formatCharactersToBack(null as unknown as string)).toBe('')
      expect(formatCharactersToBack(undefined as unknown as string)).toBe('')
    })

    test('should return empty string when input is empty string', () => {
      expect(formatCharactersToBack('')).toBe('')
    })

    test('should return empty string when input is empty array', () => {
      expect(formatCharactersToBack([])).toBe('')
    })

    test('should join array elements with comma', () => {
      expect(formatCharactersToBack(['Arthur', 'Perceval', 'Karadoc'])).toBe('Arthur,Perceval,Karadoc')
    })

    test('should return string as is when input is string', () => {
      expect(formatCharactersToBack('Arthur,Perceval,Karadoc')).toBe('Arthur,Perceval,Karadoc')
    })

    test('should handle single element array', () => {
      expect(formatCharactersToBack(['Arthur'])).toBe('Arthur')
    })
  })

  describe('formatCharactersToFront', () => {
    test('should return empty array when input is null or undefined', () => {
      expect(formatCharactersToFront(null as unknown as string)).toEqual([])
      expect(formatCharactersToFront(undefined as unknown as string)).toEqual([])
    })

    test('should return empty array when input is empty string', () => {
      expect(formatCharactersToFront('')).toEqual([])
    })

    test('should return array as is when input is array', () => {
      const input = ['Arthur', 'Perceval', 'Karadoc']
      expect(formatCharactersToFront(input)).toBe(input) // Same reference
      expect(formatCharactersToFront(input)).toEqual(['Arthur', 'Perceval', 'Karadoc'])
    })

    test('should split string by comma', () => {
      expect(formatCharactersToFront('Arthur,Perceval,Karadoc')).toEqual(['Arthur', 'Perceval', 'Karadoc'])
    })

    test('should handle single element string', () => {
      expect(formatCharactersToFront('Arthur')).toEqual(['Arthur'])
    })

    test('should handle string with spaces around commas', () => {
      expect(formatCharactersToFront('Arthur, Perceval, Karadoc')).toEqual(['Arthur', ' Perceval', ' Karadoc'])
    })
  })
})
