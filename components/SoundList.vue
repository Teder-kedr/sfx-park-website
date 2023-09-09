<template>
  <SoundItem
    v-for="(item, idx) in items"
    :key="item.id"
    :item="item"
    :is-active="activeItem === idx"
    @activate="handleActivate(idx)"
  />
</template>

<script lang="ts" setup>
import { Sound } from "~/utils/types";

const activeItem = ref(-1);

function handleActivate(index: number) {
  activeItem.value = index;
}

const items: Ref<Array<Sound>> = ref([]);

onMounted(async () => {
  const response = await fetch("/soundData.json");
  items.value = (await response.json()) as Sound[];
});
</script>
