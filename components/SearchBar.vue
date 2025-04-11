<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex gap-2">
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Rechercher une réplique..."
        class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        @input="handleSearch"
      />
    </div>
    
    <div class="flex flex-wrap gap-2">
      <CharacterButton
        v-for="character in characters"
        :key="character.name"
        :character="character"
        :is-selected="selectedCharacter === character.name"
        @select="handleCharacterSelect"
      />
    </div>
  </div>
</template> 

<script setup lang="ts">
import CharacterButton from './characters/CharacterButton.vue'

interface Character {
  name: string
  avatar: string
}

const props = defineProps<{
  characters: Character[]
  initialQuery?: string
  initialCharacter?: string
}>()

const emit = defineEmits<{
  (e: 'search', query: string, character: string): void
}>()

const searchQuery = ref(props.initialQuery || '')
const selectedCharacter = ref(props.initialCharacter || '')

// Mettre à jour les valeurs locales quand les props changent
watch(() => props.initialQuery, (newQuery) => {
  searchQuery.value = newQuery || ''
})

watch(() => props.initialCharacter, (newCharacter) => {
  selectedCharacter.value = newCharacter || ''
})

const handleSearch = () => {
  emit('search', searchQuery.value, selectedCharacter.value)
}

const handleCharacterSelect = (character: string) => {
  selectedCharacter.value = character
  handleSearch()
}
</script>
