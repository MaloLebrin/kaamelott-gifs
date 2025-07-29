import type { BaseEntity } from "~~/shared/types/Entities";
import type { EpisodeCode } from "~~/shared/types/Episode";

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
  episodeCodes: EpisodeCode[]
}

export interface CharacterInput extends Omit<CharacterBase, 'id' | 'createdAt' | 'updatedAt'> {
  episodeCodes: string
}
