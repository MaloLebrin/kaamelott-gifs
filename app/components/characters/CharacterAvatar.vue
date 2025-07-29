<template>
<img
  v-if="isLoading || error"
  src="/characters/unknown.jpg"
  :alt="`Avatar de ${character.name}`"
  :class="[commonClasses, {
    [selectedClasses]: isSelected,
    [hoverClasses]: !isSelected
  }]"
>
<img
  v-else
  :src="character.avatar"
  :alt="`Avatar de ${character.name}`"
  :class="[commonClasses, {
    [selectedClasses]: isSelected,
    [hoverClasses]: !isSelected
  }]"
>
</template>

<script setup lang="ts">
import { useImage } from '@vueuse/core'

interface Props {
  character: {
    avatar: string;
    name: string;
  };
  isSelected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isSelected: false
})

const commonClasses = 'w-7 h-7 rounded-full object-cover transition-transform duration-300'
const selectedClasses = 'ring-2 ring-white ring-offset-2 ring-offset-blue-500'
const hoverClasses = 'group-hover/btn:scale-110'

const { isLoading, error } = useImage({ src: props.character?.avatar })
</script>

