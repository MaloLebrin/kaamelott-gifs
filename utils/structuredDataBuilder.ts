/* eslint-disable @typescript-eslint/no-explicit-any */
import type { 
  BaseItem, 
  GifItem, 
  CharacterItem,
  EpisodeItem, 
  SeasonItem, 
  ItemType, 
  StructuredData 
} from '~/types/structuredData'

const siteUrl = 'https://kaamelottgifs.fr'

export function buildBaseData(item: BaseItem, type: ItemType): Partial<StructuredData> {
  return {
    '@context': 'https://schema.org',
    '@type': getSchemaType(type),
    name: item.name,
    description: item.description || getDefaultDescription(type, item),
    image: item.image ? `${siteUrl}${item.image}` : undefined,
    url: `${siteUrl}/${type}s/${item.id}`,
    datePublished: item.createdAt,
    dateModified: item.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'Kaamelott GIFs',
      url: siteUrl
    }
  }
}

export function buildGifData(item: GifItem): StructuredData {
  const baseData = buildBaseData(item, 'gif')
  
  return {
    ...baseData,
    '@type': 'VideoObject',
    contentUrl: `${siteUrl}${item.gifUrl}`,
    thumbnailUrl: `${siteUrl}${item.image}`,
    actor: item.characters.map(char => ({
      '@type': 'Person',
      name: char
    })),
    partOfSeries: {
      '@type': 'TVSeries',
      name: 'Kaamelott',
      season: item.season,
      episode: item.episode
    }
  } as StructuredData
}

export function buildCharacterData(item: CharacterItem): StructuredData {
  const baseData = buildBaseData(item, 'character')
  
  return {
    ...baseData,
    '@type': 'Person',
    jobTitle: item.role,
    appearsIn: item.episodes.map(ep => ({
      '@type': 'TVEpisode',
      name: ep,
      partOfSeries: {
        '@type': 'TVSeries',
        name: 'Kaamelott'
      }
    }))
  } as StructuredData
}

export function buildEpisodeData(item: EpisodeItem): StructuredData {
  const baseData = buildBaseData(item, 'episode')
  
  return {
    ...baseData,
    '@type': 'TVEpisode',
    episodeNumber: item.number,
    seasonNumber: item.season,
    partOfSeries: {
      '@type': 'TVSeries',
      name: 'Kaamelott'
    },
    actor: item.characters.map(char => ({
      '@type': 'Person',
      name: char
    }))
  } as StructuredData
}

export function buildSeasonData(item: SeasonItem): StructuredData {
  const baseData = buildBaseData(item, 'season')
  
  return {
    ...baseData,
    '@type': 'TVSeason',
    seasonNumber: item.number,
    partOfSeries: {
      '@type': 'TVSeries',
      name: 'Kaamelott'
    },
    actor: item.characters.map(char => ({
      '@type': 'Person',
      name: char
    }))
  } as StructuredData
}

function getSchemaType(type: ItemType): string {
  switch (type) {
    case 'gif': return 'VideoObject'
    case 'character': return 'Person'
    case 'episode': return 'TVEpisode'
    case 'season': return 'TVSeason'
    default: return 'Thing'
  }
}

function getDefaultDescription(type: ItemType, item: any): string {
  switch (type) {
    case 'gif':
      return `Réplique de ${item.characters.join(', ')} dans l'épisode ${item.episode} de la saison ${item.season} de Kaamelott`
    case 'character':
      return `Personnage de Kaamelott : ${item.name}`
    case 'episode':
      return `Épisode ${item.number} de la saison ${item.season} de Kaamelott`
    case 'season':
      return `Saison ${item.number} de Kaamelott`
    default:
      return `Contenu de Kaamelott : ${item.name}`
  }
} 

export function buildStructuredData(type: ItemType, item: any): StructuredData {
  switch (type) {
    case 'gif': return buildGifData(item as GifItem)
    case 'character': return buildCharacterData(item as CharacterItem)
    case 'episode': return buildEpisodeData(item as EpisodeItem)
    case 'season': return buildSeasonData(item as SeasonItem)
    default: throw new Error(`Type non supporté : ${type}`)
  }
}
