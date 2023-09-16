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
        @click.once="incrementViewsCount"
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

        <p v-if="props.isActive" class="q-mb-none text-grey-7">
          <QIcon name="headphones" />
          {{ props.item.views }}
        </p>

        <ul v-if="props.isActive">
          <p class="q-mb-xs">Tags:</p>
          <li v-for="tag of props.item.tags" :key="tag" style="display: inline">
            <QChip outline icon="label" clickable @click="handleTagClick(tag)">{{ tag }}</QChip>
          </li>
        </ul>

        <p class="q-mb-none">
          <span v-if="!isActive" class="text-caption text-grey-7">{{ formatTime(props.item.duration) }}</span>
        </p>
        <Transition name="slide-fade">
          <div v-if="isPopupText">
            <QChip color="yellow-9" outline class="q-mb-none q-pt-sm">
              Added to my favorites!
              <QIcon name="check" class="q-ml-sm" />
            </QChip>
          </div>
        </Transition>
      </div>
      <div class="row no-wrap items-center" style="gap: 0.5rem">
        <QBtn
          round
          flat
          aria-label="Add to favorites"
          :loading="isLikeLoading"
          :icon="isFav ? 'star' : 'star_outline'"
          :color="isFav && !isLikeLoading ? 'warning' : undefined"
          @click="handleFavClick"
        />
        <QBtn round flat aria-label="Download" icon="file_download" @click="handleDownloadClick" />
      </div>
    </QCard>
  </li>
  <DownloadDialog v-model="isDialogOpen" :file-name="props.item.fileName" :title="props.item.title" />
</template>
<script setup lang="ts">
import { Sound } from "~/utils/types";
import type { PropType } from "vue";
import { useMyUserStore } from "~/stores/user";

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

type InjectedFunction = (tag: string) => void;
const injectedTagClick = inject("handleTagClick", null) as InjectedFunction | null;
function handleTagClick(tag: string) {
  if (injectedTagClick) {
    injectedTagClick(tag);
  } else {
    useRouter().push({ path: "/sounds", query: { t: tag } });
  }
}

const store = useMyUserStore();
const isFav = ref(store.user?.liked.includes(props.item.id) || false);
const isPopupText = ref(false);
const isLikeLoading = ref(false);

async function handleFavClick() {
  const POPUP_TIMEOUT = 3000;

  if (!store.user) {
    const router = useRouter();
    router.push("/login");
  } else {
    try {
      isLikeLoading.value = true;
      isFav.value = !isFav.value;
      store.toogleLiked(props.item.id);
      await updateFavorites(store.user.liked);
      isLikeLoading.value = false;
      if (store.user.liked.includes(props.item.id)) {
        isPopupText.value = true;
        setTimeout(() => {
          isPopupText.value = false;
        }, POPUP_TIMEOUT);
      } else {
        isPopupText.value = false;
      }
    } catch (error) {
      console.error(error);
    }
  }
}

async function updateFavorites(array: string[]) {
  const likedString = array.join("|");
  const uid = store.user?.id;
  const { data, error } = await useFetch("/api/like", {
    method: "post",
    body: { liked: likedString, uid },
  });
  if (error.value) throw error.value;
  return data.value?.success;
}

async function incrementViewsCount() {
  const { error } = await useFetch("/api/view", {
    method: "post",
    body: { id: props.item.id },
  });
  if (error.value) console.error(error.value);
}

const isDialogOpen = ref(false);
function handleDownloadClick() {
  if (!store.user) {
    const router = useRouter();
    router.push("/login");
  } else {
    isDialogOpen.value = true;
  }
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
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
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
