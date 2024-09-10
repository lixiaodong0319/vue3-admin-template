<template>
  <button ref="buttonRef" :class="classs" @click="handleClick">
    <template v-if="loading">
      <i class="basic-icon-loading"></i>
    </template>
    <template v-if="!loading && icon">
      <i :class="icon"></i>
    </template>
    <template v-if="!loading && $slots.icon">
      <span class="img-slot">
        <slot name="icon"></slot>
      </span>
    </template>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script lang="ts" setup>
import { computed, PropType, ref } from 'vue'

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

const buttonRef = ref(null)

const handleClick = (e) => {
  emit('click', e)
}

defineExpose({
  ref: buttonRef
})
</script>

<style lang="scss" scoped>
.basic-button {
  box-sizing: border-box;
  display: inline-block;
  height: 32px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  user-select: none;
  padding: 5px 12px;
  border-radius: 4px;
  cursor: pointer;
  vertical-align: middle;

  & [class*='basic-icon-'] {
    display: inline-block;
    vertical-align: middle;
    & + span {
      margin-left: 8px;
    }
  }

  .img-slot {
    display: inline-block;
    vertical-align: middle;
    width: 16px;
    height: 16px;
    img {
      width: 100%;
      height: 100%;
    }
    & + span {
      margin-left: 5px;
      vertical-align: middle;
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
    border: 1px solid rgba(0, 0, 0, 0.15);
    &:hover {
      background-color: rgba(0, 0, 0, 0.06);
    }
    &:active {
      background-color: rgba(0, 0, 0, 0.1);
    }
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
    color: #3491fa;
    background-color: transparent;
    border-color: transparent;
    &:hover {
      color: #57a9fb;
    }
    &:active {
      color: #206ccf;
    }
  }
}
</style>
