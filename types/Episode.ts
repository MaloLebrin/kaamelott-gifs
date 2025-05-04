export interface Episode {
  code: string
  title: string
  slug: string
  characters: string | null
  resume: string | null
  createdAt: string
  imgUrl: string | null
}

export type EpisodeCode = `S${string}E${string}`
