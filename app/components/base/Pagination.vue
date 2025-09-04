<template>
<nav
  class="flex items-center space-x-2"
  aria-label="Pagination">
  <NuxtLink
    :disabled="currentPage === 1"
    class="px-3 py-1 rounded-md bg-gray-100 disabled:opacity-50"
    :title="`Page ${currentPage - 1}`"
    :aria-label="`Page précédente`"
    :aria-disabled="currentPage === 1"
    :to="{
      query: {
        ...route.query,
        page: currentPage - 1
      }
    }"
    @click="handlePageChange(currentPage - 1)"
  >
    <span class="hidden md:block">Précédent</span>
    <span class="block md:hidden">←</span>
  </NuxtLink>
    
  <template
    v-for="page in totalPages"
    :key="page">
    <NuxtLink
      v-if="
        page === 1 ||
          page === totalPages ||
          (page >= currentPage - 1 && page <= currentPage + 1)
      "
      :class="[
        'px-3 py-1 rounded-md',
        currentPage === page
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100'
      ]"
      :title="`Page ${page}`"
      :aria-label="`Page ${page}`"
      :aria-current="currentPage === page ? 'page' : undefined"
      :to="{
        query: {
          ...route.query,
          page: page
        }
      }"
      @click="handlePageChange(page)"
    >
      {{ page }}
    </NuxtLink>
    <span
      v-else-if="
        page === currentPage - 3 ||
          page === currentPage + 3
      "
      class="px-2"
      aria-hidden="true"
    >
      ...
    </span>
  </template>
    
  <NuxtLink
    :disabled="currentPage === totalPages"
    class="px-3 py-1 rounded-md bg-gray-100 disabled:opacity-50"
    :aria-label="`Page suivante`"
    :aria-disabled="currentPage === totalPages"
    :title="`Page ${currentPage + 1}`"
    :to="{
      query: {
        ...route.query,
        page: currentPage + 1
      }
    }"
    @click="handlePageChange(currentPage + 1)"
  >
    <span class="hidden md:block">Suivant</span>
    <span class="block md:hidden">→</span>
  </NuxtLink>
</nav>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
}

const props = defineProps<Props>()
const route = useRoute()

const emit = defineEmits<{
  (e: 'pageChange', page: number): void
}>()

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('pageChange', page)
  }
}
</script>
