<template>
<NuxtLink
  :to="'/livres/' + props.like.seasons.slug"
  class="block"
  :v-posthog-capture="'click_favorite_season_' + props.like.seasons.id"
  prefetch
>
  <div class="p-6">
    <div class="flex justify-between items-start">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ props.like.seasons.title }}
        </h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">
          {{ props.like.seasons.airDate }}
        </p>
      </div>
      <span class="text-sm text-gray-500 dark:text-gray-400">
        {{ formatDate(props.like.createdAt) }}
      </span>
    </div>
    <p class="text-gray-700 dark:text-gray-300 mt-4 line-clamp-3">
      {{ props.like.seasons.resume }}
    </p>
    <div class="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
      <span class="mr-4">{{ props.like.seasons.episodesCount }} épisodes</span>
      <span>{{ props.like.seasons.duration }}</span>
    </div>
  </div>
</NuxtLink>
</template>

<script setup lang="ts">
import { formatDate } from '~~/shared/utils/date'
import type { LikeSeason } from '~~/shared/types/Like';

const props = defineProps<{
  like: LikeSeason
}>()
</script>
