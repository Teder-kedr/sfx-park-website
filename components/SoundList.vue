<template>
  <ul v-if="props.items.length">
    <SoundItem
      v-for="item in props.items"
      :key="item.id"
      :item="item"
      :is-active="activeItemId === item.id"
      @activate="handleActivate(item)"
    />
  </ul>
  <p v-else class="text-center text-grey-7">No sounds</p>
</template>

<script lang="ts" setup>
import { Sound } from "~/utils/types";

const props = defineProps({
  items: {
    default: [],
    type: Array<Sound>,
  },
});

const activeItemId = ref("");

function handleActivate(item: Sound) {
  activeItemId.value = item.id;
}
</script>
