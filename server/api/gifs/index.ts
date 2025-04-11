import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export default defineEventHandler(async () => {
  const gifsPath = join(process.cwd(), 'content', 'gifs.json')
  const gifsData = await readFile(gifsPath, 'utf-8')
  const gifs = JSON.parse(gifsData)
  return gifs
})
