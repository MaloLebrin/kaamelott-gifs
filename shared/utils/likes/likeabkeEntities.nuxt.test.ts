import { describe, expect, test } from 'vitest'
import type { Character, Episode, Gif, Season } from '~~/shared/types'
import { Entities } from '~~/shared/types'
import type { Like, LikeWithRelation } from '~~/shared/types/Like'
import { getEntity, getEntityType, likeableEntitiesIds, validEntityTypes } from './likeableEntities'

describe('likeableEntities', () => {
  describe('validEntityTypes', () => {
    test('should contain all valid entity types', () => {
      expect(validEntityTypes).toContain(Entities.GIF)
      expect(validEntityTypes).toContain(Entities.CHARACTER)
      expect(validEntityTypes).toContain(Entities.EPISODE)
      expect(validEntityTypes).toContain(Entities.SEASON)
      expect(validEntityTypes).toHaveLength(4)
    })
  })

  describe('likeableEntitiesIds', () => {
    test('should map each entity type to its corresponding ID field', () => {
      expect(likeableEntitiesIds[Entities.GIF]).toBe('gifId')
      expect(likeableEntitiesIds[Entities.CHARACTER]).toBe('characterId')
      expect(likeableEntitiesIds[Entities.EPISODE]).toBe('episodeCode')
      expect(likeableEntitiesIds[Entities.SEASON]).toBe('seasonId')
    })
  })

  describe('getEntityType', () => {
    test('should return GIF type for gif likes', () => {
      const like: Like = { 
        id: 1,
        userId: '456',
        gifId: 123,
        characterId: 0,
        episodeCode: null,
        seasonId: 0,
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(getEntityType(like)).toBe(Entities.GIF)
    })

    test('should return CHARACTER type for character likes', () => {
      const like: Like = { 
        id: 1,
        userId: '456',
        gifId: 0,
        characterId: 123,
        episodeCode: null,
        seasonId: 0,
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(getEntityType(like)).toBe(Entities.CHARACTER)
    })

    test('should return EPISODE type for episode likes', () => {
      const like: Like = { 
        id: 1,
        userId: '456',
        gifId: 0,
        characterId: 0,
        episodeCode: 'S1E1',
        seasonId: 0,
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(getEntityType(like)).toBe(Entities.EPISODE)
    })

    test('should return SEASON type for season likes', () => {
      const like: Like = { 
        id: 1,
        userId: '456',
        gifId: 0,
        characterId: 0,
        episodeCode: null,
        seasonId: 123,
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(getEntityType(like)).toBe(Entities.SEASON)
    })

    test('should throw error for invalid like object', () => {
      const like: Like = { 
        id: 1,
        userId: '456',
        gifId: 0,
        characterId: 0,
        episodeCode: null,
        seasonId: 0,
        createdAt: '2024-01-01T00:00:00Z'
      }
      expect(() => getEntityType(like)).toThrow('Invalid like: no entity type found')
    })
  })

  describe('getEntity', () => {
    const mockGif: Gif = {
      id: 123,
      slug: 'test-gif',
      url: 'test.gif',
      quote: 'Test quote',
      characters: ['Arthur', 'Perceval'],
      filename: 'test.gif',
      episode: 'S1E1',
      createdAt: '2024-01-01T00:00:00Z'
    }

    const mockCharacter: Character = {
      id: 123,
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

    const mockEpisode: Episode = {
      code: 'S1E1',
      slug: 'test-episode',
      title: 'Test Episode',
      resume: 'Test resume',
      characters: 'Arthur,Perceval',
      imgUrl: 'https://example.com/episode.jpg',
      createdAt: '2024-01-01T00:00:00Z'
    }

    const mockSeason: Season = {
      id: 123,
      slug: 'test-season',
      title: 'Test Season',
      airDate: '2024-01-01',
      resume: 'Test resume',
      episodesCount: 10,
      duration: '45min',
      wikipediaLink: 'https://example.com',
      createdAt: '2024-01-01T00:00:00Z'
    }

    test('should return gif entity for gif likes', () => {
      const like: LikeWithRelation = {
        id: 1,
        userId: '456',
        gifId: 123,
        characterId: 0,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        episodeCode: null as any,
        seasonId: 0,
        createdAt: '2024-01-01T00:00:00Z',
        gifs: mockGif,
        characters: mockCharacter,
        episodes: mockEpisode,
        seasons: mockSeason
      }
      expect(getEntity(like)).toBe(mockGif)
    })

    test('should return character entity for character likes', () => {
      const like: LikeWithRelation = {
        id: 1,
        userId: '456',
        gifId: 0,
        characterId: 123,
        episodeCode: null,
        seasonId: 0,
        createdAt: '2024-01-01T00:00:00Z',
        gifs: mockGif,
        characters: mockCharacter,
        episodes: mockEpisode,
        seasons: mockSeason
      }
      expect(getEntity(like)).toBe(mockCharacter)
    })

    test('should return episode entity for episode likes', () => {
      const like: LikeWithRelation = {
        id: 1,
        userId: '456',
        gifId: 0,
        characterId: 0,
        episodeCode: 'S1E1',
        seasonId: 0,
        createdAt: '2024-01-01T00:00:00Z',
        gifs: mockGif,
        characters: mockCharacter,
        episodes: mockEpisode,
        seasons: mockSeason
      }
      expect(getEntity(like)).toBe(mockEpisode)
    })

    test('should return season entity for season likes', () => {
      const like: LikeWithRelation = {
        id: 1,
        userId: '456',
        gifId: 0,
        characterId: 0,
        episodeCode: null,
        seasonId: 123,
        createdAt: '2024-01-01T00:00:00Z',
        gifs: mockGif,
        characters: mockCharacter,
        episodes: mockEpisode,
        seasons: mockSeason
      }
      expect(getEntity(like)).toBe(mockSeason)
    })

    test('should throw error for invalid entity type', () => {
      const like: LikeWithRelation = {
        id: 1,
        userId: '456',
        gifId: 0,
        characterId: 0,
        episodeCode: null,
        seasonId: 0,
        createdAt: '2024-01-01T00:00:00Z',
        gifs: mockGif,
        characters: mockCharacter,
        episodes: mockEpisode,
        seasons: mockSeason
      }
      expect(() => getEntity(like)).toThrow('Invalid like: no entity type found')
    })
  })
})
