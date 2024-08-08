<template>
  <div class="login-container">
    <h3 class="login-name">登录</h3>
    <div class="login-form">
      <el-form :model="formData" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input size="large" v-model="formData.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            size="large"
            v-model="formData.password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="large" class="login-btn" type="primary" @click="handleLogin"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const formData = reactive({
  username: 'vben',
  password: '123456'
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
.login-container {
  width: 450px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  border-radius: 5px;
  .login-name {
    height: 40px;
    font-size: 28px;
    line-height: 40px;
    text-align: center;
    color: #000;
    font-weight: 600;
  }
  .login-form {
    v-deep .el-input__wrapper {
      height: 40px;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
