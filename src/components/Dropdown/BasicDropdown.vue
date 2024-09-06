<template>
  <div class="basic-dropdown" ref="dropdownDom">
    <BasicButton @click="handleClick">
      <slot name="trigger" />
    </BasicButton>
    <BasicDropdownMenu v-model:show="showContextMenu" :position="contextMenuPosition">
      <slot name="menu" />
    </BasicDropdownMenu>
  </div>
</template>

<script lang="ts" setup>
import { type Ref, ref } from 'vue'
import BasicButton from '@/components/Button/BasicButton.vue'
import BasicDropdownMenu from '@/components/Dropdown/BasicDropdownMenu.vue'

interface IPosition {
  top: number
  left: number
}

const dropdownDom: Ref<HTMLInputElement | null> = ref(null)
const showContextMenu: Ref<boolean> = ref(false)
const contextMenuPosition: Ref<IPosition> = ref({ top: 0, left: 0 })

const handleClick = () => {
  showContextMenu.value = true
  const rect = dropdownDom.value?.getBoundingClientRect() as DOMRect
  contextMenuPosition.value = { left: rect.left, top: rect.bottom }
}
</script>

<style lang="scss" scoped>
.basic-dropdown {
  display: inline-block;
}
.basic-dropdown-menu {
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
