<template>
  <li class="basic-dropdown-item">
    <slot />
  </li>
</template>

<script setup></script>

<style scoped lang="scss">
.basic-dropdown-item {
  line-height: 36px;
  padding: 0 20px;
  text-decoration: none;
  color: #606266;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
}
</style>
