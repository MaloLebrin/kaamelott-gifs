<template>
<NuxtLink
  :to="`/livres/${season.slug}`"
  class="group"
  :v-posthog-capture="`click_livre_link_${season.slug}`"
  prefetch
>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors">
        {{ season.title }}
      </h2>
      <p class="text-gray-600 dark:text-gray-300 mb-4">
        {{ season.airDate }}
      </p>
      <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        <span class="mr-4">{{ season.episodesCount }} épisodes</span>
        <span>{{ season.duration }}</span>
      </div>
      <p class="text-gray-700 dark:text-gray-300 line-clamp-3">
        {{ season.resume }}
      </p>
    </div>
  </div>
</NuxtLink>
</template>

<script setup lang="ts">
import type { Season } from '~/types/Season'

defineProps<{
  season: Season
}>()
</script>
