<template>
<div
  class="flex flex-col gap-4 p-4"
  role="search">
  <div class="flex gap-2">
    <label
      for="search-input"
      aria-hidden="true"
      class="sr-only">Rechercher une réplique</label>
    <input
      id="search-input"
      v-model="searchQuery"
      type="search"
      placeholder="Rechercher une réplique..."
      class="flex-1 px-4 py-2 border rounded-lg focus:outline-none  bg-white/80 border-gray-800/50"
      aria-label="Rechercher une réplique"
      @input="handleSearch"
    >
    <button
      class="md:hidden px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none "
      :aria-expanded="isMobileMenuOpen"
      aria-controls="character-menu"
      aria-label="Sélectionner un personnage"
      @click="isMobileMenuOpen = !isMobileMenuOpen"
    >
      {{ selectedCharacter || 'Personnages' }}
    </button>
  </div>
    
  <!-- Desktop view -->
  <div
    class="hidden md:flex flex-wrap gap-2"
    role="group"
    aria-label="Filtrer par personnage">
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
    class="md:hidden fixed inset-0 bg-black/50 bg-opacity-50 z-50"
    role="dialog"
    aria-modal="true"
    aria-label="Menu de sélection des personnages"
    @click="isMobileMenuOpen = false"
  >
    <div
      id="character-menu"
      class="absolute bottom-0 left-0 right-0 bg-white p-4 rounded-t-lg max-h-[80vh] overflow-y-auto"
      role="dialog"
      aria-label="Liste des personnages"
      @click.stop
    >
      <div
        class="flex flex-wrap gap-2"
        role="group"
        aria-label="Filtrer par personnage">
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
watch(() => props.initialQuery, newQuery => {
  searchQuery.value = newQuery || ''
})

watch(() => props.initialCharacter, newCharacter => {
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

// Gérer la fermeture du menu mobile avec la touche Escape
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isMobileMenuOpen.value) {
      isMobileMenuOpen.value = false
    }
  }
  window.addEventListener('keydown', handleEscape)
  onUnmounted(() => {
    window.removeEventListener('keydown', handleEscape)
  })
})
</script>
