<template>
  <MainHero />
  <div class="my-container q-mx-auto q-px-lg">
    <h3 class="text-h6">Popular sounds:</h3>
    <SoundList />
    <div class="row justify-center">
      <QBtn flat rounded class="text-grey-9" to="/sounds">
        <QIcon name="add" class="q-mr-xs" />
        Show all sounds
      </QBtn>
    </div>
    <h3 class="text-h6">Popular tags:</h3>
    <TagsList />
  </div>
</template>

<style scoped>
.my-container {
  max-width: 800px;
}
</style>
