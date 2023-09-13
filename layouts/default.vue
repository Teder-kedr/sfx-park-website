<template>
  <div class="my-body">
    <div>
      <QExpansionItem v-if="$q.screen.xs" expand-icon-toggle class="bg-dark text-white q-py-md q-px-lg justify-between">
        <template #header>
          <NuxtLink to="/" class="text-h6 text-white q-mr-sm" style="text-decoration: none">
            <em>SFX Park</em>
          </NuxtLink>
        </template>
        <form style="flex-grow: 1; max-width: 650px" @submit.prevent>
          <QInput v-model="searchField" class="q-ml-sm q-mb-xs" dark outlined dense label="Search sounds...">
            <template #append>
              <QBtn type="submit" round flat icon="search" @click="handleSearchSubmit" />
            </template>
          </QInput>
        </form>
        <QBtn flat to="/">Log in / Register</QBtn>
      </QExpansionItem>

      <QToolbar v-else class="my-big-toolbar bg-dark text-white q-py-md q-px-lg justify-between">
        <NuxtLink to="/" class="text-h6 text-white" style="text-decoration: none">
          <em>SFX Park</em>
        </NuxtLink>
        <form style="flex-grow: 1; max-width: 650px" @submit.prevent>
          <QInput v-model="searchField" class="q-ml-sm" dark outlined dense label="Search sounds...">
            <template #append>
              <QBtn type="submit" round flat icon="search" @click="handleSearchSubmit" />
            </template>
          </QInput>
        </form>
        <QBtn flat to="/">Log in / Register</QBtn>
      </QToolbar>
    </div>

    <div>
      <slot />
    </div>
    <footer class="my-footer text-grey-4 bg-dark q-pa-lg">
      <p class="text-center q-mb-none"></p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const searchField = ref("");

function handleSearchSubmit() {
  if (searchField.value.trim() === "") return;
  const router = useRouter();
  router.push({ path: "/sounds", query: { s: searchField.value } });
  searchField.value = "";
}
</script>

<style scoped>
.my-body {
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
.my-big-toolbar {
  flex-direction: row;
  gap: 2rem;
}
</style>
