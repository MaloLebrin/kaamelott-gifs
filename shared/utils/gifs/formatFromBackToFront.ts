/**
 * Convertit les données des GIFs du format backend (chaînes séparées par des virgules) vers le format frontend (tableaux)
 * @template T - Type des GIFs qui doit inclure une propriété 'characters' de type string
 * @param {T[]} gifs - Liste des GIFs à formater
 * @returns {T[]} Liste des GIFs avec les personnages convertis en tableaux
 * 
 * @example
 * ```ts
 * const backendGifs = [
 *   { id: 1, characters: 'Arthur,Perceval', characters_speaking: 'Arthur' },
 *   { id: 2, characters: 'Karadoc,Perceval', characters_speaking: 'Karadoc' }
 * ]
 * 
 * const frontendGifs = formatFromBackToFront(backendGifs)
 * // Résultat:
 * // [
 * //   { id: 1, characters: ['Arthur', 'Perceval'], characters_speaking: ['Arthur'] },
 * //   { id: 2, characters: ['Karadoc', 'Perceval'], characters_speaking: ['Karadoc'] }
 * // ]
 * ```
 */
export function formatFromBackToFront<T extends {
  characters: string
  characters_speaking?: string
}>(gifs: T[]): T[] {
  if (!gifs || gifs.length === 0) {
    return []
  }

  const formattedGifs = []

  for (const gif of gifs) {

    if (gif.characters) {
      const formattedGif = {
        ...gif,
        characters: gif.characters?.split(','),
        characters_speaking: gif.characters_speaking?.split(','),
      }

      formattedGifs.push(formattedGif)
    }
  }

  return formattedGifs
}
