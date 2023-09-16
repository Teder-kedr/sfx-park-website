<template>
  <div class="q-px-lg q-mx-auto" style="max-width: 800px">
    <h1 class="text-h5">My favorites:</h1>
    <SoundList v-if="!soundsArePending" :items="sounds" />
    <div v-else class="q-mt-lg row justify-center">
      <QSpinnerIos size="2rem" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMyUserStore } from "~/stores/user";

definePageMeta({
  middleware: ["to-auth-only"],
});

const store = useMyUserStore();

const { pending: soundsArePending, data: soundsData } = await useLazyFetch("/api/sounds", {
  params: {
    fav: true,
    ids: store.user?.liked.join("|"),
  },
});
const sounds: Ref<Sound[] | null> = soundsData;
</script>

<style></style>
