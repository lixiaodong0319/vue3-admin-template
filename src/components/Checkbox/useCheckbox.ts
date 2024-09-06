import {
  computed,
  getCurrentInstance,
  inject,
  type ComponentInternalInstance,
  type Ref,
  ref
} from 'vue'

interface ICheckboxProps {
  name?: string // 原生的name
  indeterminate?: boolean // 是否半选
  checked?: boolean // 是否选中
  disabled?: boolean // 是否禁用
  label?: string | number | boolean // 目前没有 group中使用
  modelValue?: string | number | boolean // 绑定checkbox的值
}

const useCheckboxGroup = () => {
  const checkboxGroup = inject('BasicCheckboxGroup', {}) as any
  const isGroup = checkboxGroup.name === 'BasicCheckboxGroup'
  return {
    isGroup,
    checkboxGroup
  }
}

const useModel = (props: ICheckboxProps) => {
  const { emit } = getCurrentInstance() as ComponentInternalInstance
  const { isGroup, checkboxGroup } = useCheckboxGroup()
  const store = computed(() => (checkboxGroup ? checkboxGroup.modelValue?.value : props.modelValue))
  const model = computed({
    get() {
      return isGroup ? store.value : props.modelValue
    },
    set(val) {
      if (isGroup) {
        return checkboxGroup.changeEvent(val)
      }

      emit('update:modelValue', val)
    }
  })
  return model
}

const useCheckboxStatus = (props: ICheckboxProps, model) => {
  const isChecked = computed(() => {
    const value = model.value
    if (Array.isArray(value)) {
      return value.includes(props.label)
    } else {
      return value
    }
  })
  return isChecked
}

const useEvent = () => {
  const { emit } = getCurrentInstance() as any
  const handleChange = (e: InputEvent) => {
    const target = e.target as HTMLInputElement
    emit('change', target.checked)
  }
  return handleChange
}

const useClick = () => {
  const checkboxDom: Ref<HTMLInputElement | null> = ref(null)
  const handleClick = () => {
    checkboxDom.value?.click()
  }
  return {
    checkboxDom,
    handleClick
  }
}

export const useCheckbox = (props) => {
  let model = useModel(props)

  const isChecked = useCheckboxStatus(props, model)

  const handleChange = useEvent()

  // span点击触发input事件
  const { checkboxDom, handleClick } = useClick()

  return {
    model,
    isChecked,
    checkboxDom,
    handleChange,
    handleClick
  }
}
