import type { Gif } from '~/types'
import type { GifStructuredData } from '~/types/seo'

export const useStructuredData = () => {
  const generateGifData = (gif: Gif): GifStructuredData => {
    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: gif.quote,
      description: gif.quote,
      thumbnailUrl: gif.url,
      contentUrl: gif.url,
      embedUrl: gif.url,
      uploadDate: gif.createdAt,
      duration: '00:00',
      isFamilyFriendly: true,
      inLanguage: 'fr',
      actor: gif.characters.map(character => ({
        '@type': 'Person',
        name: character
      })),
      partOfSeries: {
        '@type': 'TVSeries',
        name: 'Kaamelott'
      }
    }
  }

  // const generateCharacterData = (character: Character): CharacterStructuredData => {
  //   return {
  //     '@context': 'https://schema.org',
  //     '@type': 'Person',
  //     name: character.name,
  //     description: character.description,
  //     // image: character.image,
  //     // knowsAbout: character.knowsAbout,
  //     // memberOf: character.memberOf
  //   }
  // }

  // const generateEpisodeData = (episode: Episode): EpisodeStructuredData => {
  //   return {
  //     '@context': 'https://schema.org',
  //     '@type': 'TVEpisode',
  //     name: episode.title,
  //     // episodeNumber: episode.code,
  //     // seasonNumber: episode.season.code,
  //     // partOfSeries: episode.season.title,
  //     // description: episode.resume,
  //     // image: episode.thumbnailUrl,
  //     // datePublished: episode.airDate
  //   }
  // }

  // const generateSeasonData = (season: Season): SeasonStructuredData => {
  //   return {
  //     '@context': 'https://schema.org',
  //     '@type': 'TVEpisode',
  //     name: season.title,
  //     description: season.resume,
  //     // image: season.image,
  //     // datePublished: season.airDate,
  //     // partOfSeries: season.partOfSeries
  //   }
  // }
  return {
    generateGifData,
    // generateCharacterData,
    // generateEpisodeData
  }
} 
