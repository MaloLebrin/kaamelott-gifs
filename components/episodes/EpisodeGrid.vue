<template>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <EpisodeListItem
    v-for="episode in episodes"
    :key="episode.code"
    :episode="episode"
    :type="type"
  />
</div>
</template>

<script setup lang="ts">
import EpisodeListItem from '~/components/episodes/EpisodeListItem.vue'
import type { Episode } from '~/types/Episode';

withDefaults(defineProps<{
  episodes: Episode[]
  type?: 'episode' | 'movie'
}>(), {
  episodes: () =>[],
  type: 'episode'
})
</script>
