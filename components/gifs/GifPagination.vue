<script setup lang="ts">
import type { Gif } from '~/types'
import Pagination from '~/components/base/Pagination.vue'
import { usePagination } from '~/composables/usePagination'

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

const {
  paginatedItems: paginatedGifs,
  totalPages,
  setPage
} = usePagination({
  items: props.gifs,
  itemsPerPage: props.itemsPerPage,
})

// Handle page change
const handlePageChange = (page: number) => {
  setPage(page)
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
