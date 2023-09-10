<template>
  <div class="my-body">
    <MyDynamicHeader />
    <div>
      <slot />
    </div>
    <footer class="my-footer text-grey-4 bg-dark q-pa-lg">
      <p class="text-center q-mb-none"></p>
    </footer>
  </div>
</template>

<style scoped>
.my-body {
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
