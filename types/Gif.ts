import type { Episode } from "~/types/Episode";
import type { BaseEntity } from "~/types/Entities";

interface CommonGif extends BaseEntity {
  quote: string
  filename: string;
  slug: string;
  url: string;
  public_id: string;
  episode: string | null;
}

export interface GifBackend extends CommonGif {
  characters: string
  characters_speaking: string;
}

export interface Gif extends CommonGif {
  characters: string[]
  characters_speaking: string[]
}

export interface GifWithEpisode extends Gif {
  episodeData?: Episode;
} 
