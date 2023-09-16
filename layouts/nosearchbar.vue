<template>
  <div class="my-body">
    <div>
      <QExpansionItem
        v-if="$q.screen.xs"
        ref="panel"
        expand-icon-toggle
        class="bg-dark text-white q-py-md q-px-lg justify-between"
      >
        <template #header>
          <NuxtLink to="/" class="text-h6 text-white q-mr-sm" style="text-decoration: none">
            <em>SFX Park</em>
          </NuxtLink>
        </template>
        <DynamicHeaderButton @click="handleHidePanel" />
      </QExpansionItem>

      <QToolbar v-else class="my-big-toolbar bg-dark text-white q-py-md q-px-lg justify-between">
        <NuxtLink to="/" class="text-h6 text-white" style="text-decoration: none">
          <em>SFX Park</em>
        </NuxtLink>
        <DynamicHeaderButton />
      </QToolbar>
    </div>

    <div>
      <slot />
    </div>
    <footer class="my-footer text-grey-4 text-center bg-dark q-pa-lg">
      <p class="q-mb-none">© Alexander Teder</p>
      <p class="q-mb-none">
        Visit my GitHub page:
        <a href="https://github.com/teder-kedr" target="_blank" rel="noopener noreferrer">
          https://github.com/teder-kedr
        </a>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
interface PanelRef {
  hide: () => void;
}

const panel: Ref<PanelRef | null> = ref(null);

function handleHidePanel() {
  if (panel.value) {
    panel.value.hide();
  }
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
a,
a:visited {
  color: inherit;
}
</style>
