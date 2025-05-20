<template>
<NuxtLink
  :to="'/characters/' + like.characters.slug"
  class="block p-6"
  :v-posthog-capture="'click_favorite_character_' + like.characters.id"
  prefetch
>
  <div class="flex items-center gap-4">
    <img
      :src="like.characters.imgUrl || '/characters/character-placeholder.webp'"
      :alt="'Avatar de ' + like.characters.name"
      class="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500 ring-offset-2"
    >
    <div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ like.characters.name }}
      </h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
        {{ formatDate(like.createdAt) }}
      </p>
    </div>
  </div>
</NuxtLink>
</template>

<script setup lang="ts">
import { formatDate } from '~/shared/utils/date'
import type { LikeCharacter } from '~/types/Like'

defineProps<{
  like: LikeCharacter
}>()
</script>
