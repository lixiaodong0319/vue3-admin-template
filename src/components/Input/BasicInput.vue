<template>
  <div class="basic-input">
    <input
      class="basic-input__inner"
      :type="type"
      v-model="model"
      :placeholder="placeholder"
      :style="{ border: '1px solid blue' }"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  type: { type: String, default: 'text' },
  modelValue: { type: [String, Number] },
  placeholder: { type: String }
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
</script>

<style lang="scss" scoped>
.basic-input {
  display: inline-block;
  width: 180px;
  line-height: 40px;
  font-size: 14px;
  .basic-input__inner {
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    width: 100%;
  }
}
</style>
