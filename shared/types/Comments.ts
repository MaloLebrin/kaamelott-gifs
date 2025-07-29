import type { EpisodeCode } from '~~/shared/types'
import type { BaseEntity } from './Entities'

export type CommentStatus = 'pending' | 'approved' | 'rejected'

export type CommentEntityType = 'gifs' | 'characters' | 'episodes' | 'seasons'

export interface CommentInput {
  content: string
  gifId?: number
  characterId?: number
  episodeCode?: string
  seasonId?: number
}

export interface CommentEntity extends BaseEntity {
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
  username: string
  email: string
  role: string
}

export interface CommentWithUser extends CommentEntity {
  profile?: CommentUser
} 
