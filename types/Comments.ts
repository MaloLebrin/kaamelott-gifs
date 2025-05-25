import type { EpisodeCode } from '~/types'
import type { BaseEntity } from './Entities'

export type CommentStatus = 'pending' | 'approved' | 'rejected'

export type CommentEntityType = 'gif' | 'character' | 'episode' | 'season'

export interface Comment extends BaseEntity {
  content: string
  userId: string
  status: CommentStatus
  gifId: number | null
  characterId: number | null
  episodeCode: EpisodeCode | null
  seasonId: number | null
}

export interface CommentInput {
  content: string
  gifId?: number | null
  characterId?: number | null
  episodeCode?: EpisodeCode | null
  seasonId?: number | null
}

// Type pour la réponse de l'API avec les informations utilisateur
export interface CommentWithUser extends Comment {
  user?: {
    id: string
    name: string
    avatar?: string
  }
} 
