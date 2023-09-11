<template>
  <MainHero />
  <div class="my-container q-mx-auto q-px-lg">
    <h3 class="text-h6">Popular sounds:</h3>
    <SoundList :items="popularSounds" />
    <div class="row justify-center">
      <QBtn flat rounded class="text-grey-9" to="/sounds">
        <QIcon name="add" class="q-mr-xs" />
        Show all sounds
      </QBtn>
    </div>
    <h3 class="text-h6">Popular tags:</h3>
    <TagsList />
  </div>
</template>

<script setup lang="ts">
import { Sound } from "~/utils/types";

const { data } = await useFetch("/api/sounds");
const sounds: Ref<Sound[]> = data as Ref<Sound[]>;
const popularSounds = computed(() => {
  const POPULAR_SOUNDS_COUNT = 4;

  return sounds.value
    .sort((a, b) => {
      if (a.views > b.views) {
        return -1;
      } else {
        return 1;
      }
    })
    .slice(0, POPULAR_SOUNDS_COUNT);
});
</script>

<style scoped>
.my-container {
  max-width: 800px;
}
</style>
