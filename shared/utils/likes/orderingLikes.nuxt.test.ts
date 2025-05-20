import { orderingLikes } from "~/shared/utils/likes/orderingLikes"
import { Entities, type LikeableEntity } from "~/types/Entities"
import type { Character, Episode, Gif, Season } from "~/types"
import type { LikeWithRelation } from "~/types/Like"
import { describe, test, expect } from "vitest"
import { getEntityType } from "~/shared/utils/likes/likeableEntities"


// Helper pour créer des mocks de LikeWithRelation
const createMockLike = (type: LikeableEntity, id: number): LikeWithRelation => {
  const mockGif: Gif = {
    id: 1,
    slug: 'test-gif',
    url: 'test.gif',
    quote: 'Test quote',
    characters: ['Arthur', 'Perceval'],
    filename: 'test.gif',
    episode: 'S1E1',
    createdAt: '2024-01-01T00:00:00Z'
  }

  const mockCharacter: Character = {
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

  return {
    id,
    userId: 'user-1',
    createdAt: '2024-01-01T00:00:00Z',
    gifId: type === Entities.GIF ? id : null,
    characterId: type === Entities.CHARACTER ? id : null,
    episodeCode: type === Entities.EPISODE ? 'S1E1' : null,
    seasonId: type === Entities.SEASON ? id : null,
    gifs: mockGif,
    characters: mockCharacter,
    episodes: mockEpisode,
    seasons: mockSeason
  }
}

describe('orderingLikes', () => {
  test('should sort likes in the correct order: gifs, characters, episodes, seasons', () => {
    const mockLikes = [
      createMockLike(Entities.SEASON, 1),
      createMockLike(Entities.GIF, 2),
      createMockLike(Entities.EPISODE, 3),
      createMockLike(Entities.CHARACTER, 4),
    ]

    const sortedLikes = orderingLikes(mockLikes)
      
    expect(getEntityType(sortedLikes[0])).toBe(Entities.GIF)
    expect(getEntityType(sortedLikes[1])).toBe(Entities.CHARACTER)
    expect(getEntityType(sortedLikes[2])).toBe(Entities.EPISODE)
    expect(getEntityType(sortedLikes[3])).toBe(Entities.SEASON)
  })

  test('should maintain stable sort for same types', () => {
    const mockLikes = [
      createMockLike(Entities.GIF, 1),
      createMockLike(Entities.GIF, 2),
    ]

    const sortedLikes = orderingLikes(mockLikes)
      
    // Vérifie que l'ordre original est maintenu pour les mêmes types
    expect(sortedLikes[0].id).toBe(1)
    expect(sortedLikes[1].id).toBe(2)
  })
})
