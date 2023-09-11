<template>
  <div class="q-pa-lg q-mx-auto" style="max-width: 800px">
    <div class="row q-gutter-md">
      <QInput v-model="searchField" label="Filter by name" outlined clearable class="col" style="min-width: 250px" />
      <QSelect
        v-model="tagsFilter"
        outlined
        multiple
        :options="tags"
        class="col"
        label="Filter by tags"
        clearable
        style="min-width: 250px"
      />
    </div>
    <p class="q-mt-md q-mb-xs text-grey-8">Sort by:</p>
    <div class="q-gutter-sm">
      <QBtn
        v-for="opt of SORTING_METHODS"
        :key="opt.method"
        :color="sortBy === opt.method ? 'primary' : 'grey-7'"
        @click="sortBy = opt.method"
      >
        {{ opt.text }}
      </QBtn>
    </div>
    <SoundList :items="sortedFilteredItems" class="q-mt-lg" @tag-clicked="tagsFilter = [$event]" />
  </div>
</template>

<script lang="ts" setup>
import { Sound } from "~/utils/types";
const sounds: Ref<Sound[]> = ref([]);

const { data } = await useFetch("/api/sounds");
sounds.value = data.value as Sound[];

const { tags, searchField, tagsFilter, SORTING_METHODS, sortBy, sortedFilteredItems } = useFilteredList(sounds);

const route = useRoute();
if (route.query.s) {
  searchField.value = route.query.s as string;
}
if (route.query.t) {
  const tagsString = route.query.t as string;
  tagsFilter.value = tagsString.split("|");
}
watch([searchField, tagsFilter], (newValue) => {
  const params = {
    s: newValue[0] || undefined,
    t: newValue[1]?.join("|") || undefined,
  };
  const router = useRouter();
  router.push({ query: params });
});
</script>
