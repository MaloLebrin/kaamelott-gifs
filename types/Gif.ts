import type { Episode } from "~/types/Episode";
import type { BaseEntity } from "~/types/Entities";

interface CommonGif extends BaseEntity {
  quote: string
  filename: string;
  slug: string;
  url: string;
  episode: string | null;
}

export interface GifBackend extends CommonGif {
  characters: string
  characters_speaking?: string;
}

export interface Gif extends CommonGif {
  characters: string[]
  characters_speaking?: string[]
}

export interface GifWithEpisode extends Gif {
  episodeData?: Episode;
} 

export interface GifUpload {
  file?: File;
  quote: string;
  characters: { id: number; name: string }[];
  speakingCharacters: { id: number; name: string }[];
  episode: string;
  filename: string;
  slug: string;
  url: string;
}
