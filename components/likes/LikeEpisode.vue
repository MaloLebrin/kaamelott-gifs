<template>
<NuxtLink
  :to="'/episodes/' + like.episodes.slug"
  class="block"
  :v-posthog-capture="'click_favorite_episode_' + like.episodes.code"
  prefetch
>
  <div class="p-6">
    <div class="flex justify-between items-start">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ like.episodes.title }}
        </h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">
          {{ like.episodes.code }}
        </p>
      </div>
      <span class="text-sm text-gray-500 dark:text-gray-400">
        {{ formatDate(like.createdAt) }}
      </span>
    </div>
    <p class="text-gray-700 dark:text-gray-300 mt-4 line-clamp-2">
      {{ like.episodes.resume }}
    </p>
  </div>
</NuxtLink>
</template>

<script setup lang="ts">
import { formatDate } from '~/shared/utils/date'
import type { LikeEpisode } from '~/types/Like'

defineProps<{
  like: LikeEpisode
}>()
</script>
