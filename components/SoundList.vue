<template>
  <ul v-if="props.items && props.items.length">
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

type Props = {
  items: Array<Sound> | null;
};

const props = defineProps<Props>();

const activeItemId = ref("");

function handleActivate(item: Sound) {
  activeItemId.value = item.id;
}
</script>
