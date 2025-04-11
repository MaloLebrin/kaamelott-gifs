<script setup lang="ts">
import GifGrid from '~/components/gifs/GifGrid.vue'
import SearchBar from '~/components/SearchBar.vue'
import type { Gif } from '~/types'

interface Character {
  name: string
  avatar: string
}

const searchQuery = ref('')
const selectedCharacter = ref('')

const { data: charactersData } = await useAsyncData<Character[]>('characters', () => {
  return $fetch('/api/characters')
})

// Charger les GIFs
const { data: gifs } = await useAsyncData<Gif[]>('gifs', () => {
  return $fetch('/api/gifs')
})

// Filtrer les GIFs
const filteredGifs = computed(() => {
  if (!gifs.value) return []
  
  return gifs.value.filter(gif => {
    const matchesSearch = gif.quote.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCharacter = !selectedCharacter.value || gif.characters.includes(selectedCharacter.value)
    return matchesSearch && matchesCharacter
  })
})

const handleSearch = (query: string, character: string) => {
  searchQuery.value = query
  selectedCharacter.value = character
}
</script>

<template>
  <main class="flex-1">
    <SearchBar
      :characters="charactersData || []"
      @search="handleSearch"
    />
    <!-- <GifGrid :gifs="filteredGifs" /> -->
  </main>
</template> 
