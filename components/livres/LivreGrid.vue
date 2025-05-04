<template>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <LivreListItem
    v-for="season in seasons"
    :key="season.id"
    :season="season" />
</div>
</template>

<script setup lang="ts">
import LivreListItem from '~/components/livres/LivreListItem.vue'
import type { Season } from '~/types/Season'

withDefaults(defineProps<{
  seasons: Season[]
}>(), {
  seasons: () =>[]
})
</script>
