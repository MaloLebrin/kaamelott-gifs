<script setup lang="ts">
import GifGrid from '~/components/gifs/GifGrid.vue'
import SearchBar from '~/components/SearchBar.vue'
import type { Gif } from '~/types'

const searchQuery = ref('')
const selectedCharacter = ref('')

const gifs = ref<Gif[]>([])

const filteredGifs = computed(() => {
  if (!gifs.value) return []
  
  return gifs.value.filter(gif => {
    const matchesQuery = searchQuery.value === '' || 
      gif.quote.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesCharacter = selectedCharacter.value === '' || 
      gif.characters.includes(selectedCharacter.value)
    
    return matchesQuery && matchesCharacter
  })
})

const characters = computed(() => {
  if (!gifs.value) return []
  const allCharacters = new Set<string>()
  gifs.value.forEach(gif => {
    gif.characters.forEach(char => allCharacters.add(char))
  })
  return Array.from(allCharacters).sort()
})

const handleSearch = (query: string, character: string) => {
  searchQuery.value = query
  selectedCharacter.value = character
}
</script>

<template>
  <main class="flex-1">
    <SearchBar
      :characters="characters"
      @search="handleSearch"
    />
    <GifGrid :gifs="filteredGifs" />
  </main>
</template> 
