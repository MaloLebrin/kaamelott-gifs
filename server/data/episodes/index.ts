export * from "./seasonOne";
export * from "./seasonTwo";
export * from "./seasonThree";

export interface SeedEpisode {
  code: string;
  title: string;
  resume: string | null;
  characters: string | null;
  image?: string | null;
}
