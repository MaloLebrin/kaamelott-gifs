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
    <Breadcrumbs :items="breadcrumbItems" />
  </div>
</template>

<script setup lang="ts">
import ShareButtons from '~/components/gifs/ShareButtons.vue'
import Breadcrumbs from '~/components/base/Breadcrumbs.vue'
import type { Gif } from '~/types'

const route = useRoute()
const slug = route.params.slug as string
const { $clientPosthog } = useNuxtApp()

const { data: gif } = await useFetch<Gif>(`/api/gifs/${slug}`)

const breadcrumbItems = computed(() => [
  {
    label: 'Gifs',
    to: '/gifs'
  },
  {
    label: gif.value?.quote || '',
    to: `/gifs/${gif.value?.slug}`
  }
])

onMounted(() => {
  if ($clientPosthog) {
    $clientPosthog.capture('page_view', {
      page: 'gif',
      gif: gif.value?.slug
    })
  }
})

useSeoMeta({
  title: `${gif.value?.quote}`,
  ogTitle: `${gif.value?.quote}`,
  description: `${gif.value?.quote}`,
  ogDescription: `${gif.value?.quote}`,
  ogImage: '/fondKBg.webp',
  keywords: 'kaamelott, gifs, alexandre astier, série française, moments cultes, collection',
  author: 'Kaamelott GIFs',
  robots: 'index, follow',
  ogUrl: `https://kaamelottgifs.fr/gifs/${gif.value?.slug}`,
  ogType: 'website',
  twitterImage: '/fondKBg.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: `${gif.value?.quote} - Kaamelott GIFs`,
  twitterDescription: `${gif.value?.quote}`,
})
</script>
