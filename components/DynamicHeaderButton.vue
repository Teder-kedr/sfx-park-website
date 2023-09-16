<template>
  <div>
    <QBtn v-if="isUser" flat to="/login">My account</QBtn>
    <QBtn v-else flat to="/login">Log in / Register</QBtn>
  </div>
</template>

<script lang="ts" setup>
import { useMyUserStore } from "~/stores/user";

const store = useMyUserStore();
const isUser = ref(!!store.user);

watch(store, () => {
  if (store.user) {
    isUser.value = true;
  } else {
    isUser.value = false;
  }
});
</script>

<style></style>
