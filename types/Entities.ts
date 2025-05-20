export interface BaseEntity {
  id: number
  createdAt: string
}

export enum Entities {
  GIF = 'gifs',
  CHARACTER = 'characters',
  EPISODE = 'episodes',
  SEASON = 'seasons',
  LIKE = 'likes',
  PROFILE = 'profiles',
}

export type LikeableEntity = Entities.GIF | Entities.CHARACTER | Entities.EPISODE | Entities.SEASON
