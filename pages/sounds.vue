<template>
  <div class="q-pa-lg q-mx-auto" style="max-width: 800px">
    <QInput v-model="searchField" debounce="500" outlined />
    <SoundList v-if="!pending" :items="sounds" class="q-mt-lg" />
    <p v-else class="text-center text-grey-7 q-mt-lg">Loading...</p>
  </div>
</template>

<script lang="ts" setup>
import { Sound } from "~/utils/types";
const searchField = ref("");

const { pending, data } = await useLazyFetch("/api/sounds", {
  params: {
    s: searchField,
  },
  watch: [searchField],
});
const sounds: Ref<Sound[] | null> = data;

definePageMeta({
  layout: "nosearchbar",
});
</script>
