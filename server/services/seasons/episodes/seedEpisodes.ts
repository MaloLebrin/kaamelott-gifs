/* eslint-disable @typescript-eslint/no-explicit-any */
import { episodes } from "~/server/data/episodes";
import type { Episode } from "~/types";
import { Entities } from "~/types";
import { slugify } from "~/shared/utils/string";

/**
 * Seed episodes
 * @param client - Supabase client
 * @returns - Episodes data
 */
export const seedEpisodes = async (client: any) => {
  const episodesData: Episode[] = episodes.map(episode => {
    const characters = [
      ...new Set(episode.characters?.split(',') || []),
    ].join(',')

    return {
      code: episode.code,
      title: episode.title,
      characters: characters,
      resume: episode.resume,
      slug: slugify(`${episode.code}-${episode.title}`),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      imgUrl: episode.imgUrl || null,
    }
  })
  const { data, error } = await client.from(Entities.EPISODE).insert(episodesData)
  if (error) {
    console.error(error)
  }
  return data
} 
