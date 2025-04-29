<template>
  <script type="application/ld+json" v-html="jsonLd"></script>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: Record<string, any>
}>()

const jsonLd = computed(() => {
  return JSON.stringify(props.data, null, 2)
})
</script> 
