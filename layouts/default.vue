<template>
  <QToolbar class="my-toolbar text-white q-py-md q-px-lg justify-between">
    <NuxtLink to="/" class="text-h6 text-white" style="text-decoration: none">
      <em>SFX Park</em>
    </NuxtLink>
    <QInput
      v-model="searchField"
      class="q-ml-sm"
      dark
      outlined
      dense
      label="Search sounds..."
      style="flex-grow: 1; max-width: 650px"
    >
      <template #append>
        <QBtn round flat icon="search" />
      </template>
    </QInput>
    <QBtn flat to="/">Log in / Register</QBtn>
  </QToolbar>
  <slot />
</template>

<script setup lang="ts">
const searchField = ref("");
</script>

<style scoped>
.my-toolbar {
  background-color: rgb(36, 36, 34);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

@media (min-width: 600px) {
  .my-toolbar {
    flex-direction: row;
    gap: 2rem;
  }
}
</style>
