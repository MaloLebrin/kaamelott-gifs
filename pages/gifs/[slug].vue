<template>
  <div
    v-if="gif"
    class="container mx-auto px-4 pt-2"
  >
    <h1 class="sr-only">{{ gif.quote }}</h1>
    <div class=" rounded-lg bg-white">
      <img :src="gif.url" :alt="gif.quote" class="w-full h-full object-cover rounded-lg" />
      <div class="p-4">
        <ShareButtons :gif-url="gif.url" :quote="gif.quote" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShareButtons from '~/components/gifs/ShareButtons.vue'
import type { Gif } from '~/types'

const route = useRoute()
const slug = route.params.slug as string

const { data: gif } = await useFetch<Gif>(`/api/gifs/${slug}`)
</script>
