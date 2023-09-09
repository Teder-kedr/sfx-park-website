<template>
  <div ref="wavesurferMain" style="width: 100%; height: 48px"></div>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  peaksData: {
    type: String,
    default: null,
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue", "duration", "timeupdate"]);

const waveSurfer = ref(null);
const wavesurferMain = ref(null);
let hasJustFinished = false;

const options = {
  height: 48,
  progressColor: "#26a69a",
  waveColor: "#e7e7e7",
  cursorColor: "#999",
  barWidth: 2,
};

onMounted(async () => {
  const WaveSurfer = (await import("wavesurfer.js")).default;

  const wsOptions = Object.assign(
    {
      container: wavesurferMain.value,
    },
    options
  );

  waveSurfer.value = WaveSurfer.create(wsOptions);
  if (props.peaksData) {
    fetch(props.peaksData)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error " + response.status);
        }
        return response.json();
      })
      .then((peaks) => {
        waveSurfer.value.load(props.src, peaks.data);
      })
      .catch((e) => {
        console.error("error", e);
      });
  } else {
    waveSurfer.value.load(props.src);
  }

  waveSurfer.value.on("finish", () => {
    hasJustFinished = true;
    emit("update:modelValue", false);
  });

  waveSurfer.value.on("ready", (duration) => {
    emit("duration", Math.floor(duration));
    if (props.modelValue) {
      waveSurfer.value.play();
    }
  });

  waveSurfer.value.on("timeupdate", (time) => {
    emit("timeupdate", Math.floor(time));
  });
});

watchEffect(() => {
  if (waveSurfer.value) {
    if (props.modelValue) {
      waveSurfer.value.play();
    } else if (hasJustFinished) {
      hasJustFinished = false;
    } else {
      waveSurfer.value.pause();
    }
  }
});

onUnmounted(() => {
  waveSurfer.value.destroy();
});

defineExpose({
  waveSurfer,
});
</script>

<style lang="css" scoped>
div {
  position: relative;
}
</style>
