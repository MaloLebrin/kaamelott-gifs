import type { BaseEntity, Character, Episode, Season, EpisodeCode, Gif } from "~/types"

export interface Like extends BaseEntity {
  userId: string
  gifId: number | null
  characterId: number | null
  episodeCode: EpisodeCode | null
  seasonId: number | null
}

export interface LikeWithRelation extends Like {
  gifs: Gif
  characters: Character
  episodes: Episode
  seasons: Season
}


export interface LikeSeason extends Like {
  seasons: Season
}

export interface LikeEpisode extends Like {
  episodes: Episode
}

export interface LikeCharacter extends Like {
  characters: Character
} 

export interface LikeGif extends Like {
  gifs: Gif
}
