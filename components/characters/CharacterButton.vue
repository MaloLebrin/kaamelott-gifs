<template>
<button
  @click="handleCharacterSelect"
  class="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 relative group/btn"
  :class="{
    'bg-gradient-to-r from-blue-300 to-blue-900 text-white shadow-lg shadow-blue-500/25 scale-105': isSelected,
    'bg-white hover:bg-gray-50 text-gray-700 hover:shadow-md border border-gray-200': !isSelected
  }"
>
  <div class="relative">
    <img
      :src="character.avatar || '/characters/unknown.jpg'"
      :alt="`Avatar de ${character.name}`"
      class="w-7 h-7 rounded-full object-cover transition-transform duration-300"
      :class="{
        'ring-2 ring-white ring-offset-2 ring-offset-blue-500': isSelected,
        'group-hover/btn:scale-110': !isSelected
      }"
    />
  </div>
  <span class="font-medium">{{ character.name }}</span>
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
