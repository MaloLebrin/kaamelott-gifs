export interface BaseEntity {
  id: number
  createdAt: string
  updatedAt: string | null
}

export enum Entities {
  GIF = 'gifs',
  CHARACTER = 'characters',
  EPISODE = 'episodes',
}
