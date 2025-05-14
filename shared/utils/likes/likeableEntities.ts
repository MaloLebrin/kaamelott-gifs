import { Entities } from "~/types"

export const validEntityTypes = [
  Entities.GIF,
  Entities.CHARACTER,
  Entities.EPISODE,
  Entities.SEASON
]

export const likeableEntitiesIds = {
  [Entities.GIF]: 'gifId',
  [Entities.CHARACTER]: 'characterId',
  [Entities.EPISODE]: 'episodeCode',
  [Entities.SEASON]: 'seasonId'
}
