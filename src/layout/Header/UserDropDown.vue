<template>
  <div class="user-dropdown-container">
    <el-dropdown>
      <span class="el-dropdown-link">
        <img class="avatar" src="/src/assets/image/avatar.png" alt="" />
        管理员<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item @click="confirmLoginOut">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()

const confirmLoginOut = () => {
  userStore.confirmLoginOut()
}
</script>
<style lang="scss">
.user-dropdown-container {
  height: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  .el-dropdown-link {
    display: flex;
    align-items: center;
    gap: 8px;
    .avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
  }
}
</style>
