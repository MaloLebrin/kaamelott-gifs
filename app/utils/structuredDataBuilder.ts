/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  BaseItem,
  CharacterItem,
  EpisodeItem,
  GifItem,
  ItemType,
  SeasonItem,
  StructuredData
} from '~~/shared/types/structuredData'

const siteUrl = 'https://kaamelottgifs.fr'

/**
 * Construit les données de base pour un élément structuré selon le type spécifié
 * @param {BaseItem} item - L'élément de base contenant les informations communes
 * @param {ItemType} type - Le type d'élément (gif, character, episode, season)
 * @returns {Partial<StructuredData>} Les données structurées de base
 */
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

/**
 * Construit les données structurées pour un GIF
 * @param {GifItem} item - Les informations du GIF
 * @returns {StructuredData} Les données structurées complètes du GIF
 */
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

/**
 * Construit les données structurées pour un personnage
 * @param {CharacterItem} item - Les informations du personnage
 * @returns {StructuredData} Les données structurées complètes du personnage
 */
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

/**
 * Construit les données structurées pour un épisode
 * @param {EpisodeItem} item - Les informations de l'épisode
 * @returns {StructuredData} Les données structurées complètes de l'épisode
 */
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

/**
 * Construit les données structurées pour une saison
 * @param {SeasonItem} item - Les informations de la saison
 * @returns {StructuredData} Les données structurées complètes de la saison
 */
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

/**
 * Obtient le type de schéma correspondant au type d'élément
 * @param {ItemType} type - Le type d'élément
 * @returns {string} Le type de schéma correspondant
 * @private
 */
function getSchemaType(type: ItemType): string {
  switch (type) {
    case 'gif': return 'VideoObject'
    case 'character': return 'Person'
    case 'episode': return 'TVEpisode'
    case 'season': return 'TVSeason'
    default: return 'Thing'
  }
}

/**
 * Génère une description par défaut selon le type d'élément
 * @param {ItemType} type - Le type d'élément
 * @param {any} item - L'élément pour lequel générer la description
 * @returns {string} La description générée
 * @private
 */
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

/**
 * Construit les données structurées complètes selon le type d'élément
 * @param {ItemType} type - Le type d'élément
 * @param {any} item - Les informations de l'élément
 * @returns {StructuredData} Les données structurées complètes
 * @throws {Error} Si le type n'est pas supporté
 */
export function buildStructuredData(type: ItemType, item: any): StructuredData {
  switch (type) {
    case 'gif': return buildGifData(item as GifItem)
    case 'character': return buildCharacterData(item as CharacterItem)
    case 'episode': return buildEpisodeData(item as EpisodeItem)
    case 'season': return buildSeasonData(item as SeasonItem)
    default: throw new Error(`Type non supporté : ${type}`)
  }
}
