<template>
  <div class="logo">
    <img src="../../assets/image/logo.png" alt="" />
    <div class="title"></div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss">
.logo {
  padding: 10px 4px 10px 10px;
  display: flex;
  img {
    width: 32px;
    height: 32px;
  }
  .title {
    margin-left: 10px;
    font-size: 16px;
    color: #fff;
    display: flex;
    align-items: center;
  }
}
</style>
