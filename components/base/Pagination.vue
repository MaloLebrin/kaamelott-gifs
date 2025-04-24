<template>
  <nav class="flex items-center space-x-2">
    <button
      :disabled="currentPage === 1"
      @click="handlePageChange(currentPage - 1)"
      class="px-3 py-1 rounded-md bg-gray-100"
      :title="`Page ${currentPage - 1}`"
      :aria-label="`Page ${currentPage - 1}`"
      :aria-current="currentPage === currentPage - 1 ? 'page' : undefined"
      :aria-disabled="currentPage === 1"
      :aria-controls="`pagination-${currentPage - 1}`"
    >
      <span class="hidden md:block">Précédent</span>
      <span class="block md:hidden">←</span>
    </button>
    
    <template v-for="page in totalPages" :key="page">
      <button
        v-if="
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 1 && page <= currentPage + 1)
        "
        @click="handlePageChange(page)"
        :class="[
          'px-3 py-1 rounded-md',
          currentPage === page
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100'
        ]"
        :title="`Page ${page}`"
        :aria-label="`Page ${page}`"
        :aria-current="currentPage === page ? 'page' : undefined"
        :aria-disabled="currentPage === page"
        :aria-controls="`pagination-${page}`"
      >
        {{ page }}
      </button>
      <span
        v-else-if="
          page === currentPage - 3 ||
          page === currentPage + 3
        "
        class="px-2"
      >
        ...
      </span>
    </template>
    
    <button
      :disabled="currentPage === totalPages"
      @click="handlePageChange(currentPage + 1)"
      class="px-3 py-1 rounded-md bg-gray-100 disabled:opacity-50"
      aria-label="Suivant"
      :aria-disabled="currentPage === totalPages"
      :aria-controls="`pagination-${currentPage + 1}`"
      title="Suivant"
    >
      <span class="hidden md:block">  Suivant</span>
      <span class="block md:hidden">→</span>
    </button>
  </nav>
</template> 

<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'pageChange', page: number): void
}>()

const handlePageChange = (page: number) => {
  emit('pageChange', page)
}
</script>
