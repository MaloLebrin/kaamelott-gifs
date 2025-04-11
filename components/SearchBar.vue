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
      <button
        v-for="character in characters"
        :key="character.name"
        @click="handleCharacterSelect(character.name)"
        class="flex items-center gap-2 px-3 py-1 rounded-full transition-colors border border-gray-600/20"
        :class="{
          'bg-blue-500 text-white': selectedCharacter === character.name,
          'bg-gray-200 hover:bg-gray-300': selectedCharacter !== character.name
        }"
      >
        <img
          :src="character.avatar || '/characters/unknown.jpg'"
          :alt="`Avatar de ${character.name}`"
          class="w-6 h-6 rounded-full object-cover"
        />
        <span>{{ character.name }}</span>
      </button>
    </div>
  </div>
</template> 

<script setup lang="ts">

interface Character {
  name: string
  avatar: string
}

const props = defineProps<{
  characters: Character[]
}>()

console.log(props.characters, 'characters')

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
