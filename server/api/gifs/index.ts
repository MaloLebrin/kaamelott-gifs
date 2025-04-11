import { gifs } from '~/server/data/gifs'

export default defineEventHandler(async () => {
  return gifs
})
