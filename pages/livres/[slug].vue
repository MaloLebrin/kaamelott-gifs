<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="seasonData" class="mb-8 backdrop-blur-lg rounded-lg p-4 bg-white/90">
      <h1 class="text-4xl font-bold mb-4">{{ seasonData.season.title }}</h1>
      <p class="text-gray-600 dark:text-gray-300 mb-2">{{ seasonData.season.airDate }}</p>
      <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        <span class="mr-4">{{ seasonData.season.episodesCount }} épisodes</span>
        <span>{{ seasonData.season.duration }}</span>
      </div>
      <p class="text-gray-700 dark:text-gray-300">{{ seasonData.season.resume }}</p>
    </div>

    <template v-if="seasonData && seasonData.gifs.length > 0">
      <GifGrid :gifs="seasonData.gifs" />
    </template>
    <div v-else class="text-center py-8 backdrop-blur-lg rounded-lg p-4 bg-white/90">
      <p class="text-gray-500 dark:text-gray-400">Aucun GIF disponible pour cette saison.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Gif } from '~/types'
import type { Season } from '~/types/Season'
import GifGrid from '~/components/gifs/GifGrid.vue'

const route = useRoute()
const slug = route.params.slug as string

const { data: seasonData } = await useFetch<{
  gifs: Gif[]
  season: Season
}>(`/api/seasons/${slug}`)

const { $clientPosthog } = useNuxtApp()

onMounted(() => {
  if ($clientPosthog) {
    $clientPosthog.capture('page_view', {
      page: 'livres',
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
  ogUrl: `https://kaamelottgifs.com/livres/${seasonData.value?.season.slug}`,
  ogType: 'website',
  twitterImage: '/fondKBg.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: `${seasonData.value?.season.title} - Kaamelott GIFs`,
  twitterDescription: `Découvrez les meilleurs GIFs de ${seasonData.value?.season.title} de la série Kaamelott. ${seasonData.value?.season.resume}`,
})

definePageMeta({
  layout: 'default'
})
</script>
