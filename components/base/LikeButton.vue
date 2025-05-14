
<template>
<button
  :class="[
    'inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5',
    'transition-all duration-200 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed',
    {
      'bg-red-500/10 hover:bg-red-500/20 animate-heartBeat': isLiked,
      'bg-white/10 hover:bg-white/20': !isLiked
    }
  ]"
  :disabled="isLoading"
  type="button"
  aria-label="Like"
  @click="toggleLike"
>
  <div class="relative flex items-center justify-center">
    <Icon
      :name="isLiked ? 'ph:heart-fill' : 'ph:heart'"
      class="text-xl transition-transform duration-200"
      :class="{ 'text-red-500 scale-110': isLiked }"
    />
  </div>
  <span class="font-medium tabular-nums">{{ likesCount?.toLocaleString() }}</span>
</button>
</template>

<script setup lang="ts">
import { useLike } from '~/composables/useLike'

const props = defineProps<{
  gifId: number
  size?: 'sm' | 'md' | 'lg'
}>()

const { isLoading, isLiked, likesCount, toggleLike } = useLike(props.gifId)
</script>
