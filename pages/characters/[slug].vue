<template>
  <main class="flex-1">
    <div v-if="data && data.character.name" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- En-tête du personnage -->
      <div class="flex items-center gap-6 mb-8">
        <img
          :src="`/characters/${slugify(data?.character.name)}.jpg`"
          :alt="data?.character.name"
          class="w-24 h-24 rounded-full object-cover ring-4 ring-blue-500 ring-offset-4"
        />
        <div>
          <h1 class="text-4xl font-bold text-gray-900">{{ data?.character.name }}</h1>
          <p class="text-lg text-gray-600 mt-2">{{ data?.gifs.length || 0 }} GIFs</p>
        </div>
      </div>

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
      <div v-else class="text-center py-12">
        <p class="text-xl text-gray-600">Aucun GIF trouvé pour ce personnage.</p>
      </div>
    </div>
  </main>
</template> 

<script setup lang="ts">
import type { Gif } from '~/types'
import { slugify } from '~/shared/utils/string'
import GifGrid from '~/components/gifs/GifGrid.vue'
import GifPagination from '~/components/gifs/GifPagination.vue'

const route = useRoute()
const characterSlug = route.params.slug as string
const { $clientPosthog } = useNuxtApp()

// Récupérer les GIFs du personnage
const { data } = await useFetch<{
  gifs: Gif[],
  character: {
    name: string,
    slug: string
  }
}>(`/api/gifs/characters/${characterSlug}`)

onMounted(() => {
  if ($clientPosthog) {
    $clientPosthog.capture('page_view', {
      page: 'characters',
      character:  data.value?.character.name
    })
  }
})

useSeoMeta({
    title: `${data.value?.character.name || characterSlug} - Kaamelott GIFs`,
  ogTitle: `${data.value?.character.name || characterSlug} - Kaamelott GIFs`,
  description: `Découvrez tous les GIFs de ${data.value?.character.name || characterSlug} dans Kaamelott. ${data.value?.gifs.length || 0} GIFs disponibles.`,
  ogDescription: `Découvrez tous les GIFs de ${data.value?.character.name || characterSlug} dans Kaamelott. ${data.value?.gifs.length || 0} GIFs disponibles.`,
  ogImage: '/fondKBg.webp',
  keywords: 'kaamelott, gifs, alexandre astier, série française, moments cultes, collection',
  author: 'Kaamelott GIFs',
  robots: 'index, follow',
  ogUrl: `https://kaamelottgifs.com/characters/${data.value?.character.slug || characterSlug}`,
  ogType: 'website',
  twitterImage: '/fondKBg.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: `${data.value?.character.name || characterSlug} - Kaamelott GIFs`,
  twitterDescription: `Découvrez tous les GIFs de ${data.value?.character.name || characterSlug} dans Kaamelott. ${data.value?.gifs.length || 0} GIFs disponibles.`,
})

useHead({
  title: `${data.value?.character.name} - Kaamelott GIFs`,
  meta: [
    { name: 'description', content: `Tous les GIFs de ${data.value?.character.name} dans Kaamelott` }
  ]
})
</script>
