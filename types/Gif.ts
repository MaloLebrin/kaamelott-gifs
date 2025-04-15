import type { Episode } from "~/types/Episode";

export interface Gif {
  quote: string;
  characters: string[];
  characters_speaking: string[];
  filename: string;
  slug: string;
  episode: string | null;
  url: string;
  public_id: string;
}

export interface GifWithEpisode extends Gif {
  episodeData?: Episode;
} 
