export interface GifStructuredData {
  "@context": "https://schema.org"
  "@type": "VideoObject"
  name: string
  description: string
  thumbnailUrl: string
  contentUrl: string
  embedUrl: string
  uploadDate: string
  duration: string
  isFamilyFriendly: boolean
  inLanguage: "fr"
  actor: {
    "@type": "Person"
    name: string
  }[]
  partOfSeries: {
    "@type": "TVSeries"
    name: "Kaamelott"
  }
}

export interface CharacterStructuredData {
  "@context": "https://schema.org"
  "@type": "Person"
  name: string
  description: string
  image: string
  knowsAbout: string[]
  memberOf: {
    "@type": "Organization"
    name: "Table Ronde"
  }
}

export interface EpisodeStructuredData {
  "@context": "https://schema.org"
  "@type": "TVEpisode"
  name: string
  episodeNumber: number
  seasonNumber: number
  partOfSeries: {
    "@type": "TVSeries"
    name: "Kaamelott"
  }
  description: string
  image: string
  datePublished: string
} 
