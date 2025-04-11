<script setup lang="ts">
const searchQuery = ref('')
const selectedCharacter = ref('')

const props = defineProps<{
  characters: string[]
}>()

const emit = defineEmits<{
  (e: 'search', query: string, character: string): void
}>()

const handleSearch = () => {
  emit('search', searchQuery.value, selectedCharacter.value)
}
</script>

<template>
  <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col sm:flex-row gap-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher une citation..."
        class="flex-1 px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900 placeholder-gray-400 transition-colors duration-200"
        @input="handleSearch"
      />
      <select
        v-model="selectedCharacter"
        class="px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-900 transition-colors duration-200"
        @change="handleSearch"
      >
        <option value="" class="bg-white/90">Tous les personnages</option>
        <option
          v-for="character in characters"
          :key="character"
          :value="character"
          class="bg-white/90"
        >
          {{ character }}
        </option>
      </select>
    </div>
  </div>
</template> 
