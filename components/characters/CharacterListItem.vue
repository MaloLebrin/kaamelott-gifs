<template>
  <NuxtLink
    :to="`/characters/${slugify(character.name)}`"
    class="group"
    :v-posthog-capture="`click_character_link_${character.name}`"
    prefetch
  >
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div class="p-6 flex items-center gap-4">
        <img
          :src="character.avatar || '/characters/character-placeholder.webp'"
          :alt="`Avatar de ${character.name}`"
          class="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500 ring-offset-2"
        />
        <div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors">
            {{ character.name }}
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            {{ character.nbGifs || 0 }} GIFs
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { slugify } from '~/shared/utils/string'

interface Character {
  name: string
  avatar: string
  nbGifs?: number
}

defineProps<{
  character: Character
}>()
</script> 
