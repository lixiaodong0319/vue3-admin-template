<template>
  <div class="basic-button-group">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineOptions } from 'vue'

defineOptions({ name: 'BasicButtonGroup' })
</script>

<style lang="scss" scoped>
.basic-button-group {
  display: inline-block;
  & > :deep(.basic-button) {
    border-left: none;
    border-right: none;
    border-radius: 0;
    position: relative;
    &:first-child {
      border-left: 1px solid rgba(0, 0, 0, 0.1);
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-child {
      border-right: 1px solid rgba(0, 0, 0, 0.1);
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
}
</style>
