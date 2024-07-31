<template>
  <div v-for="(item, index) in subMenu" :key="index">
    <el-sub-menu :index="item.path" v-if="item.children">
      <template #title>
        <el-icon><Menu /></el-icon>
        <span>{{ item.name }}</span>
      </template>
      <SubMenu :subMenu="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.path">{{ item.name }}</el-menu-item>
  </div>
</template>
<script setup lang="ts">
import type { Menu } from '@/router/types'
import { PropType } from 'vue'
defineOptions({ name: 'SubMenu' })
const props = defineProps({
  subMenu: { type: Array as PropType<Menu[]>, default: () => [] }
})
console.log(props.subMenu)
</script>
<style lang="scss"></style>
