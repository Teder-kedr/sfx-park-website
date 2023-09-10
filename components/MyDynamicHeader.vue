<template>
  <div>
    <QToolbar v-if="$q.screen.gt.xs" class="my-big-toolbar bg-dark text-white q-py-md q-px-lg justify-between">
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

    <QExpansionItem
      v-else
      expand-icon-toggle
      class="my-small-toolbar bg-dark text-white q-py-md q-px-lg justify-between"
    >
      <template #header>
        <NuxtLink to="/" class="text-h6 text-white q-mr-sm" style="text-decoration: none">
          <em>SFX Park</em>
        </NuxtLink>
      </template>
      <QInput
        v-model="searchField"
        class="q-ml-sm q-mb-xs"
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
    </QExpansionItem>
  </div>
</template>

<script setup lang="ts">
const searchField = ref("");
</script>

<style scoped>
.my-big-toolbar {
  flex-direction: row;
  gap: 2rem;
}
</style>
