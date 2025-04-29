<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <CharacterListItem
      v-for="character in characters"
      :key="character.name"
      :character="character"
    />
  </div>
</template>

<script setup lang="ts">
import CharacterListItem from './CharacterListItem.vue'

interface Character {
  name: string
  avatar: string
  gifsCount?: number
}

withDefaults(defineProps<{
  characters: Character[]
}>(), {
  characters: () => []
})
</script> 
