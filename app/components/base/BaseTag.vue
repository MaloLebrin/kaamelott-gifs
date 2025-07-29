<template>
<span class="px-3 py-1.5 border-[1px] border-gray-200 bg-gray-100 rounded-full text-sm text-gray-600">
  {{ label }}
</span>
</template>

<script setup lang="ts" generic="T">
defineProps<{
  label: string
}>()
</script>
