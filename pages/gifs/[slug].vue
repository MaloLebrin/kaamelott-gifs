<template>
<div
  v-if="gif"
  class="container mx-auto px-4 pt-2 space-y-4"
>
  <h1 class="sr-only">{{ gif.quote }}</h1>
  <Breadcrumbs :items="breadcrumbItems" />
  <div class=" rounded-lg bg-white">
    <img
      :src="gif.url"
      :alt="gif.quote"
      class="w-full h-full object-cover rounded-lg" >
    <div class="p-4">
      <LikeButton
        :entity-id="gif.id"
        :entity-type="Entities.GIF"
        size="lg"
      />
      <ShareButtons
        :gif-url="gif.url"
        :quote="gif.quote" />
    </div>
  </div>
  <!-- Section des commentaires -->
  <div class="mt-8 bg-white rounded-lg shadow-sm p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Commentaires</h2>
    <CommentList
      :entity-type="Entities.GIF"
      :entity-id="gif.id"
    />
  </div>
</div>
</template>

<script setup lang="ts">
import ShareButtons from '~/components/gifs/ShareButtons.vue'
import Breadcrumbs from '~/components/base/Breadcrumbs.vue'
import LikeButton from '~/components/base/LikeButton.vue'
import CommentList from '~/components/comments/CommentList.vue'
import type { Gif } from '~/types'
import { Entities } from '~/types/Entities'

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

const seoTitle = composeSeoTitle(`${gif.value?.quote}`)
const seoDescription = composeSeoDescription(`${gif.value?.quote}`)

useSeoMeta({
  title: seoTitle,
  ogTitle: seoTitle,
  description: seoDescription,
  ogDescription: seoDescription,
  ogImage: '/fondKBg.webp',
  keywords: `${gif.value?.quote}, kaamelott, gifs, alexandre astier, série française, moments cultes, collection`,
  author: 'Kaamelott GIFs',
  robots: 'index, follow',
  ogUrl: `https://kaamelottgifs.fr/gifs/${gif.value?.slug}`,
  ogType: 'website',
  twitterImage: '/fondKBg.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
})
</script>
