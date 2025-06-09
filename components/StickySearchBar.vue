<template>
<div
  ref="searchBarContainer"
  class="relative"
>
  <!-- Barre de recherche originale -->
  <div
    ref="originalSearchBar"
    class="w-full"
  >
    <slot />
  </div>

  <!-- Barre de recherche fixe -->
  <div
    v-show="isSticky"
    class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg transition-all duration-300"
    :class="{ 'opacity-0': !isVisible, 'opacity-100': isVisible }"
  >
    <div class="container mx-auto px-4 py-2">
      <!-- Version mobile de la barre de recherche -->
      <div class="flex flex-col gap-2">
        <div class="flex gap-2">
          <label
            for="sticky-search-input"
            aria-hidden="true"
            class="sr-only">Rechercher une réplique</label>
          <input
            id="sticky-search-input"
            v-model="searchQuery"
            type="search"
            placeholder="Rechercher une réplique..."
            class="flex-1 px-4 py-2 border rounded-lg focus:outline-none bg-white/80 border-gray-800/50"
            aria-label="Rechercher une réplique"
            @input="handleSearch"
          >
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none"
            :aria-expanded="isMobileMenuOpen"
            aria-controls="sticky-character-menu"
            aria-label="Sélectionner un personnage"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            {{ selectedCharacter || 'Personnages' }}
          </button>
        </div>

        <!-- Menu mobile des personnages -->
        <div
          v-if="isMobileMenuOpen"
          class="fixed inset-0 bg-black/50 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de sélection des personnages"
          @click="isMobileMenuOpen = false"
        >
          <div
            id="sticky-character-menu"
            class="absolute bottom-0 left-0 right-0 bg-white p-4 rounded-t-lg max-h-[80vh] overflow-y-auto"
            role="dialog"
            aria-label="Liste des personnages"
            @click.stop
          >
            <div
              class="flex flex-wrap gap-2"
              role="group"
              aria-label="Filtrer par personnage"
            >
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
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import CharacterButton from './characters/CharacterButton.vue'
import { useDebounce } from '@vueuse/core'

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

const searchBarContainer = ref<HTMLElement | null>(null)
const originalSearchBar = ref<HTMLElement | null>(null)
const isSticky = ref(false)
const isVisible = ref(false)
const isMobileMenuOpen = ref(false)
const searchQuery = ref(props.initialQuery || '')
const selectedCharacter = ref(props.initialCharacter || '')

// Observer le scroll pour détecter quand la barre de recherche originale sort du viewport
onMounted(() => {
  if (!searchBarContainer.value || !originalSearchBar.value) return

  const observer = new IntersectionObserver(
    entries => {
      const [entry] = entries
      isSticky.value = !entry.isIntersecting
      
      // Ajouter un délai pour la transition
      if (isSticky.value) {
        setTimeout(() => {
          isVisible.value = true
        }, 100)
      } else {
        isVisible.value = false
      }
    },
    {
      threshold: 0,
      rootMargin: '-1px 0px 0px 0px'
    }
  )

  observer.observe(originalSearchBar.value)

  onUnmounted(() => {
    observer.disconnect()
  })
})

// Gérer la recherche
const handleSearch = () => {
  emit('search', searchQuery.value, selectedCharacter.value)
}

// Gérer la sélection d'un personnage
const handleCharacterSelect = (character: string) => {
  if (character === selectedCharacter.value) {
    selectedCharacter.value = ''
  } else {
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

// Mettre à jour les valeurs locales quand les props changent
watch(() => props.initialQuery, newQuery => {
  searchQuery.value = newQuery || ''
})

watch(() => props.initialCharacter, newCharacter => {
  selectedCharacter.value = newCharacter || ''
})
</script>

<style scoped>
.fixed {
  transform: translateY(0);
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.opacity-0 {
  transform: translateY(-100%);
}

.opacity-100 {
  transform: translateY(0);
}
</style> 
