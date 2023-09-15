<template>
  <div class="q-pa-lg q-mx-auto" style="max-width: 800px">
    <div class="row q-gutter-sm">
      <QInput
        v-model="searchField"
        class="col"
        clearable
        :disable="tagsArePending"
        debounce="250"
        label="Search"
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
    <p class="q-mt-md q-mb-xs">Sort by:</p>
    <div class="q-gutter-sm">
      <QBtn
        v-for="opt of SORTING_OPTIONS"
        :key="opt.method"
        rounded
        :class="{ 'bg-primary text-white': sortBy === opt.method, 'bg-white': sortBy !== opt.method }"
        @click="sortBy = opt.method"
      >
        {{ opt.title }}
      </QBtn>
    </div>
    <SoundList v-if="!soundsArePending" :items="sounds" class="q-mt-lg" />
    <div v-else class="q-mt-lg row justify-center">
      <QSpinnerIos size="2rem" />
    </div>
    <div v-if="!searchField && !tagsFilterString" class="q-mt-lg q-mb-sm row justify-center">
      <QPagination v-model="page" direction-links :max="MAX_PAGES" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Sound } from "~/utils/types";

const MAX_PAGES = 2;

const SORTING_OPTIONS = [
  { title: "Most popular", method: "popular" },
  { title: "Shortest", method: "shortest" },
  { title: "Longest", method: "longest" },
];

// declaring refs
const searchField = ref("");
const tagsFilter: Ref<string[]> = ref([]);
const tagsFilterString = computed(() => {
  if (!tagsFilter.value?.length) return undefined;
  return tagsFilter.value.join("|");
});
const page: Ref<number> = ref(1);
const sortBy: Ref<string> = ref("popular");

// resetting page when filters change
watch([searchField, tagsFilterString], () => {
  page.value = 1;
});

const selectRef: Ref<HTMLElement | null> = ref(null);

// fetching data
const { pending: tagsArePending, data: tagsOptions } = await useLazyFetch("/api/tags");
const { pending: soundsArePending, data: soundsData } = await useLazyFetch("/api/sounds", {
  params: {
    s: searchField,
    t: tagsFilterString,
    p: page,
    sort: sortBy,
  },
  watch: [searchField, tagsFilterString, page, sortBy],
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
if (routeQueries.p) {
  page.value = parseInt(routeQueries.p.toString());
}
if (routeQueries.sort) {
  sortBy.value = routeQueries.sort.toString();
}
watch([searchField, tagsFilterString, page, sortBy], (newValues) => {
  useRouter().push({
    query: {
      s: newValues[0] || undefined,
      t: newValues[1],
      p: newValues[2] > 1 ? newValues[2] : undefined,
      sort: newValues[3] !== "popular" ? newValues[3] : undefined,
    },
  });
});

// listening for tag clicks
provide("handleTagClick", (tag: string) => {
  tagsFilter.value = [tag];
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
