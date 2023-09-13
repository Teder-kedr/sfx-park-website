<template>
  <MainHero />
  <div class="my-container q-mx-auto q-px-lg">
    <h3 class="text-h6">Popular sounds:</h3>
    <SoundList v-if="!pending" :items="sounds" />
    <div v-else class="q-my-lg row justify-center">
      <QSpinnerIos size="2rem" />
    </div>
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

const { pending, data } = await useLazyFetch("/api/sounds", {
  params: {
    homepage: true,
  },
});

const sounds: Ref<Sound[] | null> = data;
</script>

<style scoped>
.my-container {
  max-width: 800px;
}
</style>
