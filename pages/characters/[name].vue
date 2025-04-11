<script setup lang="ts">
import type { Gif } from '~/types'
import { slugify } from '~/utils/strings'
import GifCard from '~/components/gifs/GifCard.vue'

const route = useRoute()
const characterName = route.params.name as string

// Récupérer les GIFs du personnage
const { data: gifs } = await useFetch<Gif[]>('/api/gifs', {
  params: {
    character: characterName
  }
})

// Récupérer les informations du personnage
const { data: character } = await useFetch(`/api/characters/${characterName}`)

// SEO
useSeoMeta({
  title: character.value?.name || characterName,
  ogTitle: `${character.value?.name || characterName} - Kaamelott GIFs`,
  description: `Découvrez tous les GIFs de ${character.value?.name || characterName} dans Kaamelott. ${gifs.value?.length || 0} GIFs disponibles.`,
  ogDescription: `Découvrez tous les GIFs de ${character.value?.name || characterName} dans Kaamelott. ${gifs.value?.length || 0} GIFs disponibles.`,
  ogImage: character.value?.avatar || '/og-image.jpg',
  twitterCard: 'summary_large_image',
})

// Structured Data pour le SEO
useHead({
  title: `${characterName} - Kaamelott GIFs`,
  meta: [
    { name: 'description', content: `Tous les GIFs de ${characterName} dans Kaamelott` }
  ]
})
</script>

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
      <div v-if="gifs && gifs.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <GifCard
          v-for="gif in gifs"
          :key="gif.slug"
          :gif="gif"
        />
      </div>

      <!-- Message si aucun GIF -->
      <div v-else class="text-center py-12">
        <p class="text-xl text-gray-600">Aucun GIF trouvé pour ce personnage.</p>
      </div>
    </div>
  </main>
</template> 
