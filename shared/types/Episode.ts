export interface Episode {
  code: EpisodeCode
  title: string
  slug: string
  characters: string | null
  resume: string | null
  createdAt: string
  imgUrl: string | null
}

export type EpisodeCode = `S${string}E${string}`
