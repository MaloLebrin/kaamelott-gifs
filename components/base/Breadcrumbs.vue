<template>
<nav
  v-if="items.length > 0"
  aria-label="Fil d'Ariane"
  class="py-3 px-4 bg-white/90 dark:bg-gray-800 dark:text-gray-50 rounded-lg mb-2.5">
  <ol class="flex flex-wrap items-center space-x-2 text-sm text-gray-500">
    <li>
      <NuxtLink 
        to="/" 
        class="hover:text-gray-900 transition-colors duration-200 dark:text-gray-50 dark:hover:text-gray-50"
        aria-label="Retour à l'accueil"
      >
        Accueil
      </NuxtLink>
    </li>
    <li
      v-for="(item, index) in items"
      :key="index"
      class="flex items-center">
      <span class="mx-2 text-gray-400">/</span>
      <template v-if="index === items.length - 1">
        <span
          class="text-gray-900 dark:text-gray-50 dark:hover:text-gray-50"
          aria-current="page">{{ item.label }}</span>
      </template>
      <template v-else>
        <NuxtLink 
          :to="item.to" 
          class="hover:text-gray-900 transition-colors duration-200 dark:text-gray-50 dark:hover:text-gray-50"
          :aria-label="item.label"
        >
          {{ item.label }}
        </NuxtLink>
      </template>
    </li>
  </ol>
</nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  to: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script> 
