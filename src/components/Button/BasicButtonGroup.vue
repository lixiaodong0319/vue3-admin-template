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
  border-radius: 4px;
  & > :deep(.basic-button) {
    border-left: none !important;
    border-right: none !important;
    border-radius: 0;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 16px;
      background-color: rgba(0, 0, 0, 0.15);
    }
    &:first-child {
      border-left: 1px solid rgba(0, 0, 0, 0.15) !important;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-child {
      border-right: 1px solid rgba(0, 0, 0, 0.15) !important;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      &::after {
        content: '';
        display: none;
      }
    }
  }
}
</style>
