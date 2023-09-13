<template>
  <div class="q-pa-lg q-mx-auto" style="max-width: 800px">
    <div class="row q-gutter-sm">
      <QInput
        v-model="searchField"
        class="col"
        clearable
        :disable="tagsArePending"
        label="Filter by name"
        outlined
        style="min-width: 250px"
      />
      <QSelect
        ref="selectRef"
        v-model="tagsFilter"
        class="col"
        clearable
        multiple
        :options="tagsOptions || []"
        :disable="tagsArePending"
        label="Filter by tags"
        outlined
        behavior="menu"
        style="min-width: 250px"
      />
    </div>
    <SoundList v-if="!soundsArePending" :items="sounds" class="q-mt-lg" />
    <p v-else class="text-center text-grey-7 q-mt-lg">Loading...</p>
  </div>
</template>

<script lang="ts" setup>
import { Sound } from "~/utils/types";

// declaring refs
const searchField = ref("");
const tagsFilter: Ref<string[]> = ref([]);
const tagsFilterString = computed(() => {
  if (!tagsFilter.value?.length) return undefined;
  return tagsFilter.value.join("|");
});
const selectRef: Ref<HTMLElement | null> = ref(null);

// fetching data
const { pending: tagsArePending, data: tagsOptions } = await useLazyFetch("/api/tags");
const { pending: soundsArePending, data: soundsData } = await useLazyFetch("/api/sounds", {
  params: {
    s: searchField,
    t: tagsFilterString,
  },
  watch: [searchField, tagsFilterString],
});
const sounds: Ref<Sound[] | null> = soundsData;

// getting and updating route params
const routeQueries = useRoute().query;
if (routeQueries.s) {
  searchField.value = routeQueries.s.toString();
}
if (routeQueries.t) {
  tagsFilter.value = routeQueries.t.toString().split("|");
}
watch([searchField, tagsFilterString], (newValues) => {
  useRouter().push({ query: { s: newValues[0] || undefined, t: newValues[1] } });
});

// blurring select menu when the filter changes
watch(tagsFilter, () => {
  selectRef.value?.blur();
});

// setting layout
definePageMeta({
  layout: "nosearchbar",
});
</script>
