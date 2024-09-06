<template>
  <teleport to="body">
    <ul
      ref="dropdownMenuDom"
      class="basic-dropdown-menu"
      v-if="show"
      :style="dropdownStyles"
      tabindex="0"
      @blur="handleBlur"
    >
      <slot />
    </ul>
  </teleport>
</template>

<script lang="ts" setup>
import { watchPostEffect } from 'vue'
import { usePosition } from './usePosition'

const props = defineProps({
  show: { type: Boolean },
  position: { type: Object }
})

const emit = defineEmits(['update:show'])

// 下拉列表弹出位置
const { dropdownStyles, dropdownMenuDom } = usePosition(props)

watchPostEffect(() => {
  props.show && dropdownMenuDom.value.focus()
})

// 下拉菜单失焦隐藏
const handleBlur = () => {
  emit('update:show', false)
}
</script>

<style scoped lang="scss">
.basic-dropdown-menu {
  background-color: #fff;
  border: 1px solid #e4e7ed;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px 0;
  &:focus {
    outline: none;
  }
}
</style>
