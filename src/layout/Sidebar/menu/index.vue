<template>
  <div class="menu">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
    >
      <SubMenu :subMenu="getMenus()" />
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import SubMenu from './SubMenu.vue'
import { getMenus } from '@/router/menus'
</script>
<style lang="scss">
.menu {
  height: 100%;
  .el-menu {
    border: 1px solid #001529;
  }
}
</style>
