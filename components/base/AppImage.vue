<template>
  <!-- :provider="provider" -->
  <NuxtImg
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="loading"
    :class="className"
    :quality="quality"
    :format="format"
    :fit="fit"
    :position="position"
    :background="background"
    custom
    v-slot="{ src: imgSrc, isLoaded, imgAttrs, error }"
  >
    <span v-if="error" class="hidden">Error</span>
    <!-- Show the actual image when loaded -->
    <img
      v-if="isLoaded"
      v-bind="imgAttrs"
      :src="imgSrc"
      :alt="alt"
      :class="className"
    >

    <!-- Show a placeholder while loading -->
    <div
      v-else
      class="relative w-full h-full bg-gray-100 dark:bg-gray-800"
      :class="className"
    >
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  </NuxtImg>
</template>

<script setup lang="ts">
interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  // provider?: 'ipx'
  loading?: 'lazy' | 'eager'
  className?: string
  placeholder?: string
  quality?: number
  format?: 'webp' | 'jpg' | 'png' | 'gif'
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'
  position?: string
  background?: string
}

withDefaults(defineProps<Props>(), {
  width: 400,
  height: 400,
  // provider: 'ipx',
  loading: 'lazy',
  className: '',
  placeholder: '/fondKBg.webp',
  quality: 80,
  format: 'webp',
  fit: 'cover',
  position: 'center',
  background: 'transparent',
  alt: 'Image'
})
</script>
