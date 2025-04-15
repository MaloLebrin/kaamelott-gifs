<template>
  <NuxtImg
  src="/images/nuxt.png"
  alt="image"
  width="400"
  height="400"
  :custom="true"
  v-slot="{ src, isLoaded, imgAttrs }"
>
  <!-- Show the actual image when loaded -->
  <img
    v-if="isLoaded"
    v-bind="imgAttrs"
    :src="src"
    alt="gif"
  >

  <!-- Show a placeholder while loading -->
  <img
    v-else
    src="https://placehold.co/400x400"
    alt="placeholder"
  >
</NuxtImg>
</template>
<script setup lang="ts">
const props = defineProps<{
  src: string
}>()
</script>
