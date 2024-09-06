<template>
  <div class="page-wrapper">
    <header v-if="showHeader">
      <slot name="header"></slot>
    </header>
    <section>
      <el-card v-if="showCard">
        <slot></slot>
      </el-card>
      <slot v-else></slot>
    </section>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
<script setup lang="ts">
defineProps({
  showHeader: { type: Boolean, default: false },
  showCard: { type: Boolean, default: false }
})
</script>
<style scoped lang="scss">
.page-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  header {
    padding: 15px;
  }
  section {
    flex: 1;
    padding: 10px;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    .el-card {
      flex: 1;
    }
  }
}
</style>
