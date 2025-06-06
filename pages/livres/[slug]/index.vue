<template>
<div class="container mx-auto px-4 py-8 space-y-2">
  <Breadcrumbs :items="breadcrumbItems" />
  <div
    v-if="seasonData"
    class="my-8 backdrop-blur-lg rounded-lg p-4 bg-white/90 dark:bg-gray-800 dark:text-gray-50">
    <div class="flex mb-4 space-x-2.5">
      <h1 class="text-4xl font-bold ">{{ seasonData.season.title }}</h1>
      <LikeButton
        :entity-id="seasonData.season.id"
        :entity-type="Entities.SEASON"
      />
    </div>
    <p class="text-gray-600 dark:text-gray-500 mb-2">{{ seasonData.season.airDate }}</p>
    <div class="flex items-center text-sm text-gray-500 dark:text-gray-200  mb-4">
      <span class="mr-4">{{ seasonData.season.episodesCount }} épisodes</span>
      <span>{{ seasonData.season.duration }}</span>
    </div>
    <p class="text-gray-700 dark:text-gray-200">{{ seasonData.season.resume }}</p>
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
      <div
        v-if="totalPages > 1"
        class="mt-8 flex justify-center">
        <Pagination 
          :current-page="currentPage" 
          :total-pages="totalPages" 
          @page-change="handlePageChange" 
        />
      </div>
    </div>
  </template>

  <div
    v-else
    class="text-center py-8 backdrop-blur-lg rounded-lg p-4 bg-white/90">
    <p class="text-gray-500">Aucun GIF disponible pour cette saison.</p>
  </div>

  <div v-if="seasonData && seasonData.episodes.length > 0">
    <h2 class="text-2xl font-bold mb-4">Episodes</h2>
    <EpisodeGrid :episodes="seasonData.episodes" />
  </div>

  <div v-if="seasonData && seasonData.otherSeasons.length > 0">
    <h2 class="text-2xl font-bold mb-4">Autres saisons</h2>
    <LivreGrid
      v-if="seasonData.otherSeasons"
      :seasons="seasonData.otherSeasons" />
  </div>

  <!-- Section des commentaires -->
  <div
    v-if="seasonData?.season"
    class="mt-8 bg-white rounded-lg shadow-sm p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Commentaires</h2>
    <CommentList
      :entity-type="Entities.SEASON"
      :entity-id="seasonData.season.id"
    />
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
import Breadcrumbs from '~/components/base/Breadcrumbs.vue'
import LikeButton from '~/components/base/LikeButton.vue'
import CommentList from '~/components/comments/CommentList.vue'
import { usePagination } from '~/composables/usePagination'
import { Entities } from '~/types'

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

// Données pour les breadcrumbs
const breadcrumbItems = computed(() => [
  {
    label: 'Livres',
    to: '/livres'
  },
  {
    label: seasonData.value?.season.title || '',
    to: `/livres/${seasonData.value?.season.slug}`
  }
])

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

const seoTitle = composeSeoTitle(`${seasonData.value?.season.title}`)
const seoDescription = composeSeoDescription(`Découvrez les meilleurs GIFs de ${seasonData.value?.season.title} de la série Kaamelott.`)

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  ogImage: '/fondKBg.webp',
  keywords: 'kaamelott, gifs, alexandre astier, série française, moments cultes, collection',
  author: 'Kaamelott GIFs',
  robots: 'index, follow',
  ogUrl: `https://kaamelottgifs.fr/livres/${seasonData.value?.season.slug}`,
  ogType: 'website',
  twitterImage: '/fondKBg.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
})
</script>
