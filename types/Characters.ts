import type { BaseEntity } from "~/types/Entities";
import type { EpisodeCode } from "~/types/Episode";

export interface Character extends BaseEntity {
  name: string
  slug: string
  actor: string
  episodesCodes: EpisodeCode[]
  imgUrl: string
  description: string
  history: string
  isMainCharacter: boolean
}
