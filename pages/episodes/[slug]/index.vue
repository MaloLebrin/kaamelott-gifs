<template>
<div
  v-if="data"
  class="container mx-auto px-4 py-8 space-y-2">
  <Breadcrumbs :items="breadcrumbItems" />
  <div class="mb-8 backdrop-blur-lg rounded-lg p-4 bg-white/90 dark:bg-gray-800 dark:text-gray-50">
    <div class="flex justify-between">
      <div class="flex mb-4 space-x-2.5">
        <h1 class="text-2xl lg:text-4xl font-bold">{{ data.episode.title }}</h1>
        <LikeButton
          :entity-id="data.episode.code"
          :entity-type="Entities.EPISODE"
        />
      </div>
      <NuxtLink
        :to="`/livres/${slugify(livre as string)}`"
        class="text-gray-800 dark:text-gray-50 md:text-lg"
        prefetch
      >
        {{ livre }}
      </NuxtLink>
    </div>
    <p class="text-gray-800 dark:text-gray-50 mb-2">{{ data.episode.code }}</p>
    <p class="text-gray-700 dark:text-gray-200">{{ data.episode.resume }}</p>
      
    <div
      v-if="data.episode.characters"
      class="mt-4">
      <h2 class="text-2xl font-bold mb-2">Personnages</h2>
      <ul class="flex flex-wrap gap-x-2 gap-y-1.5">
        <li
          v-for="character in data.episode.characters"
          :key="character"
          class="my-0.5">
          <NuxtLink
            :to="`/personnages/${slugify(character)}`"
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

  <div
    v-else
    class="text-center py-8 backdrop-blur-lg rounded-lg p-4 bg-white/90">
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
import { composeEpisodeToStructuredData } from '~/shared/utils/episodes/structuredData'
import Breadcrumbs from '~/components/base/Breadcrumbs.vue'
import LikeButton from '~/components/base/LikeButton.vue'
import { Entities } from '~/types'

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

const breadcrumbItems = computed(() => [
  {
    label: 'Livres',
    to: '/livres'
  },
  {
    label: livre.value || '',
    to: `/livres/${slugify(livre.value as string)}`
  },
  {
    label: data.value?.episode.title || '',
    to: `/livres/${slugify(livre.value as string)}/episodes/${episodeSlug}`
  }
])
const { $clientPosthog } = useNuxtApp()

onMounted(() => {
  if ($clientPosthog) {
    $clientPosthog.capture('page_view', {
      page: 'episode',
      episode: data.value?.episode.title
    })
  }
})

const structuredData = computed(() => {
  if (data.value) {
    return buildEpisodeData(composeEpisodeToStructuredData({
      episode: data.value.episode,
      gifs: data.value.gifs
    }))
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

const seoTitle = composeSeoTitle(`${data.value?.episode.title}`)  
const seoDescription = composeSeoDescription(`Découvrez les meilleurs GIFs de l'épisode ${data.value?.episode.title} de la série Kaamelott. ${data.value?.episode.resume}`)

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  ogImage: '/fondKBg.webp',
  keywords: 'kaamelott, gifs, alexandre astier, série française, moments cultes, collection',
  author: 'Kaamelott GIFs',
  robots: 'index, follow',
  ogUrl: `https://kaamelottgifs.fr/livres/${seasonSlug}/episodes/${episodeSlug}`,
  ogType: 'website',
  twitterImage: '/fondKBg.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
})
</script>
