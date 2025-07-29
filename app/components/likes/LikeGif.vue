<template>
<NuxtLink
  :to="'/gifs/' + like.gifs.slug"
  class="flex flex-col h-full relative overflow-hidden"
  :v-posthog-capture="'click_favorite_gif_' + like.gifs.id"
  prefetch
>
  <div class="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
    <AppImage
      :src="like.gifs.url"
      :alt="like.gifs.quote"
      format="gif"
      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
  </div>
  
  <div class="flex-1 p-4 space-y-2">
    <p class="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
      {{ like.gifs.quote }}
    </p>
    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
      <Icon
        name="heroicons:clock"
        class="w-4 h-4 mr-1.5" />
      <time :datetime="like.createdAt">{{ formatDate(like.createdAt) }}</time>
    </div>
  </div>
</NuxtLink>
</template>

<script setup lang="ts">
import { formatDate } from '~~/shared/utils/date'
import type { LikeGif } from '~~/shared/types/Like'
import AppImage from '~/components/base/AppImage.vue'

defineProps<{
  like: LikeGif
}>()
</script>

<style scoped>
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}
</style>
