<template>
  <div class="q-pa-lg q-mx-auto" style="max-width: 800px">
    <div class="row q-gutter-sm">
      <QInput v-model="searchField" class="col" clearable label="Filter by name" outlined />
      <QSelect
        v-model="tagsFilter"
        class="col"
        clearable
        multiple
        :options="tagsOptions || []"
        :disable="tagsArePending"
        label="Filter by tags"
        outlined
      />
    </div>
    <SoundList v-if="!soundsArePending" :items="sounds" class="q-mt-lg" />
    <p v-else class="text-center text-grey-7 q-mt-lg">Loading...</p>
  </div>
</template>

<script lang="ts" setup>
import { Sound } from "~/utils/types";
const searchField = ref("");
const tagsFilter: Ref<string[]> = ref([]);
const tagsFilterString = computed(() => {
  if (!tagsFilter.value?.length) return undefined;
  return tagsFilter.value.join("|");
});

const { pending: tagsArePending, data: tagsOptions } = await useLazyFetch("/api/tags");
const { pending: soundsArePending, data: soundsData } = await useLazyFetch("/api/sounds", {
  params: {
    s: searchField,
    t: tagsFilterString,
  },
  watch: [searchField, tagsFilterString],
});
const sounds: Ref<Sound[] | null> = soundsData;

definePageMeta({
  layout: "nosearchbar",
});
</script>
