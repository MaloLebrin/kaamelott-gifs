<template>
  <div class="container mx-auto px-4 py-8 space-y-2">
    <div v-if="seasonData" class="mb-8 backdrop-blur-lg rounded-lg p-4 bg-white/90">
      <h1 class="text-4xl font-bold mb-4">{{ seasonData.season.title }}</h1>
      <p class="text-gray-600 mb-2">{{ seasonData.season.airDate }}</p>
      <div class="flex items-center text-sm text-gray-500  mb-4">
        <span class="mr-4">{{ seasonData.season.episodesCount }} épisodes</span>
        <span>{{ seasonData.season.duration }}</span>
      </div>
      <p class="text-gray-700">{{ seasonData.season.resume }}</p>
      <details class="sr-only">
        <a
          :href="seasonData.season.wikipediaLink"
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir plus de détails
        </a>
      </details>
    </div>

    <template v-if="seasonData && seasonData.gifs.length > 0">
      <div class="mt-8">
        <GifGrid :gifs="paginatedGifs" />
        
        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-8 flex justify-center">
          <Pagination 
            :current-page="currentPage" 
            :total-pages="totalPages" 
            @page-change="handlePageChange" 
          />
        </div>
      </div>
    </template>

    <div v-else class="text-center py-8 backdrop-blur-lg rounded-lg p-4 bg-white/90">
      <p class="text-gray-500">Aucun GIF disponible pour cette saison.</p>
    </div>

    <div v-if="seasonData && seasonData.episodes.length > 0">
      <h2 class="text-2xl font-bold mb-4">Episodes</h2>
      <EpisodeGrid :episodes="seasonData.episodes" />
    </div>

    <div v-if="seasonData && seasonData.otherSeasons.length > 0">
      <h2 class="text-2xl font-bold mb-4">Autres saisons</h2>
      <LivreGrid v-if="seasonData.otherSeasons" :seasons="seasonData.otherSeasons" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Gif } from '~/types'
import type { Season } from '~/types/Season'
import type { Episode } from '~/types/Episode'
import GifGrid from '~/components/gifs/GifGrid.vue'
import LivreGrid from '~/components/livres/LivreGrid.vue'
import Pagination from '~/components/base/Pagination.vue'
import EpisodeGrid from '~/components/episodes/EpisodeGrid.vue'
import { usePagination } from '~/composables/usePagination'

const route = useRoute()
const slug = route.params.slug as string

const { data: seasonData } = await useFetch<{
  gifs: Gif[]
  episodes: Episode[]
  season: Season
  otherSeasons: Season[]
}>(`/api/seasons/${slug}`)

const {
  currentPage,
  totalPages,
  paginatedItems: paginatedGifs,
  handlePageChange
} = usePagination({
  items: seasonData.value?.gifs || [],
  itemsPerPage: 21
})

const { $clientPosthog } = useNuxtApp()

onMounted(() => {
  if ($clientPosthog) {
    $clientPosthog.capture('page_view', {
      page: 'livre',
      season: seasonData.value?.season.title
    })
  }
})

const structuredData = computed(() => {
  if (seasonData.value) {
    return buildSeasonData(
      composeSeasonToStructuredData({
        season: seasonData.value.season,
        episodes: seasonData.value.episodes,
        gifs: seasonData.value.gifs
      })
    )
  }
  return null
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      value: JSON.stringify(structuredData.value)
    }
  ]
})

useSeoMeta({
  title: `${seasonData.value?.season.title} - Kaamelott GIFs`,
  ogTitle: `${seasonData.value?.season.title} - Kaamelott GIFs`,
  description: `Découvrez les meilleurs GIFs de ${seasonData.value?.season.title} de la série Kaamelott. ${seasonData.value?.season.resume}`,
  ogDescription: `Découvrez les meilleurs GIFs de ${seasonData.value?.season.title} de la série Kaamelott. ${seasonData.value?.season.resume}`,
  ogImage: '/fondKBg.webp',
  keywords: 'kaamelott, gifs, alexandre astier, série française, moments cultes, collection',
  author: 'Kaamelott GIFs',
  robots: 'index, follow',
  ogUrl: `https://kaamelottgifs.fr/livres/${seasonData.value?.season.slug}`,
  ogType: 'website',
  twitterImage: '/fondKBg.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: `${seasonData.value?.season.title} - Kaamelott GIFs`,
  twitterDescription: `Découvrez les meilleurs GIFs de ${seasonData.value?.season.title} de la série Kaamelott. ${seasonData.value?.season.resume}`,
})
</script>
