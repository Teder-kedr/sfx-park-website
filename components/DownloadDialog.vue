<template>
  <QDialog :model-value="props.modelValue" @update:model-value="emit('update:modelValue', $event)">
    <QCard>
      <QCardSection class="row items-center q-pb-none">
        <div class="text-h6">Download file:</div>
        <QSpace />
        <QBtn v-close-popup icon="close" flat round dense />
      </QCardSection>

      <QCardSection class="q-gutter-md">
        <div>
          {{ props.title }}
        </div>
        <QBtn :href="`/sounds/mp3/${props.fileName}.mp3`" download target="_blank" color="primary" class="q-pr-lg">
          <QIcon name="download" class="q-mr-sm" />
          Download .mp3
        </QBtn>
        <QBtn :href="`/sounds/wav/${props.fileName}.wav`" download target="_blank" color="primary" class="q-pr-lg">
          <QIcon name="download" class="q-mr-sm" />
          Download .wav
        </QBtn>
      </QCardSection>
    </QCard>
  </QDialog>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  fileName: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<style></style>
