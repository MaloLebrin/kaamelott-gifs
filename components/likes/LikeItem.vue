<template>
<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
  <!-- GIF -->
  <template v-if="isGif(entity)">
    <LikeGif
      :like="like"
    />
  </template>

  <!-- Personnage -->
  <template v-else-if="isCharacter(entity)">
    <LikeCharacter
      :like="like"
    />
  </template>

  <!-- Épisode -->
  <template v-else-if="isEpisode(entity)">
    <LikeEpisode
      :like="like"
    />
  </template>

  <!-- Saison -->
  <template v-else-if="isSeason(entity)">
    <LikeSeason
      :like="like"
    />
  </template>
</div>
</template>

<script setup lang="ts">
import type { LikeWithRelation } from '~/types/Like'
import LikeSeason from './LikeSeason.vue'
import { getEntity } from '~/shared/utils/likes/likeableEntities'
import { isGif, isCharacter, isEpisode, isSeason } from '~/shared/utils/entities'
import LikeEpisode from './LikeEpisode.vue'
import LikeCharacter from './LikeCharacter.vue'
import LikeGif from './LikeGif.vue'

const props = defineProps<{
  like: LikeWithRelation
}>()

const entity = getEntity(props.like)
</script>
