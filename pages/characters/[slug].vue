<template>
<div class="flex-1">
  <div
    v-if="data && data.character.name"
    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
    <Breadcrumbs :items="breadcrumbItems" />
    <!-- En-tête du personnage -->
    <div class="flex items-center gap-6 mb-8 mt-2">
      <img
        :src="imageError ? '/characters/character-placeholder.webp' : `/characters/${slugify(data?.character.name)}.jpg`"
        :alt="data?.character.name"
        class="w-24 h-24 rounded-full object-cover ring-4 ring-blue-500 ring-offset-4"
        @error="imageError = true"
      >
      <div>
        <h1 class="text-4xl font-bold text-gray-900">{{ data?.character.name }}</h1>
        <p class="text-lg text-gray-600 mt-2">{{ data?.gifs.length || 0 }} GIFs</p>
      </div>
    </div>

    <section
      v-if="episodes && episodes.length > 0"
      class="space-y-4 md:hidden">
      <h2 class="text-2xl font-bold text-gray-900">Épisodes ({{ episodes.length }})</h2>

      <BaseSlider :items="episodes">
        <template #default="{ item }">
          <NuxtLink
            :to="`/episodes/${item.slug}`"
            prefetch
          >
            <BaseTag :label="`${item.code} - ${item.title}`" />
          </NuxtLink>
        </template>
      </BaseSlider>
    </section>

    <!-- Grille de GIFs -->
    <GifPagination 
      v-if="data?.gifs && data.gifs.length > 0"
      :gifs="data.gifs"
    >
      <template #default="{ paginatedGifs }">
        <GifGrid :gifs="paginatedGifs" />
      </template>
    </GifPagination>

    <!-- Message si aucun GIF -->
    <div
      v-else
      class="text-center py-12">
      <p class="text-xl text-gray-600">Aucun GIF trouvé pour ce personnage.</p>
    </div>

    <!-- Informations du personnage -->
    <div
      v-if="data?.character.description || data?.character.history"
      class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <div
        v-if="data?.character.actor"
        class="mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Acteur</h2>
        <p class="text-gray-600 dark:text-gray-300">{{ data.character.actor }}</p>
      </div>

      <div
        v-if="data?.character.description"
        class="mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Description</h2>
        <p class="text-gray-600 dark:text-gray-300 whitespace-pre-line">{{ data.character.description }}</p>
      </div>

      <div
        v-if="data?.character.history"
        class="mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Histoire</h2>
        <p class="text-gray-600 dark:text-gray-300 whitespace-pre-line">{{ data.character.history }}</p>
      </div>
    </div>
  </div>

  <section
    v-if="episodes && episodes.length > 0"
    class="space-y-4 md:block hidden">
    <h2 class="text-2xl font-bold text-gray-900">Épisodes ({{ episodes.length }})</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="episode in episodes"
        :key="episode.slug"
        :to="`/episodes/${episode.slug}`"
        class="group"
        prefetch
      >
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
          <div class="p-4">
            <div class="flex items-end space-x-2">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors">
                {{ episode.code }}
              </h3>
              <span class="text-gray-500 dark:text-gray-400 text-xs pb-1">
                {{ getTomeFromCode(Number(getLivreFromCode(episode.code))) }}
              </span>
            </div>
            <p class="text-gray-700 dark:text-gray-300 line-clamp-2 mt-1">
              {{ episode.title }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</div>
</template> 

<script setup lang="ts">
import type { Character, Gif } from '~/types'
import { slugify } from '~/shared/utils/string'
import GifGrid from '~/components/gifs/GifGrid.vue'
import GifPagination from '~/components/gifs/GifPagination.vue'
import type { Episode } from '~/types/Episode'
import BaseSlider from '~/components/base/BaseSlider.vue'
import { getLivreFromCode } from '~/shared/utils/episodes/code'
import { getTomeFromCode } from '~/shared/utils/livres/tome'
import Breadcrumbs from '~/components/base/Breadcrumbs.vue'

const route = useRoute()
const characterSlug = route.params.slug as string
const { $clientPosthog } = useNuxtApp()
const imageError = ref(false)

// Récupérer les GIFs du personnage
const { data } = await useFetch<{
  gifs: Gif[],
  character: Character
}>(`/api/gifs/characters/${characterSlug}`)

console.log(data.value)

const { data: episodes } = await useFetch<Pick<Episode, 'code' | 'title' | 'slug' | 'createdAt'>[]>(`/api/characters/${characterSlug}/episodes`)

const breadcrumbItems = computed(() => [
  {
    label: 'Personnages',
    to: '/characters'
  },
  {
    label: data.value?.character.name || '',
    to: `/characters/${data.value?.character.slug}`
  }
])

onMounted(() => {
  if ($clientPosthog) {
    $clientPosthog.capture('page_view', {
      page: 'characters',
      character:  data.value?.character.name
    })
  }
})

const structuredData = computed(() => {
  if (data.value) {
    return buildStructuredData('character', composeCharacterToStructuredData({
      character: data.value.character,
      episodes: episodes.value as Episode[],
      seasons: []
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

const seoTitle = composeSeoTitle(`${data.value?.character?.name || characterSlug}`)
const seoDescription = composeSeoDescription(`Découvrez tous les GIFs de ${data.value?.character.name || characterSlug} dans Kaamelott. ${data.value?.gifs.length || 0} GIFs disponibles.`)

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  ogImage: '/fondKBg.webp',
  keywords: composeKeywordsForCharacter(data.value?.character),
  author: 'Kaamelott GIFs',
  robots: 'index, follow',
  ogUrl: `https://kaamelottgifs.fr/characters/${data.value?.character.slug || characterSlug}`,
  ogType: 'website',
  twitterImage: '/fondKBg.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
})
</script>
