<template>
  <div class="app-main-container">
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
<style scoped lang="scss">
.app-main-container {
  height: calc(100vh - 48px);
  overflow: auto;
}
</style>
