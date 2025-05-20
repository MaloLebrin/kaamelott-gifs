<template>
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <LikeItem
    v-for="like in likes"
    :key="like.id"
    :like="like"
  />
</div>
</template>

<script setup lang="ts">
import type { LikeWithRelation } from '~/types/Like'
import LikeItem from './LikeItem.vue'

defineProps<{
  likes: LikeWithRelation[]
}>()
</script> 
