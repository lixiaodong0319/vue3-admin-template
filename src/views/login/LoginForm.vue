<template>
  <div class="login-form">
    <h3>登录</h3>
    <el-form :model="formData" :rules="rules" ref="loginForm" label-width="80px" class="login-form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const formData = reactive({
  username: '',
  password: ''
})
const loginForm = ref()

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

/**
 * 登录
 */
const handleLogin = () => {
  loginForm.value.validate(async (valid) => {
    if (valid) {
      try {
        const userInfo = await userStore.login({
          username: formData.username,
          password: formData.password
        })
        if (userInfo) {
          ElMessage.success('登录成功')
        }
      } catch (error) {
        console.log(error)
      } finally {
      }
    }
  })
}
</script>
<style lang="scss" scoped>
.login-form {
}
</style>
