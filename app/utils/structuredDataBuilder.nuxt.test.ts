import { describe, expect, test } from 'vitest'
import type { CharacterItem, EpisodeItem, GifItem, SeasonItem } from '~~/shared/types/structuredData'
import { buildCharacterData, buildEpisodeData, buildGifData, buildSeasonData } from './structuredDataBuilder'

describe('buildGifData', () => {
  test('should build a valid structured data object for a gif', () => {
    const gif: GifItem = {
      id: '1',
      name: 'Gif 1',
      description: 'Description 1',
      image: '/images/gif1.jpg',
      quote: 'Quote 1',
      characters: ['Character 1', 'Character 2'],
      episode: 'S02E40',
      season: 2,
      gifUrl: '/images/gif1.jpg',
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    }

    const structuredData = buildGifData(gif)

    expect(structuredData).toBeDefined()
    expect(structuredData.name).toBe(gif.name)
    expect(structuredData.description).toBe(gif.description)
    expect(structuredData.image).toBe('https://kaamelottgifs.fr/images/gif1.jpg')
  })
})

describe('buildCharacterData', () => {
  test('should build a valid structured data object for a character', () => {
    const character: CharacterItem = {
      id: '1',
      name: 'Character 1',
      description: 'Description 1',
      image: '/images/character1.jpg',
      role: 'Role 1',
      episodes: ['Episode 1', 'Episode 2'],
      seasons: [1, 2],
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    }

    const structuredData = buildCharacterData(character)

    expect(structuredData).toBeDefined()
    expect(structuredData.name).toBe(character.name)
    expect(structuredData.description).toBe(character.description)
    expect(structuredData.image).toBe('https://kaamelottgifs.fr/images/character1.jpg')
  })
})

describe('buildEpisodeData', () => {
  test('should build a valid structured data object for an episode', () => {
    const episode: EpisodeItem = {
      id: '1',
      name: 'Episode 1',
      description: 'Description 1',
      image: '/images/episode1.jpg',
      season: 1,
      number: 1,
      characters: ['Character 1', 'Character 2'],
      gifs: ['Gif 1', 'Gif 2'], 
      createdAt: '2021-01-01',
      updatedAt: '2021-01-01',
    }

    const structuredData = buildEpisodeData(episode)  

    expect(structuredData).toBeDefined()
    expect(structuredData.name).toBe(episode.name)
    expect(structuredData.description).toBe(episode.description)
    expect(structuredData.image).toBe('https://kaamelottgifs.fr/images/episode1.jpg')
  })
})

describe('buildSeasonData', () => {
  test('should build a valid structured data object for a season', () => {
    const season: SeasonItem = {
      id: '1',
      name: 'Season 1', 
      description: 'Description 1',
      image: '/images/season1.jpg',
      number: 1,
      episodes: ['Episode 1', 'Episode 2'],
      characters: ['Character 1', 'Character 2'],
      createdAt: '2021-01-01',  
      updatedAt: '2021-01-01',
    }

    const structuredData = buildSeasonData(season)

    expect(structuredData).toBeDefined()  
    expect(structuredData.name).toBe(season.name)
    expect(structuredData.description).toBe(season.description)
    expect(structuredData.image).toBe('https://kaamelottgifs.fr/images/season1.jpg')
  })
})
