<template>
<div
  v-if="isLoading"
  class="relative w-full h-full bg-gray-100 dark:bg-gray-800"
  :class="className"
>
  <div class="absolute inset-0 flex items-center justify-center">
    <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"/>
  </div>
</div>
<img
  v-else-if="error"
  src="/fondKBg.webp"
  alt="Image"
  :width="width"
  :height="height"
  :loading="loading"
  :class="className"
>
<img
  v-else
  :src="src"
  :alt="alt"
  :width="width"
  :height="height"
  :loading="loading"
  :class="className"
>
</template>

<script setup lang="ts">
import { useImage } from '@vueuse/core'

interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  className?: string
  placeholder?: string
  quality?: number
  format?: 'webp' | 'jpg' | 'png' | 'gif'
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
  position?: string
  background?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: 400,
  height: 400,
  loading: 'lazy',
  className: '',
  placeholder: '/fondKBg.webp',
  quality: 80,
  fit: 'cover',
  position: 'center',
  background: 'transparent',
  alt: 'Image'
})

const { isLoading, error } = useImage({ src: props.src })
</script>
