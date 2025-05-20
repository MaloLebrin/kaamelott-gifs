import { describe, test, expect } from 'vitest'
import { isGif, isCharacter, isEpisode, isSeason } from './entities'
import type { Gif } from '~/types/Gif'
import type { Character } from '~/types/Characters'
import type { Episode } from '~/types/Episode'
import type { Season } from '~/types/Season'

describe('entities', () => {
  describe('isGif', () => {
    test('should return true for a valid GIF entity', () => {
      const gif: Gif = {
        id: 1,
        slug: 'test-gif',
        url: 'test.gif',
        quote: 'Test quote',
        characters: ['Arthur', 'Perceval'],
        filename: 'test.gif',
        episode: 'S1E1',
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(isGif(gif)).toBe(true)
    })

    test('should return false for other entity types', () => {
      const character: Character = {
        id: 1,
        name: 'Test Character',
        imgUrl: 'https://example.com/character.jpg',
        slug: 'test-character',
        actor: 'Test Actor',
        description: 'Test description',
        history: 'Test history',
        isMainCharacter: true,
        episodeCodes: ['S1E1'],
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(isGif(character)).toBe(false)

      const episode: Episode = {
        code: 'S1E1',
        slug: 'test-episode',
        title: 'Test Episode',
        resume: 'Test resume',
        characters: 'Arthur,Perceval',
        imgUrl: 'https://example.com/episode.jpg',
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(isGif(episode)).toBe(false)

      const season: Season = {
        id: 1,
        slug: 'test-season',
        title: 'Test Season',
        airDate: '2024-01-01',
        resume: 'Test resume',
        episodesCount: 10,
        duration: '45min',
        wikipediaLink: 'https://example.com',
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(isGif(season)).toBe(false)
    })
  })

  describe('isCharacter', () => {
    test('should return true for a valid Character entity', () => {
      const character: Character = {
        id: 1,
        name: 'Test Character',
        imgUrl: 'https://example.com/character.jpg',
        slug: 'test-character',
        actor: 'Test Actor',
        description: 'Test description',
        history: 'Test history',
        isMainCharacter: true,
        episodeCodes: ['S1E1'],
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(isCharacter(character)).toBe(true)
    })

    test('should return false for other entity types', () => {
      const gif: Gif = {
        id: 1,
        slug: 'test-gif',
        url: 'test.gif',
        quote: 'Test quote',
        characters: ['Arthur', 'Perceval'],
        filename: 'test.gif',
        episode: 'S1E1',
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(isCharacter(gif)).toBe(false)

      const episode: Episode = {
        code: 'S1E1',
        slug: 'test-episode',
        title: 'Test Episode',
        resume: 'Test resume',
        characters: 'Arthur,Perceval',
        imgUrl: 'https://example.com/episode.jpg',
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(isCharacter(episode)).toBe(false)

      const season: Season = {
        id: 1,
        slug: 'test-season',
        title: 'Test Season',
        airDate: '2024-01-01',
        resume: 'Test resume',
        episodesCount: 10,
        duration: '45min',
        wikipediaLink: 'https://example.com',
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(isCharacter(season)).toBe(false)
    })
  })

  describe('isEpisode', () => {
    test('should return true for a valid Episode entity', () => {
      const episode: Episode = {
        code: 'S1E1',
        slug: 'test-episode',
        title: 'Test Episode',
        resume: 'Test resume',
        characters: 'Arthur,Perceval',
        imgUrl: 'https://example.com/episode.jpg',
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(isEpisode(episode)).toBe(true)
    })

    test('should return false for other entity types', () => {
      const gif: Gif = {
        id: 1,
        slug: 'test-gif',
        url: 'test.gif',
        quote: 'Test quote',
        characters: ['Arthur', 'Perceval'],
        filename: 'test.gif',
        episode: 'S1E1',
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(isEpisode(gif)).toBe(false)

      const character: Character = {
        id: 1,
        name: 'Test Character',
        imgUrl: 'https://example.com/character.jpg',
        slug: 'test-character',
        actor: 'Test Actor',
        description: 'Test description',
        history: 'Test history',
        isMainCharacter: true,
        episodeCodes: ['S1E1'],
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(isEpisode(character)).toBe(false)

      const season: Season = {
        id: 1,
        slug: 'test-season',
        title: 'Test Season',
        airDate: '2024-01-01',
        resume: 'Test resume',
        episodesCount: 10,
        duration: '45min',
        wikipediaLink: 'https://example.com',
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(isEpisode(season)).toBe(false)
    })
  })

  describe('isSeason', () => {
    test('should return true for a valid Season entity', () => {
      const season: Season = {
        id: 1,
        slug: 'test-season',
        title: 'Test Season',
        airDate: '2024-01-01',
        resume: 'Test resume',
        episodesCount: 10,
        duration: '45min',
        wikipediaLink: 'https://example.com',
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(isSeason(season)).toBe(true)
    })

    test('should return false for other entity types', () => {
      const gif: Gif = {
        id: 1,
        slug: 'test-gif',
        url: 'test.gif',
        quote: 'Test quote',
        characters: ['Arthur', 'Perceval'],
        filename: 'test.gif',
        episode: 'S1E1',
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(isSeason(gif)).toBe(false)

      const character: Character = {
        id: 1,
        name: 'Test Character',
        imgUrl: 'https://example.com/character.jpg',
        slug: 'test-character',
        actor: 'Test Actor',
        description: 'Test description',
        history: 'Test history',
        isMainCharacter: true,
        episodeCodes: ['S1E1'],
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(isSeason(character)).toBe(false)

      const episode: Episode = {
        code: 'S1E1',
        slug: 'test-episode',
        title: 'Test Episode',
        resume: 'Test resume',
        characters: 'Arthur,Perceval',
        imgUrl: 'https://example.com/episode.jpg',
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(isSeason(episode)).toBe(false)
    })
  })
})

