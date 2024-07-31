<template>
  <div class="header-container">
    <div></div>
    <UserDropDown />
  </div>
</template>
<script setup lang="ts">
import UserDropDown from './UserDropDown.vue'
</script>
<style scoped lang="scss">
.header-container {
  height: 48px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}
</style>
