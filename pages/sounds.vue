<template>
  <div class="q-py-lg q-mx-auto" style="max-width: 800px">
    <SoundList :items="sounds" />
  </div>
</template>

<script lang="ts" setup>
import { Sound } from "~/utils/types";

const sounds: Ref<Array<Sound>> = ref([]);

onMounted(async () => {
  const res = await fetch("/api/sounds");
  const data = (await res.json()) as unknown;
  sounds.value = data as Sound[];
});
</script>

<style></style>
