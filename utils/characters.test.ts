import { describe, test, expect } from 'vitest'
import { composeCharacterToStructuredData, composeKeywordsForCharacter } from './characters'

describe('composeCharacterToStructuredData', () => {
  const mockCharacter = {
    name: 'Arthur'
  }

  const mockEpisodes = [
    {
      code: 'S01E01',
      title: 'Épisode 1',
      slug: 'episode-1',
      characters: 'Arthur,Perceval',
      resume: 'Description épisode 1',
      createdAt: '2023-01-01T00:00:00Z'
    },
    {
      code: 'S01E02',
      title: 'Épisode 2',
      slug: 'episode-2',
      characters: 'Arthur,Karadoc',
      resume: 'Description épisode 2',
      createdAt: '2023-01-02T00:00:00Z'
    }
  ]

  const mockSeasons = [
    {
      id: 1,
      title: 'Saison 1',
      resume: 'Description de la saison 1',
      airDate: '2023-01-01',
      episodesCount: 2,
      duration: '45min',
      slug: 'saison-1',
      wikipediaLink: 'https://wikipedia.org/saison-1',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z'
    },
    {
      id: 2,
      title: 'Saison 2',
      resume: 'Description de la saison 2',
      airDate: '2023-02-01',
      episodesCount: 2,
      duration: '45min',
      slug: 'saison-2',
      wikipediaLink: 'https://wikipedia.org/saison-2',
      createdAt: '2023-02-01T00:00:00Z',
      updatedAt: '2023-02-01T00:00:00Z'
    }
  ]

  test('composes CharacterItem correctly with all data', () => {
    const result = composeCharacterToStructuredData({
      character: mockCharacter,
      episodes: mockEpisodes,
      seasons: mockSeasons
    })

    expect(result).toEqual({
      name: 'Arthur',
      description: 'Page du personnage',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      role: 'Personnage',
      episodes: ['S01E01', 'S01E02'],
      seasons: [1, 2],
      id: 'Arthur'
    })
  })

  test('handles empty episodes array', () => {
    const result = composeCharacterToStructuredData({
      character: mockCharacter,
      episodes: [],
      seasons: mockSeasons
    })

    expect(result.episodes).toEqual([])
    expect(result.createdAt).toBeUndefined()
    expect(result.updatedAt).toBeUndefined()
  })

  test('handles empty seasons array', () => {
    const result = composeCharacterToStructuredData({
      character: mockCharacter,
      episodes: mockEpisodes,
      seasons: []
    })

    expect(result.seasons).toEqual([])
  })

  test('removes duplicate episode codes', () => {
    const episodesWithDuplicates = [
      ...mockEpisodes,
      {
        ...mockEpisodes[0],
        title: 'Épisode 1 bis'
      }
    ]

    const result = composeCharacterToStructuredData({
      character: mockCharacter,
      episodes: episodesWithDuplicates,
      seasons: mockSeasons
    })

    expect(result.episodes).toEqual(['S01E01', 'S01E02'])
  })

  test('removes duplicate season ids', () => {
    const seasonsWithDuplicates = [
      ...mockSeasons,
      {
        ...mockSeasons[0],
        title: 'Saison 1 bis'
      }
    ]

    const result = composeCharacterToStructuredData({
      character: mockCharacter,
      episodes: mockEpisodes,
      seasons: seasonsWithDuplicates
    })

    expect(result.seasons).toEqual([1, 2])
  })

  test('uses first episode createdAt for timestamps', () => {
    const result = composeCharacterToStructuredData({
      character: mockCharacter,
      episodes: mockEpisodes,
      seasons: mockSeasons
    })

    expect(result.createdAt).toBe('2023-01-01T00:00:00Z')
    expect(result.updatedAt).toBe('2023-01-01T00:00:00Z')
  })

  test('handles character with special characters in name', () => {
    const specialCharacter = {
      name: 'Arthur Pendragon'
    }

    const result = composeCharacterToStructuredData({
      character: specialCharacter,
      episodes: mockEpisodes,
      seasons: mockSeasons
    })

    expect(result.name).toBe('Arthur Pendragon')
    expect(result.id).toBe('Arthur Pendragon')
  })
})

describe('composeKeywordsForCharacter', () => {
  test('returns an array of keywords for a character', () => {
    const character = {
      name: 'Arthur'
    }

    const result = composeKeywordsForCharacter(character)

    expect(result).toEqual('arthur, kaamelott, gifs, alexandre astier, série française, moments cultes, collection')
  })

  test('returns an array of keywords for a character with a special character in name', () => {
    const character = {
      name: 'Arthur Pendragon'
    }

    const result = composeKeywordsForCharacter(character)

    expect(result).toEqual('arthur pendragon, kaamelott, gifs, alexandre astier, série française, moments cultes, collection')
  })
})

