<template>
  <main class="flex-1">
    <div v-if="character && character.name" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- En-tête du personnage -->
      <div class="flex items-center gap-6 mb-8">
        <img
          :src="`/characters/${slugify(character.name)}.jpg`"
          :alt="character.name"
          class="w-24 h-24 rounded-full object-cover ring-4 ring-blue-500 ring-offset-4"
        />
        <div>
          <h1 class="text-4xl font-bold text-gray-900">{{ character.name }}</h1>
          <p class="text-lg text-gray-600 mt-2">{{ gifs?.length || 0 }} GIFs</p>
        </div>
      </div>

      <!-- Grille de GIFs -->
     <GifGrid v-if="gifs && gifs.length > 0" :gifs="gifs" />

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

const route = useRoute()
const characterName = route.params.name as string
const { $clientPosthog } = useNuxtApp()

// Récupérer les GIFs du personnage
const { data: gifs } = await useFetch<Gif[]>(`/api/gifs/characters/${characterName}`)
const { data: character } = await useFetch(`/api/characters/${characterName}`)

onMounted(() => {
  if ($clientPosthog) {
    $clientPosthog.capture('page_view', {
      page: 'characters',
      character: characterName
    })
  }
})

useSeoMeta({
  title: `${character.value?.name || characterName} - Kaamelott GIFs`,
  ogTitle: `${character.value?.name || characterName} - Kaamelott GIFs`,
  description: `Découvrez tous les GIFs de ${character.value?.name || characterName} dans Kaamelott. ${gifs.value?.length || 0} GIFs disponibles.`,
  ogDescription: `Découvrez tous les GIFs de ${character.value?.name || characterName} dans Kaamelott. ${gifs.value?.length || 0} GIFs disponibles.`,
  ogImage: '/fondKBg.webp',
  keywords: 'kaamelott, gifs, alexandre astier, série française, moments cultes, collection',
  author: 'Kaamelott GIFs',
  robots: 'index, follow',
  ogUrl: `https://kaamelottgifs.com/characters/${character.value?.name || characterName}`,
  ogType: 'website',
  twitterImage: '/fondKBg.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: `${character.value?.name || characterName} - Kaamelott GIFs`,
  twitterDescription: `Découvrez tous les GIFs de ${character.value?.name || characterName} dans Kaamelott. ${gifs.value?.length || 0} GIFs disponibles.`,
})

// Structured Data pour le SEO
useHead({
  title: `${characterName} - Kaamelott GIFs`,
  meta: [
    { name: 'description', content: `Tous les GIFs de ${characterName} dans Kaamelott` }
  ]
})
</script>
