<template>
  <div class="basic-input">
    <input
      ref="inputRef"
      class="basic-input__inner"
      :type="type"
      v-model="model"
      :placeholder="placeholder"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, type Ref } from 'vue'

const props = defineProps({
  type: { type: String, default: 'text' },
  modelValue: { type: [String, Number] },
  placeholder: { type: String }
})

const emit = defineEmits(['update:modelValue', 'blur'])

const inputRef: Ref<HTMLInputElement | null> = ref(null)

const model = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

const onFocus = () => {}

const onBlur = () => {
  emit('blur')
}

defineExpose({
  ref: inputRef
})
</script>

<style lang="scss" scoped>
.basic-input {
  display: inline-block;
  font-size: 14px;
  display: flex;
  align-items: center;
  .basic-input__inner {
    width: 160px;
    height: 32px;
    padding: 5px 8px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #206ccf;
    color: #606266;
    display: inline-block;
    width: 100%;
    height: 100%;
    outline: none;
  }
}
</style>
