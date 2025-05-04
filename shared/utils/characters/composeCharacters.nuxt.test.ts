import { describe, test, expect } from 'vitest'
import { composeCharacters } from './composeCharacters'

describe('composeCharacters', () => {
  test('should return empty array for empty input', () => {
    const result = composeCharacters([])
    expect(result).toEqual([])
  })

  test('should combine and sort unique characters from both arrays', () => {
    const input = [
      {
        characters: 'Arthur,Perceval',
        characters_speaking: 'Arthur'
      },
      {
        characters: 'Lancelot,Perceval',
        characters_speaking: 'Lancelot'
      }
    ]

    const result = composeCharacters(input)
    expect(result).toEqual(['Arthur', 'Lancelot', 'Perceval'])
  })

  test('should handle empty speaking characters', () => {
    const input = [
      {
        characters: 'Arthur,Perceval',
        characters_speaking: ''
      },
      {
        characters: 'Lancelot',
        characters_speaking: ''
      }
    ]

    const result = composeCharacters(input)
    expect(result).toEqual(['Arthur', 'Lancelot', 'Perceval'])
  })

  test('should handle duplicate characters', () => {
    const input = [
      {
        characters: 'Arthur,Arthur,Perceval',
        characters_speaking: 'Arthur,Perceval'
      },
      {
        characters: 'Lancelot,Perceval',
        characters_speaking: 'Lancelot,Perceval'
      }
    ]

    const result = composeCharacters(input)
    expect(result).toEqual(['Arthur', 'Lancelot', 'Perceval'])
  })

  test('should handle special characters and spaces', () => {
    const input = [
      {
        characters: 'Arthur Pendragon,Perceval de Galles',
        characters_speaking: 'Arthur Pendragon'
      },
      {
        characters: 'Lancelot du Lac',
        characters_speaking: 'Lancelot du Lac'
      }
    ]

    const result = composeCharacters(input)
    expect(result).toEqual(['Arthur Pendragon', 'Lancelot du Lac', 'Perceval de Galles'])
  })

  test('should handle single character entries', () => {
    const input = [
      {
        characters: 'Arthur',
        characters_speaking: 'Arthur'
      }
    ]

    const result = composeCharacters(input)
    expect(result).toEqual(['Arthur'])
  })

  test('should sort with French alphabetical order', () => {
    const input = [
      {
        characters: 'Élias,Éric,Édouard,Émilie,Étienne',
        characters_speaking: ''
      },
      {
        characters: 'Arthur,Éric,Zénon',
        characters_speaking: ''
      }
    ]

    const result = composeCharacters(input)
    expect(result).toEqual(['Arthur', 'Édouard', 'Élias', 'Émilie', 'Éric', 'Étienne', 'Zénon'])
  })

  test('should handle accented characters correctly', () => {
    const input = [
      {
        characters: 'Cæsar,Éric,Æthelred',
        characters_speaking: ''
      },
      {
        characters: 'Arthur,Æthelred,Zénon',
        characters_speaking: ''
      }
    ]

    const result = composeCharacters(input)
    expect(result).toEqual(['Æthelred', 'Arthur', 'Cæsar', 'Éric', 'Zénon'])
  })
})
