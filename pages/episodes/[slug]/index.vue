<template>
  <div v-if="data" class="container mx-auto px-4 py-8">
    <div class="mb-8 backdrop-blur-lg rounded-lg p-4 bg-white/90">
      <div class="flex justify-between">
        <h1 class="text-4xl font-bold mb-4">{{ data.episode.title }}</h1>
        <NuxtLink
          :to="`/livres/${slugify(livre as string)}`"
          class="text-gray-800 md:text-lg"
          prefetch
        >
          {{ livre }}
        </NuxtLink>
      </div>
      <p class="text-gray-600 mb-2">{{ data.episode.code }}</p>
      <p class="text-gray-700">{{ data.episode.resume }}</p>
      
      <div v-if="data.episode.characters" class="mt-4">
        <h2 class="text-2xl font-bold mb-2">Personnages</h2>
        <ul class="flex flex-wrap gap-x-2 gap-y-1.5">
          <li v-for="character in data.episode.characters" :key="character">
            <NuxtLink
              :to="`/characters/${slugify(character)}`"
              prefetch
            >
              <BaseTag :label="character.trim()" />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <template v-if="data.gifs && data.gifs.length > 0">
      <GifPagination
        :gifs="data.gifs"
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
      <p class="text-gray-500">Aucun GIF disponible pour cet épisode.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Gif } from '~/types'
import type { Episode } from '~/types/Episode'
import GifGrid from '~/components/gifs/GifGrid.vue'
import GifPagination from '~/components/gifs/GifPagination.vue'
import { slugify } from '~/shared/utils/string'
import { getLivreFromCode } from '~/shared/utils/episodes/code'
import { getTomeFromCode } from '~/shared/utils/livres/tome'

const route = useRoute()
const router = useRouter()
const episodeSlug = route.params.slug as string
const seasonSlug = route.params.slug as string

const { data } = await useFetch<{
  gifs: Gif[]
  episode: Episode
}>(`/api/episodes/${episodeSlug}`)

const currentPage = ref(1)
const itemsPerPage = 21

const livre = computed(() => data.value?.episode.code ? getTomeFromCode(Number(getLivreFromCode(data.value?.episode.code))) : null)

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
      page: 'episode',
      episode: data.value?.episode.title
    })
  }
})

useSeoMeta({
  title: `${data.value?.episode.title} - Kaamelott GIFs`,
  ogTitle: `${data.value?.episode.title} - Kaamelott GIFs`,
  description: `Découvrez les meilleurs GIFs de l'épisode ${data.value?.episode.title} de la série Kaamelott. ${data.value?.episode.resume}`,
  ogDescription: `Découvrez les meilleurs GIFs de l'épisode ${data.value?.episode.title} de la série Kaamelott. ${data.value?.episode.resume}`,
  ogImage: '/fondKBg.webp',
  keywords: 'kaamelott, gifs, alexandre astier, série française, moments cultes, collection',
  author: 'Kaamelott GIFs',
  robots: 'index, follow',
  ogUrl: `https://kaamelottgifs.fr/livres/${seasonSlug}/episodes/${episodeSlug}`,
  ogType: 'website',
  twitterImage: '/fondKBg.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: `${data.value?.episode.title} - Kaamelott GIFs`,
  twitterDescription: `Découvrez les meilleurs GIFs de l'épisode ${data.value?.episode.title} de la série Kaamelott. ${data.value?.episode.resume}`,
})
</script>
