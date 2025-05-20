/**
 * Format the gifs from the backend to the frontend
 * @param gifs - The gifs to format
 * @returns The formatted gifs
 */
export function formatFromBackToFront<T extends {
  characters: string | null
  characters_speaking?: string | null
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
