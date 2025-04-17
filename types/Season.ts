import type { BaseEntity } from "~/types/Entities"

export interface Season extends BaseEntity {
  title: string
  resume: string
  airDate: string
  episodesCount: number
  duration: string
  slug: string
  wikipediaLink: string
}
