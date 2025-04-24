<template>
<ul
  :class="[
    'flex md:hidden gap-2 -mx-[2000px] md:h-full items-stretch py-1 no-scrollbar',
    items.length > 1 && 'overflow-x-scroll space-x-1.5',
  ]"
>
  <li v-for="(item, index) in items" :key="index" class="flex-shrink-0">
    <slot :item="item" />
  </li>
</ul>
</template>

<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
}>()
</script>
