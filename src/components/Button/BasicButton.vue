<template>
  <button :class="classs" @click="handleClick">
    <template v-if="loading">
      <i class="basic-icon-loading"></i>
    </template>
    <template v-if="!loading && icon">
      <i :class="icon"></i>
    </template>
    <template v-if="!loading && $slots.icon">
      <slot name="icon"></slot>
    </template>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'

type IButtonType =
  | 'default'
  | 'primary'
  | 'warning'
  | 'danger'
  | 'default'
  | 'info'
  | 'success'
  | 'text'

defineOptions({ name: 'BasicButton' })

const props = defineProps({
  type: {
    type: String as PropType<IButtonType>,
    default: 'default',
    vaildator: (val: string) => {
      return [
        'default',
        'primary',
        'warning',
        'danger',
        'default',
        'info',
        'success',
        'text'
      ].includes(val)
    }
  },
  icon: {
    type: String,
    default: ''
  },
  disabeld: Boolean,
  loading: Boolean,
  round: Boolean
})

const emit = defineEmits(['click'])

const classs = computed(() => [
  'basic-button',
  'basic-button--' + props.type,
  {
    'is-disabled': props.disabeld,
    'is-loading': props.loading,
    'is-round': props.round
  }
])
const handleClick = (e) => {
  emit('click', e)
}
</script>

<style lang="scss">
.basic-button {
  display: inline-block;
  min-height: 40px;
  outline: none;
  border: #817272;
  user-select: none;
  padding: 0 15px;
  border-radius: 4px;
  vertical-align: middle;
  cursor: pointer;

  & [class*='basic-icon-'] {
    vertical-align: middle;
    & + span {
      margin-left: 5px;
    }
  }

  &.is-disabled {
    cursor: not-allowed;
  }

  &.is-loading {
    pointer-events: none;
  }

  &.is-round {
    border-radius: 20px;
  }

  &.basic-button--default {
    color: rgba(0, 0, 0, 0.9);
    background-color: transparent;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  &.basic-button--primary {
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }

  &.basic-button--success {
    color: #fff;
    background-color: #67c23a;
    border-color: #67c23a;
  }

  &.basic-button--info {
    color: #fff;
    background-color: #909399;
    border-color: #909399;
  }

  &.basic-button--danger {
    color: #fff;
    background-color: #f56c6c;
    border-color: #f56c6c;
  }

  &.basic-button--warning {
    color: #fff;
    background-color: #e6a23c;
    border-color: #e6a23c;
  }

  &.basic-button--text {
    color: #409eff;
    background-color: transparent;
    border-color: transparent;
  }

  img {
    width: 14px;
    height: 14px;
    vertical-align: middle;
    & + span {
      margin-left: 5px;
    }
  }
}
</style>
