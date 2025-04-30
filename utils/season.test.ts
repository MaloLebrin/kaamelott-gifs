import { describe, test, expect } from 'vitest'
import { composeSeasonToStructuredData } from './season'

describe('composeSeasonToStructuredData', () => {
  const mockSeason = {
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
      createdAt: '2023-01-01T00:00:00Z'
    }
  ]

  const mockGifs = [
    {
      id: 1,
      quote: 'Citation 1',
      filename: 'gif1.gif',
      slug: 'gif-1',
      url: 'https://example.com/gif1.gif',
      public_id: 'gif1',
      episode: 'S01E01',
      characters: ['Arthur', 'Perceval'],
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z'
    },
    {
      id: 2,
      quote: 'Citation 2',
      filename: 'gif2.gif',
      slug: 'gif-2',
      url: 'https://example.com/gif2.gif',
      public_id: 'gif2',
      episode: 'S01E02',
      characters: ['Arthur', 'Karadoc'],
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z'
    }
  ]

  test('composes SeasonItem correctly with all data', () => {
    const result = composeSeasonToStructuredData({
      season: mockSeason,
      episodes: mockEpisodes,
      gifs: mockGifs
    })

    expect(result).toEqual({
      ...mockSeason,
      episodes: ['S01E01', 'S01E02'],
      characters: ['Arthur', 'Perceval', 'Karadoc'],
      name: 'Saison 1',
      number: 1,
      description: 'Description de la saison 1',
      id: '1',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z'
    })
  })

  test('handles empty episodes array', () => {
    const result = composeSeasonToStructuredData({
      season: mockSeason,
      episodes: [],
      gifs: mockGifs
    })

    expect(result.episodes).toEqual([])
  })

  test('handles empty gifs array', () => {
    const result = composeSeasonToStructuredData({
      season: mockSeason,
      episodes: mockEpisodes,
      gifs: []
    })

    expect(result.characters).toEqual([])
  })

  test('removes duplicate characters', () => {
    const gifsWithDuplicates = [
      ...mockGifs,
      {
        ...mockGifs[0],
        id: 3,
        quote: 'Citation 3',
        filename: 'gif3.gif',
        slug: 'gif-3',
        url: 'https://example.com/gif3.gif',
        public_id: 'gif3'
      }
    ]

    const result = composeSeasonToStructuredData({
      season: mockSeason,
      episodes: mockEpisodes,
      gifs: gifsWithDuplicates
    })

    expect(result.characters).toEqual(['Arthur', 'Perceval', 'Karadoc'])
  })

  test('removes duplicate episode codes', () => {
    const episodesWithDuplicates = [
      ...mockEpisodes,
      {
        ...mockEpisodes[0],
        title: 'Épisode 1 bis'
      }
    ]

    const result = composeSeasonToStructuredData({
      season: mockSeason,
      episodes: episodesWithDuplicates,
      gifs: mockGifs
    })

    expect(result.episodes).toEqual(['S01E01', 'S01E02'])
  })

  test('preserves required SeasonItem properties', () => {
    const result = composeSeasonToStructuredData({
      season: mockSeason,
      episodes: mockEpisodes,
      gifs: mockGifs
    })

    expect(result.id).toBe('1')
    expect(result.name).toBe('Saison 1')
    expect(result.description).toBe('Description de la saison 1')
    expect(result.createdAt).toBe('2023-01-01T00:00:00Z')
    expect(result.updatedAt).toBe('2023-01-01T00:00:00Z')
    expect(result.number).toBe(1)
  })
}) 
