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
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow:
    0px 3px 14px 2px rgba(0, 0, 0, 0.05),
    0px 8px 10px 1px rgba(0, 0, 0, 0.06),
    0px 5px 5px -3px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    outline: none;
  }
}
</style>
