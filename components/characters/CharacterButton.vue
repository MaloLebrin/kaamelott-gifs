<template>
<button
  @click="handleCharacterSelect"
  class="flex items-center gap-2 px-3 py-1 rounded-full transition-colors border border-gray-600/20"
  :class="{
    'bg-blue-500 text-white': isSelected,
    'bg-gray-200 hover:bg-gray-300': !isSelected
  }"
>
  <img
    :src="character.avatar || '/characters/unknown.jpg'"
    :alt="`Avatar de ${character.name}`"
    class="w-6 h-6 rounded-full object-cover"
  />
  <span>{{ character.name }}</span>
</button>
</template>

<script setup lang="ts">
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
