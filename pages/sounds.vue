<template>
  <div class="q-pa-lg q-mx-auto" style="max-width: 800px">
    <div class="row">
      <QInput
        v-model="searchField"
        label="Filter by name"
        outlined
        clearable
        class="q-mr-md"
        style="min-width: 250px"
      />
      <QSelect
        v-model="tagsFilter"
        outlined
        multiple
        :options="tags"
        label="Filter by tags"
        clearable
        style="min-width: 250px"
      />
    </div>
    <SoundList :items="filteredItems" class="q-mt-lg" />
  </div>
</template>

<script lang="ts" setup>
import { Sound } from "~/utils/types";
const sounds: Ref<Sound[]> = ref([]);

const { data } = await useFetch("/api/sounds");
sounds.value = data.value as Sound[];

const { tags, searchField, tagsFilter, filteredItems } = useFilteredList(sounds);
</script>

<style></style>
