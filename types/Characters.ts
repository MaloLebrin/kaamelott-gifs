import type { BaseEntity } from "~/types/Entities";
import type { EpisodeCode } from "~/types/Episode";

interface CharacterBase  extends BaseEntity {
  name: string
  slug: string
  actor: string | null
  imgUrl: string
  description: string | null
  history: string | null
  isMainCharacter: boolean
}

export interface Character extends CharacterBase {
  episodesCodes: EpisodeCode[]
}

export interface CharacterInput extends Omit<CharacterBase, 'id' | 'createdAt' | 'updatedAt'> {
  episodesCodes: string
}
