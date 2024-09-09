<template>
  <li class="basic-dropdown-item">
    <slot />
  </li>
</template>

<script setup></script>

<style scoped lang="scss">
.basic-dropdown-item {
  padding: 3px 8px;
  text-decoration: none;
  color: #606266;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
