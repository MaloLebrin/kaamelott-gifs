<script setup lang="ts">
import GifGrid from '~/components/gifs/GifGrid.vue'
import SearchBar from '~/components/SearchBar.vue'
import Pagination from '~/components/base/Pagination.vue'
import Breadcrumbs from '~/components/base/Breadcrumbs.vue'
import type { Gif } from '~/types'
import { usePagination } from '~/composables/usePagination'

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

// Charger les données
const { data: charactersData } = await useFetch<Character[]>('/api/characters')
const { data: gifs } = await useFetch<Gif[]>('/api/gifs')

const {
  totalPages,
  paginatedItems: paginatedGifs,
} = usePagination({
  items: gifs.value || [],
  itemsPerPage: 21
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

// Données pour les breadcrumbs
const breadcrumbItems = computed(() => {
  const items = []
  
  if (searchQuery.value) {
    items.push({
      label: `Recherche : ${searchQuery.value}`,
      to: `/search?q=${encodeURIComponent(searchQuery.value)}`
    })
  }
  
  if (selectedCharacter.value) {
    items.push({
      label: selectedCharacter.value,
      to: `/characters/${encodeURIComponent(selectedCharacter.value)}`
    })
  }
  
  if (currentPage.value > 1) {
    items.push({
      label: `Page ${currentPage.value}`,
      to: `?page=${currentPage.value}`
    })
  }
  
  return items
})

useSeoMeta({
  title: 'Accueil',
  description: 'Découvrez et partagez les meilleurs GIFs de Kaamelott. Une collection complète des moments cultes de la série.',
  ogTitle: 'Kaamelott GIFs - Collection de GIFs de la série Kaamelott',
  ogDescription: 'Découvrez et partagez les meilleurs GIFs de Kaamelott. Une collection complète des moments cultes de la série.',
  ogImage: '/fondKBg.webp',
  ogUrl: 'https://kaamelottgifs.fr',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Kaamelott GIFs - Collection de GIFs de la série Kaamelott',
  twitterDescription: 'Découvrez et partagez les meilleurs GIFs de Kaamelott. Une collection complète des moments cultes de la série.',
  twitterImage: '/fondKBg.webp',
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
    <h1 class="sr-only">Kaamelott GIFs - Collection de GIFs de la série Kaamelott</h1>
    <Breadcrumbs :items="breadcrumbItems" />
    <section aria-labelledby="search-heading">
      <h2 id="search-heading" class="sr-only">Recherche de GIFs</h2>
      <SearchBar 
        :characters="charactersData || []" 
        :initial-query="searchQuery" 
        :initial-character="selectedCharacter"
        @search="handleSearch" 
      />
    </section>
    
    <section aria-labelledby="gifs-heading" class="mt-8">
      <h2 id="gifs-heading" class="sr-only">Gifs de Kaamelott</h2>
      <GifGrid :gifs="paginatedGifs" />
      
      <!-- Pagination -->
      <nav v-if="totalPages > 1" class="mt-8 flex justify-center" aria-label="Navigation des pages">
        <Pagination 
          :current-page="currentPage" 
          :total-pages="totalPages" 
          @page-change="handlePageChange" 
        />
      </nav>
    </section>
  </div>
</template>
