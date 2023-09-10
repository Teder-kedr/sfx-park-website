<template>
  <div class="q-mb-xl">
    <QChip
      v-for="tag of tags"
      :key="tag"
      size="lg"
      icon="label"
      color="white"
      class="q-px-md q-mb-sm"
      style="font-size: 1rem"
      clickable
      @click="$router.push('/sounds')"
    >
      {{ tag }}
    </QChip>
  </div>
</template>

<script lang="ts" setup>
const tags: Ref<string[]> = ref([]);

onMounted(async () => {
  const response = await fetch("tags.json");
  tags.value = await response.json();
});
</script>

<style></style>
