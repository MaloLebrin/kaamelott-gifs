<template>
<div 
  class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6"
  role="list"
  aria-label="Liste des éléments likés"
>
  <TransitionGroup
    name="list"
    tag="div"
    class="contents"
  >
    <LikeItem
      v-for="like in likes"
      :key="like.id"
      :like="like"
      class="list-item"
    />
  </TransitionGroup>
</div>
</template>

<script setup lang="ts">
import type { LikeWithRelation } from '~~/shared/types/Like'
import LikeItem from './LikeItem.vue'

defineProps<{
  likes: LikeWithRelation[]
}>()
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
