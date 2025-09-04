import { Entities, type LikeableEntity } from '~~/shared/types/Entities'
import type { LikeWithRelation } from '~~/shared/types/Like'
import { getEntityType } from './likeableEntities'

// Définition de l'ordre de tri pour chaque type d'entité likable
const typeOrder: Record<LikeableEntity, number> = {
  [Entities.GIF]: 0,
  [Entities.CHARACTER]: 1,
  [Entities.EPISODE]: 2,
  [Entities.SEASON]: 3,
} as const

export function orderingLikes(likes: LikeWithRelation[]) {
  return [...likes].sort((a, b) => {
    const typeA = getEntityType(a) as LikeableEntity
    const typeB = getEntityType(b) as LikeableEntity
    
    // Comparaison basée sur l'ordre défini dans typeOrder
    return typeOrder[typeA] - typeOrder[typeB]
  })
}

// Tests unitaires pour vérifier le tri


