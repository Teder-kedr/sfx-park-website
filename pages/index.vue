<template>
  <MainHero />
  <div class="my-container q-mx-auto q-px-lg">
    <h3 class="text-h6">Popular sounds:</h3>
    <SoundList v-if="!pending" :items="sounds" />
    <p v-else class="text-center text-grey-7 q-mt-lg">Loading...</p>
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
