import { episodes } from "~/server/data/episodes";
import { Entities, Episode } from "~/types";

/**
 * Seed episodes
 * @param client - Supabase client
 * @returns - Episodes data
 */
export const seedEpisodes = async (client: any) => {
  const episodesData: Episode[] = episodes.map((episode) => {
    const characters = [
      ...new Set(episode.characters?.split(',') || []),
    ].join(',')
    console.info(episode.code, 'episode.code')

    return {
      code: episode.code,
      title: episode.title,
      characters: characters,
      resume: episode.resume,
    }
  })
  const { data, error } = await client.from(Entities.EPISODE).insert(episodesData)
  if (error) {
    console.error(error)
  }
  return data
} 
