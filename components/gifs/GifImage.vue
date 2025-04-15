<script setup lang="ts">
interface Props {
  slug: string
  alt: string
  width?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 400,
  height: 225
})

const cloudinaryUrl = computed(() => {
  return `kaamelott-gifs/${props.slug}`
})
</script>

<template>
  <CldImage
    :public-id="cloudinaryUrl"
    :alt="alt"
    :width="width"
    :height="height"
    loading="lazy"
    fetch-format="auto"
    quality="auto"
    class="rounded-lg shadow-lg"
  />
</template> 
