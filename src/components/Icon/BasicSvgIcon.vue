<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  iconClass: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: () => ''
  }
})

const iconName = computed(() => {
  return `#icon-${props.iconClass}`
})
const svgClass = computed(() => {
  return props.className ? `basic-svg-icon ${props.className}` : 'basic-svg-icon'
})
</script>
<style scoped lang="scss">
.basic-svg-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}
</style>
