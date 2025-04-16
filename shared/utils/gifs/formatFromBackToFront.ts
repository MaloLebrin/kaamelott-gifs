import type { Gif } from "~/types";
import type { GifBackend } from "~/types";

export const formatFromBackToFront = (gifs: GifBackend[]): Gif[] => {
  return gifs.map((gif) => ({
    ...gif,
    characters: gif.characters.split(','),
    characters_speaking: gif.characters_speaking.split(','),
  }))
}
