<template>
<div class="relative group">
  <button
    class="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 relative group/btn focus:outline-none "
    :class="{
      'bg-gradient-to-r from-blue-300 to-blue-900 text-white shadow-lg shadow-blue-500/25 scale-105': isSelected,
      'bg-white hover:bg-gray-50 text-gray-700 hover:shadow-md border border-gray-200': !isSelected
    }"
    :aria-pressed="isSelected"
    :aria-label="`Filtrer par ${character.name}`"
    @click="handleCharacterSelect"
  >
    <div class="relative">
      <CharacterAvatar
        :character="character"
        :is-selected="isSelected"
      />
    </div>
    <span class="font-medium">{{ character.name }}</span>
  </button>

  <!-- Menu contextuel -->
  <div 
    class="absolute left-0 mt-2 w-48 rounded-lg bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10"
    role="menu"
    aria-label="Options du personnage"
  >
    <NuxtLink
      :to="`/personnages/${slugify(character.name)}`"
      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg focus:outline-none "
      :v-posthog-capture="`click_personnage_${character.name}`"
      prefetch
      role="menuitem"
      :aria-label="`Voir tous les GIFs de ${character.name}`"
    >
      Voir tous les GIFs
    </NuxtLink>
  </div>
</div>
</template>

<script setup lang="ts">
import CharacterAvatar from './CharacterAvatar.vue'
import { slugify } from '~/shared/utils/string'

interface Character {
  name: string
  avatar: string
}

const props = defineProps<{
  character: Character,
  isSelected: boolean
}>()

const emit = defineEmits<{
  (e: 'select', character: string): void
}>()

const handleCharacterSelect = () => {
  emit('select', props.character.name)
}
</script>
