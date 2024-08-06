<template>
  <div class="login">
    <div class="container-left">
      <div class="title"></div>
      <div class="image"></div>
      <div class="discription"></div>
    </div>
    <div class="container-right">
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
  .container-left {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .container-right {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
