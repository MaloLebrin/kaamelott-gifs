<template>
  <div class="container mx-auto px-4 py-8">
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
      <GifPagination
        :gifs="seasonData.gifs"
        :items-per-page="itemsPerPage"
        :current-page="currentPage"
        @page-change="handlePageChange"
      >
        <template #default="{ paginatedGifs }">
          <GifGrid :gifs="paginatedGifs" />
        </template>
      </GifPagination>
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
import GifPagination from '~/components/gifs/GifPagination.vue'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string

const { data: seasonData } = await useFetch<{
  gifs: Gif[]
  episodes: Episode[]
  season: Season
  otherSeasons: Season[]
}>(`/api/seasons/${slug}`)

const currentPage = ref(1)
const itemsPerPage = 21

console.log(seasonData.value?.episodes)

function handlePageChange(page: number) {
  currentPage.value = page
  router.push({
    query: {
      page: page.toString()
    }
  })
}

const { $clientPosthog } = useNuxtApp()

onMounted(() => {
  if ($clientPosthog) {
    $clientPosthog.capture('page_view', {
      page: 'livre',
      season: seasonData.value?.season.title
    })
  }
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
