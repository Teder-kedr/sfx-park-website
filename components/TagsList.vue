<template>
  <div v-if="tags" class="q-mb-xl">
    <QChip
      v-for="tag of tags"
      :key="tag"
      size="lg"
      icon="label"
      color="white"
      class="q-px-md q-mb-sm"
      style="font-size: 1rem"
      clickable
      @click="$router.push({ path: '/sounds', query: { t: tag.toLowerCase() } })"
    >
      {{ tag }}
    </QChip>
  </div>
</template>

<script lang="ts" setup>
const { data } = await useLazyFetch("tags.json");
const tags = data as Ref<string[]>;
</script>

<style></style>
