<template>
<div class="space-y-4">
  <!-- État de chargement -->
  <div
    v-if="isLoading"
    class="flex justify-center items-center py-8">
    <Icon
      name="heroicons:arrow-path"
      class="w-8 h-8 animate-spin text-primary-600" />
  </div>

  <!-- Message d'erreur -->
  <div
    v-else-if="error"
    class="text-center py-8 backdrop-blur-lg rounded-lg p-4 bg-white/90 dark:bg-gray-800">
    <p class="text-red-600 dark:text-red-400">
      {{ error.message }}
    </p>
    <button
      type="button"
      aria-label="Réessayer"
      class="mt-4 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
      @click="refresh">
      Réessayer
    </button>
  </div>

  <!-- Liste vide -->
  <div
    v-else-if="!likes.length"
    class="text-center py-8 backdrop-blur-lg rounded-lg p-4 bg-white/90 dark:bg-gray-800">
    <p class="text-gray-500 dark:text-gray-400">
      Aucun élément liké pour le moment
    </p>
  </div>

  <!-- Liste des likes -->
  <template v-else>
    <div 
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6"
      role="list"
      aria-label="Liste des éléments likés">
      <TransitionGroup
        name="list"
        tag="div"
        class="contents">
        <LikeItem
          v-for="like in likes"
          :key="like.id"
          :like="like"
          class="list-item" />
      </TransitionGroup>
    </div>

    <!-- Pagination -->
    <div
      v-if="totalPages > 1"
      class="mt-8 flex justify-center">
      <Pagination 
        :current-page="currentPage" 
        :total-pages="totalPages" 
        @page-change="setPage" 
      />
    </div>
  </template>
</div>
</template>

<script setup lang="ts">
import type { LikeableEntity } from '~~/shared/types/Entities'
import LikeItem from './LikeItem.vue'
import Pagination from '~/components/base/Pagination.vue'
import { useLikesList } from '~/composables/useLikesList'

interface Props {
  entityType?: LikeableEntity
  itemsPerPage?: number
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 21,
  entityType: undefined
})

const {
  isLoading,
  error,
  currentPage,
  totalPages,
  setPage,
  likes,
  refresh,
} = useLikesList({
  entityType: props.entityType,
  itemsPerPage: props.itemsPerPage
})
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-move {
  transition: transform 0.5s ease;
}

@media (prefers-reduced-motion: reduce) {
  .list-enter-active,
  .list-leave-active,
  .list-move {
    transition: none;
  }
}
</style> 
