<template>
  <div class="login">
    <div class="container-top">
      <div class="title">
        <img src="../../assets/image/logo.png" alt="" />
        <span>管理系统</span>
      </div>
    </div>
    <div class="container-bottom">
      <LoginForm />
    </div>
  </div>
</template>
<script setup lang="ts">
import LoginForm from './LoginForm.vue'
</script>
<style scoped lang="scss">
.login {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #293146;
  .container-top {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      padding: 0 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      img {
        width: 32px;
        height: 32px;
      }
      span {
        font-size: 18px;
        color: #fff;
      }
    }
  }
  .container-bottom {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
