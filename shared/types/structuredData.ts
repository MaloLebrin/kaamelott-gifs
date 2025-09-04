export interface BaseItem {
  id: string
  name: string
  description?: string
  image?: string
  createdAt: string
  updatedAt: string
}

export interface GifItem extends BaseItem {
  quote: string
  characters: string[]
  episode: string
  season: number
  gifUrl: string
}

export interface CharacterItem extends BaseItem {
  role: string
  episodes: string[]
  seasons: number[]
}

export interface EpisodeItem extends BaseItem {
  season: number
  number: number
  characters: string[]
  gifs: string[]
}

export interface SeasonItem extends BaseItem {
  number: number
  episodes: string[]
  characters: string[]
}

export type ItemType = 'gif' | 'character' | 'episode' | 'season'

export interface StructuredData {
  '@context': string
  '@type': string
  name: string
  description: string
  image?: string
  url: string
  datePublished: string
  dateModified: string
  author: {
    '@type': string
    name: string
    url: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
} 
