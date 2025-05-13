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
}
