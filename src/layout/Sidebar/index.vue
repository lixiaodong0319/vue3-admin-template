<template>
  <div class="sidebar">
    <div class="logo-container">
      <Logo />
    </div>
    <div class="menu-container">
      <Menu />
    </div>
  </div>
</template>
<script setup lang="ts">
import Logo from './Logo.vue'
import Menu from './menu/index.vue'
</script>
<style lang="scss">
.sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #001529;
  .logo-container {
    height: 48px;
  }
  .menu-container {
    height: calc(100vh - 48px);
    overflow: auto;
  }
}
</style>
