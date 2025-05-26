import type { EpisodeCode } from '~/types'
import type { BaseEntity } from './Entities'

export type CommentStatus = 'pending' | 'approved' | 'rejected'

export type CommentEntityType = 'gif' | 'character' | 'episode' | 'season'

export interface CommentInput {
  content: string
  gifId?: number
  characterId?: number
  episodeCode?: string
  seasonId?: number
}

export interface Comment extends BaseEntity {
  content: string
  userId: string
  status: CommentStatus
  gifId?: number
  characterId?: number
  episodeCode?: EpisodeCode
  seasonId?: number
  updatedAt: string
}

export interface CommentUser {
  id: string
  name: string
  avatar?: string
}

export interface CommentWithUser extends Comment {
  user?: CommentUser
} 
