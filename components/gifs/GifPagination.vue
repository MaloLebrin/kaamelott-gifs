<script setup lang="ts">
import type { Gif } from '~/types'
import Pagination from '~/components/base/Pagination.vue'

interface Props {
  gifs: Gif[]
  itemsPerPage?: number
  currentPage?: number
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 21,
  currentPage: 1
})

const emit = defineEmits<{
  (e: 'pageChange', page: number): void
  (e: 'update:currentPage', page: number): void
}>()

// Pagination logic
const totalPages = computed(() => Math.ceil(props.gifs.length / props.itemsPerPage))
const paginatedGifs = computed(() => {
  const start = (props.currentPage - 1) * props.itemsPerPage
  const end = start + props.itemsPerPage
  return props.gifs.slice(start, end)
})

// Handle page change
const handlePageChange = (page: number) => {
  emit('pageChange', page)
  emit('update:currentPage', page)
}
</script>

<template>
  <div>
    <slot :paginated-gifs="paginatedGifs" />
    
    <!-- Pagination -->
    <div v-if="totalPages > 1" class="mt-8 flex justify-center">
      <Pagination 
        :current-page="currentPage" 
        :total-pages="totalPages" 
        @page-change="handlePageChange" 
      />
    </div>
  </div>
</template> 
