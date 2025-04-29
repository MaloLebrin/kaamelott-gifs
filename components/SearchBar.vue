<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex gap-2">
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Rechercher une réplique..."
        class="flex-1 px-4 py-2 border rounded-lg focus:outline-none bg-white/80 border-gray-800/50"
        @input="handleSearch"
      />
      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="md:hidden px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        {{ selectedCharacter || 'Personnages' }}
      </button>
    </div>
    
    <!-- Desktop view -->
    <div class="hidden md:flex flex-wrap gap-2">
      <CharacterButton
        v-for="character in characters"
        :key="character.name"
        :character="character"
        :is-selected="selectedCharacter === character.name"
        @select="handleCharacterSelect"
      />
    </div>

    <!-- Mobile view -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
      @click="isMobileMenuOpen = false"
    >
      <div
        class="absolute bottom-0 left-0 right-0 bg-white p-4 rounded-t-lg max-h-[80vh] overflow-y-auto"
        @click.stop
      >
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
const isMobileMenuOpen = ref(false)

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
  if (character === selectedCharacter.value) {
    selectedCharacter.value = ''
  }else {
    selectedCharacter.value = character
  }
  isMobileMenuOpen.value = false
  handleSearch()
}
</script>
