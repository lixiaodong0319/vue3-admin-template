<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <Sidebar />
    </div>
    <div class="main-container">
      <Header />
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar/index.vue'
import Header from './Header/index.vue'
import AppMain from './AppMain/index.vue'
</script>

<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  .sidebar-container {
    width: 210px;
    height: 100%;
  }
  .main-container {
    flex: 1;
    height: 100%;
  }
}
</style>
