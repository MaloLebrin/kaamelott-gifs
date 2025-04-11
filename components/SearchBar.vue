<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex gap-2">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher une réplique..."
        class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        @input="handleSearch"
      />
    </div>
    
    <div class="flex flex-wrap gap-2">
      <button
        v-for="character in characters"
        :key="character.name"
        @click="handleCharacterSelect(character.name)"
        class="flex items-center gap-2 px-3 py-1 rounded-full transition-colors"
        :class="{
          'bg-blue-500 text-white': selectedCharacter === character.name,
          'bg-gray-200 hover:bg-gray-300': selectedCharacter !== character.name
        }"
      >
        <img
          :src="`/characters/${slugify(character.name)}.jpg`"
          :alt="`Avatar de ${character.name}`"
          class="w-6 h-6 rounded-full object-cover"
        />
        <span>{{ character.name }}</span>
      </button>
    </div>
  </div>
</template> 

<script setup lang="ts">
import { slugify } from '~/utils/strings'

interface Character {
  name: string
  avatar: string
}

defineProps<{
  characters: Character[]
}>()

const emit = defineEmits<{
  (e: 'search', query: string, character: string): void
}>()

const searchQuery = ref('')
const selectedCharacter = ref('')

const handleSearch = () => {
  emit('search', searchQuery.value, selectedCharacter.value)
}

const handleCharacterSelect = (character: string) => {
  selectedCharacter.value = character
  handleSearch()
}
</script>
