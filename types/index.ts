export interface Gif {
  quote: string;
  characters: string[];
  characters_speaking: string[];
  filename: string;
  slug: string;
  episode: string | null;
}

export interface Episode {
  code: string;
  title: string;
}

export interface GifWithEpisode extends Gif {
  episodeData?: Episode;
} 
