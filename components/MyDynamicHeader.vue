<template>
  <div>
    <QExpansionItem v-if="$q.screen.xs" expand-icon-toggle class="bg-dark text-white q-py-md q-px-lg justify-between">
      <template #header>
        <NuxtLink to="/" class="text-h6 text-white q-mr-sm" style="text-decoration: none">
          <em>SFX Park</em>
        </NuxtLink>
      </template>
      <form v-if="$route.path !== '/sounds'" style="flex-grow: 1; max-width: 650px" @submit.prevent>
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
      <form v-if="$route.path !== '/sounds'" style="flex-grow: 1; max-width: 650px" @submit.prevent>
        <QInput v-model="searchField" class="q-ml-sm" dark outlined dense label="Search sounds...">
          <template #append>
            <QBtn type="submit" round flat icon="search" @click="handleSearchSubmit" />
          </template>
        </QInput>
      </form>
      <QBtn flat to="/">Log in / Register</QBtn>
    </QToolbar>
  </div>
</template>

<script setup lang="ts">
const searchField = ref("");

function handleSearchSubmit() {
  const router = useRouter();
  router.push(`/sounds?s=${searchField.value.toLowerCase()}`);
  searchField.value = "";
}
</script>

<style scoped>
.my-big-toolbar {
  flex-direction: row;
  gap: 2rem;
}
</style>
