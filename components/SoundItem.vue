<template>
  <li>
    <QCard class="my-card q-pa-md q-mb-md items-start no-wrap">
      <QBtn
        round
        color="grey-6"
        class="q-mb-md"
        :icon="playing ? 'pause' : 'play_arrow'"
        :aria-label="playing ? 'Pause' : 'Play'"
        @click="togglePlay"
      />
      <div style="width: 100%">
        <WaveSurfer
          v-if="isActive"
          ref="refWaveSurfer"
          v-model="playing"
          :src="formatSrc(props.item.fileName)"
          @duration="duration = $event"
          @timeupdate="time = $event"
        />
        <p v-if="props.isActive" class="q-mb-none text-caption text-grey-7">
          {{ formatTime(time) }} / {{ formatTime(duration) }}
        </p>
        <button class="my-title text-subtitle1 q-mb-none" @click="$emit('activate')">{{ props.item.title }}</button>

        <ul v-if="props.isActive">
          <p class="q-mb-xs">Tags:</p>
          <li v-for="tag of props.item.tags" :key="tag" style="display: inline">
            <QChip outline icon="label">{{ tag }}</QChip>
          </li>
        </ul>

        <p class="q-mb-none">
          <span v-if="!isActive" class="text-caption text-grey-7">{{ formatTime(props.item.duration) }}</span>
        </p>
      </div>
      <div class="row no-wrap items-center" style="gap: 0.5rem">
        <QBtn round flat aria-label="Add to favorites" icon="star_outline" />
        <QBtn round flat aria-label="Download" icon="file_download" />
      </div>
    </QCard>
  </li>
</template>
<script setup lang="ts">
import { Sound } from "~/utils/types";
import type { PropType } from "vue";

const props = defineProps({
  item: {
    required: true,
    type: Object as PropType<Sound>,
  },
  isActive: {
    required: true,
    type: Boolean,
  },
});

onUpdated(() => {
  if (!props.isActive) {
    playing.value = false;
  }
});

const emit = defineEmits(["activate"]);

const refWaveSurfer = ref(null);
const playing = ref(false);
const duration = ref(0);
const time = ref(0);

function togglePlay() {
  emit("activate");
  playing.value = !playing.value;
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function formatSrc(fileName: string) {
  return `/sounds/mp3/${fileName}.mp3`;
}
</script>

<style scoped>
.my-title {
  text-align: left;
  background: none;
  border: 0;
  outline: 0;
  padding: 0;
  cursor: pointer;
}
.my-title:hover {
  text-decoration: underline;
}
.my-card {
  display: flex;
  flex-direction: column;
}

@media (min-width: 600px) {
  .my-card {
    flex-direction: row;
    gap: 1rem;
  }
}
</style>
