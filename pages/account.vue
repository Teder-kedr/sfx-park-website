<template>
  <div class="q-px-lg q-mx-auto" style="max-width: 800px">
    <h1 class="text-h5">My account</h1>
    <p>
      Logged in as: <b>{{ store.user?.email }}</b>
    </p>
    <p class="q-mb-xs">My favorites: ({{ store.user?.liked.length }})</p>
    <QBtn to="/fav" color="primary" class="q-mb-md">
      <QIcon name="star" class="q-mr-sm" />
      See my favorites
    </QBtn>
    <p class="q-mb-xs">Log out from the account:</p>
    <QBtn :loading="isAwaitingLogOut" color="dark" @click="handleLogOut">
      <QIcon name="logout" class="q-mr-sm" />
      Log out
    </QBtn>
  </div>
</template>

<script lang="ts" setup>
import { useMyUserStore } from "~/stores/user";

definePageMeta({
  middleware: ["to-auth-only"],
});

const store = useMyUserStore();
const client = useSupabaseClient();

const isAwaitingLogOut = ref(false);

async function handleLogOut() {
  isAwaitingLogOut.value = true;
  await client.auth.signOut();
  store.user = null;
  const router = useRouter();
  router.push("/");
}
</script>

<style></style>
