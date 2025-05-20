<template>
<NuxtLink
  :to="'/gifs/' + like.gifs.slug"
  class="block"
  :v-posthog-capture="'click_favorite_gif_' + like.gifs.id"
  prefetch
>
  <AppImage
    :src="like.gifs.url"
    :alt="like.gifs.quote"
    format="gif"
    class="w-full aspect-video object-cover"
  />
  <div class="p-4">
    <p class="text-lg font-medium text-gray-900 dark:text-white line-clamp-2">
      {{ like.gifs.quote }}
    </p>
    <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
      {{ formatDate(like.createdAt) }}
    </p>
  </div>
</NuxtLink>
</template>

<script setup lang="ts">
import { formatDate } from '~/shared/utils/date'
import type { LikeGif } from '~/types/Like'
import AppImage from '~/components/base/AppImage.vue'

defineProps<{
  like: LikeGif
}>()
</script>
