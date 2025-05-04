<template>
<NuxtLink
  :to="`/episodes/${episode.slug}`"
  class="group"
  :v-posthog-capture="`click_episode_link_${episode.code}`"
  prefetch
>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
    <img
      v-if="episode.imgUrl"
      :src="episode.imgUrl"
      :alt="episode.title"
      class="w-full h-48 object-cover"
    >
    <div class="p-6 space-y-2">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors">
        {{ episode.title }}
      </h2>
      <span class="text-gray-500 dark:text-gray-400 text-xs">
        {{ episode.code }}
      </span>
      <p class="text-gray-700 dark:text-gray-300 line-clamp-3">
        {{ episode.resume }}
      </p>

      <ul class="flex flex-wrap gap-x-2 gap-y-1.5 mt-4">
        <li
          v-for="character in episode.characters"
          :key="character"
          class="my-0.5">
          <BaseTag :label="character" />
        </li>
      </ul>
    </div>
  </div>
</NuxtLink>
</template>

<script setup lang="ts">
import type { Episode } from '~/types/Episode';

withDefaults(defineProps<{
  episode: Episode
  type: 'episode' | 'movie'
}>(), {
  type: 'episode'
})
</script>
