/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, test, expect } from 'vitest'
import { formatFromBackToFront } from './formatFromBackToFront'

describe('formatFromBackToFront', () => {
  test('formats gifs with characters correctly', () => {
    const mockGifs = [
      {
        id: 1,
        quote: 'Citation 1',
        characters: 'Arthur,Perceval',
        characters_speaking: 'Arthur'
      },
      {
        id: 2,
        quote: 'Citation 2',
        characters: 'Karadoc,Perceval',
        characters_speaking: 'Karadoc,Perceval'
      }
    ]

    const result = formatFromBackToFront(mockGifs)

    expect(result).toEqual([
      {
        id: 1,
        quote: 'Citation 1',
        characters: ['Arthur', 'Perceval'],
        characters_speaking: ['Arthur']
      },
      {
        id: 2,
        quote: 'Citation 2',
        characters: ['Karadoc', 'Perceval'],
        characters_speaking: ['Karadoc', 'Perceval']
      }
    ])
  })

  test('handles empty array', () => {
    const result = formatFromBackToFront([])
    expect(result).toEqual([])
  })

  test('handles null input', () => {
    const result = formatFromBackToFront(null as any)
    expect(result).toEqual([])
  })

  test('handles undefined input', () => {
    const result = formatFromBackToFront(undefined as any)
    expect(result).toEqual([])
  })

  test('handles gifs without characters_speaking', () => {
    const mockGifs = [
      {
        id: 1,
        quote: 'Citation 1',
        characters: 'Arthur,Perceval'
      }
    ]

    const result = formatFromBackToFront(mockGifs)

    expect(result).toEqual([
      {
        id: 1,
        quote: 'Citation 1',
        characters: ['Arthur', 'Perceval'],
        characters_speaking: undefined
      }
    ])
  })

  test('handles gifs with empty characters string', () => {
    const mockGifs = [
      {
        id: 1,
        quote: 'Citation 1',
        characters: ''
      }
    ]

    const result = formatFromBackToFront(mockGifs)

    expect(result).toEqual([])
  })

  test('handles gifs with single character', () => {
    const mockGifs = [
      {
        id: 1,
        quote: 'Citation 1',
        characters: 'Arthur',
        characters_speaking: 'Arthur'
      }
    ]

    const result = formatFromBackToFront(mockGifs)

    expect(result).toEqual([
      {
        id: 1,
        quote: 'Citation 1',
        characters: ['Arthur'],
        characters_speaking: ['Arthur']
      }
    ])
  })

  test('preserves additional properties', () => {
    const mockGifs = [
      {
        id: 1,
        quote: 'Citation 1',
        characters: 'Arthur,Perceval',
        characters_speaking: 'Arthur',
        extraProperty: 'test',
        nestedProperty: {
          key: 'value'
        }
      }
    ]

    const result = formatFromBackToFront(mockGifs)

    expect(result).toEqual([
      {
        id: 1,
        quote: 'Citation 1',
        characters: ['Arthur', 'Perceval'],
        characters_speaking: ['Arthur'],
        extraProperty: 'test',
        nestedProperty: {
          key: 'value'
        }
      }
    ])
  })

  test('handles gifs with special characters in names', () => {
    const mockGifs = [
      {
        id: 1,
        quote: 'Citation 1',
        characters: 'Arthur Pendragon,Perceval de Galles',
        characters_speaking: 'Arthur Pendragon'
      }
    ]

    const result = formatFromBackToFront(mockGifs)

    expect(result).toEqual([
      {
        id: 1,
        quote: 'Citation 1',
        characters: ['Arthur Pendragon', 'Perceval de Galles'],
        characters_speaking: ['Arthur Pendragon']
      }
    ])
  })
}) 
