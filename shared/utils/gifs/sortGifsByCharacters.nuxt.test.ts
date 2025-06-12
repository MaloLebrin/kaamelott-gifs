import { describe, test, expect } from 'vitest'
import { sortGifsByCharacters } from './sortGifsByCharacters'

type TestGif = {
  id: string
  characters: string[] | null
  characters_speaking?: string[] | null
}

describe('sortGifsByCharacters', () => {
  const testGifs: TestGif[] = [
    {
      id: '1',
      characters: ['Arthur', 'Perceval'],
      characters_speaking: ['Perceval']
    },
    {
      id: '2',
      characters: ['Arthur', 'Lancelot'],
      characters_speaking: ['Arthur']
    },
    {
      id: '3',
      characters: ['Arthur', 'Merlin'],
      characters_speaking: ['Merlin']
    },
    {
      id: '4',
      characters: ['Lancelot', 'Perceval'],
      characters_speaking: ['Lancelot']
    },
    {
      id: '5',
      characters: ['Merlin', 'Perceval'],
      characters_speaking: null
    }
  ]

  test('should sort GIFs with Arthur speaking first, then appearing, then others', () => {
    const sortedGifs = sortGifsByCharacters({ gifs: testGifs, character: 'Arthur' })
    
    expect(sortedGifs[0].id).toBe('2') // Arthur speaking
    expect(sortedGifs[1].id).toBe('1') // Arthur appearing
    expect(sortedGifs[2].id).toBe('3') // Arthur appearing
    expect(['4', '5']).toContain(sortedGifs[3].id) // No Arthur
    expect(['4', '5']).toContain(sortedGifs[4].id) // No Arthur
  })

  test('should handle empty array', () => {
    const result = sortGifsByCharacters({ gifs: [], character: 'Arthur' })
    expect(result).toEqual([])
  })

  test('should handle null characters arrays', () => {
    const gifsWithNulls: TestGif[] = [
      {
        id: '1',
        characters: null,
        characters_speaking: null
      },
      {
        id: '2',
        characters: ['Arthur'],
        characters_speaking: ['Arthur']
      }
    ]
    
    const sortedGifs = sortGifsByCharacters({ gifs: gifsWithNulls, character: 'Arthur' })
    expect(sortedGifs[0].id).toBe('2') // Arthur speaking
    expect(sortedGifs[1].id).toBe('1') // No Arthur
  })
}) 
