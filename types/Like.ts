import type { BaseEntity, EpisodeCode } from "~/types"

export interface Like extends BaseEntity {
  userId: string
  gifId: number
  characterId: number
  episodeCode: EpisodeCode
  seasonId: number
}
