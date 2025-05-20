import { unique } from "~/shared/utils/array"
import { getEpisodeId, getLivreFromCode } from "~/shared/utils/episodes/code"
import type { Episode } from "~/types/Episode"
import type { Gif } from "~/types/Gif"
import type { EpisodeItem } from "~/types/structuredData"

/**
 * Compose un EpisodeItem à partir d'un Episode et d'un tableau de GIFs pour les données structurées (SEO)
 * @param {Object} params - Les paramètres de composition
 * @param {Episode} params.episode - L'épisode source
 * @param {Gif[]} params.gifs - Les GIFs associés à l'épisode
 * @returns {EpisodeItem} Les données structurées de l'épisode
 * 
 * @example
 * ```ts
 * const episodeItem = composeEpisodeToStructuredData({
 *   episode: {
 *     code: 'S01E01',
 *     title: 'Le titre de l\'épisode',
 *     resume: 'Résumé de l\'épisode',
 *     createdAt: '2024-01-01'
 *   },
 *   gifs: [
 *     { quote: 'Réplique 1', characters: ['Arthur'] },
 *     { quote: 'Réplique 2', characters: ['Perceval'] }
 *   ]
 * })
 * // Retourne un EpisodeItem avec:
 * // - Les répliques des GIFs
 * // - Les personnages uniques
 * // - Les métadonnées de l'épisode
 * ```
 */
export function composeEpisodeToStructuredData({
  episode,
  gifs,
}: {
  episode: Episode
  gifs: Gif[]
}): EpisodeItem {
  const episodeId = getEpisodeId(episode)

  return {
    gifs: gifs.map(gif => gif.quote.toString()),
    characters: unique(gifs.map(gif => gif.characters).flat()),
    season: Number(getLivreFromCode(episode.code)),
    number: parseInt(episodeId),
    id: episodeId,
    name: episode.title,
    description: episode.resume || undefined,
    createdAt: episode.createdAt,
    updatedAt: episode.createdAt,
  }
}
