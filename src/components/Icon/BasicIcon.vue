<template>
  <i class="basic-icon" :style="style" v-bind="$attrs">
    <slot />
  </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'BasicIcon',
  inheritAttrs: false
})
const props = defineProps({
  size: {
    type: [Number, String]
  },
  color: {
    type: String
  }
})

const style = computed<CSSProperties>(() => {
  const { size, color } = props
  if (!size && !color) return {}

  return {
    fontSize: size,
    color: color
  }
})
</script>
