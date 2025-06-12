export function sortGifsByCharacters<T extends {
  characters: string[] | null
  characters_speaking?: string[] | null
}>(
  {
    gifs,
    character
  }: {
    gifs: T[],
    character: string
  }
): T[] {
  if (!gifs || gifs.length === 0) {
    return []
  }

  if (!character) {
    return gifs
  }

  return gifs.sort((gifA, gifB) => {
    const charactersA = gifA.characters || []
    const charactersB = gifB.characters || []
    const charactersSpeakingA = gifA.characters_speaking || []
    const charactersSpeakingB = gifB.characters_speaking || []
    
    // Calculate scores for each GIF
    // Speaking = 2 points, appearing = 1 point
    const scoreA = (charactersSpeakingA.includes(character) ? 2 : 0) + 
                  (charactersA.includes(character) ? 1 : 0)
    const scoreB = (charactersSpeakingB.includes(character) ? 2 : 0) + 
                  (charactersB.includes(character) ? 1 : 0)
    
    // Sort in descending order (higher scores first)
    return scoreB - scoreA
  })
}
