import { gifs } from '~/server/data/gifs'

export default defineEventHandler(async (event) => {
  const characterName = getRouterParam(event, 'characterName') as string

  return gifs.filter(gif => gif.characters.includes(characterName) || gif.characters_speaking.includes(characterName))
})
