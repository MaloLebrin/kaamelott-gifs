<script setup lang="ts">
import type { GifStructuredData, CharacterStructuredData, EpisodeStructuredData } from '~/types/seo'

interface Props {
  data: GifStructuredData | CharacterStructuredData | EpisodeStructuredData
}

defineProps<Props>()
</script>

<template>
  <script type="application/ld+json">
    {{ JSON.stringify(props.data) }}
  </script>
</template> 
