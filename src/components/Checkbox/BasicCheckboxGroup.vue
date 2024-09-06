<template>
  <div class="basic-checkbox-group">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits, defineOptions, computed, provide } from 'vue'

defineOptions({ name: 'BasicCheckboxGroup' })

const props = defineProps({ modelValue: Array })

const emit = defineEmits(['change', 'update:modelValue'])

const modelValue = computed(() => props.modelValue)
const changeEvent = (val) => {
  emit('change', val)
  emit('update:modelValue', val)
}
provide('BasicCheckboxGroup', {
  name: 'BasicCheckboxGroup',
  modelValue,
  changeEvent
})
</script>
