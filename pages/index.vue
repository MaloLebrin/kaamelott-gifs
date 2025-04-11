<script setup lang="ts">
import GifGrid from '~/components/gifs/GifGrid.vue'
import SearchBar from '~/components/SearchBar.vue'
import type { Gif } from '~/types'

interface Character {
  name: string
  avatar: string
}

const route = useRoute()
const router = useRouter()

// Initialiser les états depuis l'URL
const searchQuery = ref(route.query.q?.toString() || '')
const selectedCharacter = ref(route.query.character?.toString() || '')

// Charger les données
const { data: charactersData } = await useFetch<Character[]>('/api/characters')
const { data: gifs } = await useFetch<Gif[]>('/api/gifs')

// SEO
useSeoMeta({
  title: 'Accueil',
  ogTitle: 'Kaamelott GIFs - Collection de GIFs de la série Kaamelott',
  description: 'Découvrez et partagez les meilleurs GIFs de Kaamelott. Une collection complète des moments cultes de la série.',
  ogDescription: 'Découvrez et partagez les meilleurs GIFs de Kaamelott. Une collection complète des moments cultes de la série.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
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

// Mettre à jour l'URL lors de la recherche
const handleSearch = (query: string, character: string) => {
  searchQuery.value = query
  selectedCharacter.value = character

  router.push({
    query: {
      ...route.query,
      q: query || undefined,
      character: character || undefined
    }
  })
}

// Réagir aux changements d'URL
watch(() => route.query, (newQuery) => {
  searchQuery.value = newQuery.q?.toString() || ''
  selectedCharacter.value = newQuery.character?.toString() || ''
}, { immediate: true })
</script>

<template>
  <main class="flex-1">
    <SearchBar
      :characters="charactersData || []"
      :initial-query="searchQuery"
      :initial-character="selectedCharacter"
      @search="handleSearch"
    />
    <GifGrid :gifs="filteredGifs" />
  </main>
</template> 
