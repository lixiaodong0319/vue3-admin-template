<template>
  <div class="basic-checkbox">
    <span :class="classs">
      <span class="checkbox__inner" @click="handleClick"></span>
      <input
        ref="checkboxDom"
        type="checkbox"
        v-model="model"
        :checked="isChecked"
        @change="handleChange"
        :name="name"
        :disabled="disabled"
        :indeterminate="indeterminate"
        :value="label"
      />
    </span>
    <span class="checkbox__label">
      <slot v-if="$slots.default">{{ label }}</slot>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, defineOptions, computed, ref, type Ref } from 'vue'
import { useCheckbox } from './useCheckbox'

defineOptions({ name: 'BasicCheckbox' })

const props = defineProps({
  name: String,
  indeterminate: Boolean,
  checked: Boolean,
  disabled: Boolean,
  label: [String, Number, Boolean, Object],
  modelValue: [String, Number, Boolean]
})

const emits = defineEmits(['update:modelValue', 'change'])

const { model, isChecked, checkboxDom, handleChange, handleClick } = useCheckbox(props)

const classs = computed(() => {
  return [
    'checkbox__input',
    {
      'is-checked': isChecked.value,
      'is-indeterminate': props.indeterminate
    }
  ]
})
</script>

<style lang="scss" scoped>
.basic-checkbox {
  .checkbox__input {
    display: inline-block;
    .checkbox__inner {
      display: inline-block;
      vertical-align: middle;
      width: 16px;
      height: 16px;
      position: relative;
      border-radius: var(---2, 2px);
      border: 1px solid var(--15, rgba(0, 0, 0, 0.15));
      background: var(--normal-white, #fff);
      cursor: pointer;
      &::after {
      }
      &:hover {
        border: 1px solid var(--hover, #3491fa);
      }
      &.is-checked {
        background: var(--normal, #3491fa);
        border: 1px solid var(--hover, #3491fa);
        &::after {
        }
      }
    }
    &.is-checked {
      .checkbox__inner {
        background: var(--normal, #3491fa);
        border: 1px solid var(--hover, #3491fa);
        &::after {
          content: ' ';
          position: absolute;
          box-sizing: content-box;
          border: 2px solid transparent;
          border-left: 0;
          border-top: 0;
          width: 4px;
          height: 10px;
          left: 4px;
          top: 0px;
          border-color: #fff;
          transform: rotate(45deg) scaleY(1);
        }
      }
    }
    &.is-indeterminate {
      .checkbox__inner {
        background: var(---Blue-normal, #3491fa);
        border: 1px solid var(--hover, #3491fa);
        &::after {
          content: '';
          position: absolute;
          display: block;
          border-top: 4px solid #fff;
          transform: scale(0.7);
          left: 0;
          right: 0;
          top: 5px;
          border-color: #fff;
        }
      }
    }
    input {
      display: none;
    }
  }
}
</style>
