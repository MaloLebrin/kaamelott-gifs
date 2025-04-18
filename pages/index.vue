<script setup lang="ts">
import GifGrid from '~/components/gifs/GifGrid.vue'
import SearchBar from '~/components/SearchBar.vue'
import Pagination from '~/components/base/Pagination.vue'
import type { Gif } from '~/types'

interface Character {
  name: string
  avatar: string
}

const route = useRoute()
const router = useRouter()
const { $clientPosthog } = useNuxtApp()

// Initialiser les états depuis l'URL
const searchQuery = ref(route.query.q?.toString() || '')
const selectedCharacter = ref(route.query.character?.toString() || '')
const currentPage = ref(Number(route.query.page) || 1)
const itemsPerPage = 20

// Charger les données
const { data: charactersData } = await useFetch<Character[]>('/api/characters')
const { data: gifs } = await useFetch<Gif[]>('/api/gifs')

// Filtrer les GIFs
const filteredGifs = computed(() => {
  if (!gifs.value) return []

  return gifs.value.filter(gif => {
    const matchesSearch = gif.quote.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCharacter = !selectedCharacter.value || gif.characters.includes(selectedCharacter.value)
    return matchesSearch && matchesCharacter
  })
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredGifs.value.length / itemsPerPage))
const paginatedGifs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredGifs.value.slice(start, end)
})

// Mettre à jour l'URL lors de la recherche ou du changement de page
const updateUrl = () => {
  router.push({
    query: {
      ...route.query,
      q: searchQuery.value || undefined,
      character: selectedCharacter.value || undefined,
      page: currentPage.value > 1 ? currentPage.value : undefined
    }
  })
}

// Gérer la recherche
const handleSearch = (query: string, character: string) => {
  searchQuery.value = query
  selectedCharacter.value = character
  currentPage.value = 1 // Reset à la première page lors d'une nouvelle recherche
  updateUrl()
}

// Gérer le changement de page
const handlePageChange = (page: number) => {
  currentPage.value = page
  updateUrl()
}

// Réagir aux changements d'URL
watch(() => route.query, (newQuery) => {
  searchQuery.value = newQuery.q?.toString() || ''
  selectedCharacter.value = newQuery.character?.toString() || ''
  currentPage.value = Number(newQuery.page) || 1
}, { immediate: true })

useSeoMeta({
  title: 'Accueil',
  description: 'Découvrez et partagez les meilleurs GIFs de Kaamelott. Une collection complète des moments cultes de la série.',
  ogTitle: 'Kaamelott GIFs - Collection de GIFs de la série Kaamelott',
  ogDescription: 'Découvrez et partagez les meilleurs GIFs de Kaamelott. Une collection complète des moments cultes de la série.',
  ogImage: '/fondKBg.webp',
  ogUrl: 'https://kaamelottgifs.com',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Kaamelott GIFs - Collection de GIFs de la série Kaamelott',
  twitterDescription: 'Découvrez et partagez les meilleurs GIFs de Kaamelott. Une collection complète des moments cultes de la série.',
  twitterImage: '/fondKBg.webp'
})

onMounted(() => {
  if ($clientPosthog) {
    $clientPosthog.capture('page_view', {
      page: 'home'
    })
  }
})
</script>

<template>
  <div class="flex-1">
    <SearchBar :characters="charactersData || []" :initial-query="searchQuery" :initial-character="selectedCharacter"
      @search="handleSearch" />
    <GifGrid :gifs="paginatedGifs" />

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-8 flex justify-center">
      <Pagination :current-page="currentPage" :total-pages="totalPages" @page-change="handlePageChange" />
    </div>
  </div>
</template>
