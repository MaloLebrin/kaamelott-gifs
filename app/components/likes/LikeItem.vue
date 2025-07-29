<template>
<div 
  class="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] border border-gray-100 dark:border-gray-700"
  role="article"
  :aria-label="getAriaLabel(entity)"
>
  <!-- GIF -->
  <template v-if="isGif(entity)">
    <LikeGif
      :like="like"
      class="transition-transform duration-300 group-hover:scale-[1.02]"
    />
  </template>

  <!-- Personnage -->
  <template v-else-if="isCharacter(entity)">
    <LikeCharacter
      :like="like"
      class="transition-transform duration-300 group-hover:scale-[1.02]"
    />
  </template>

  <!-- Épisode -->
  <template v-else-if="isEpisode(entity)">
    <LikeEpisode
      :like="like"
      class="transition-transform duration-300 group-hover:scale-[1.02]"
    />
  </template>

  <!-- Saison -->
  <template v-else-if="isSeason(entity)">
    <LikeSeason
      :like="like"
      class="transition-transform duration-300 group-hover:scale-[1.02]"
    />
  </template>
</div>
</template>

<script setup lang="ts">
import type { LikeWithRelation } from '~~/shared/types/Like'
import LikeSeason from './LikeSeason.vue'
import { getEntity } from '~~/shared/utils/likes/likeableEntities'
import { isGif, isCharacter, isEpisode, isSeason } from '~~/shared/utils/entities'
import LikeEpisode from './LikeEpisode.vue'
import LikeCharacter from './LikeCharacter.vue'
import LikeGif from './LikeGif.vue'

const props = defineProps<{
  like: LikeWithRelation
}>()

const entity = getEntity(props.like)

const getAriaLabel = (entity: any) => {
  if (isGif(entity)) return `GIF: ${entity.quote}`
  if (isCharacter(entity)) return `Personnage: ${entity.name}`
  if (isEpisode(entity)) return `Épisode: ${entity.title}`
  if (isSeason(entity)) return `Saison: ${entity.title}`
  return 'Élément liké'
}
</script>

<style scoped>
.group {
  transform-origin: center;
  will-change: transform;
}

.group:hover {
  z-index: 10;
}
</style>
