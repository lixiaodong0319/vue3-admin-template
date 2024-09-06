import { computed, watch, ref } from 'vue'

export const useCheckbox = (props) => {
  // 是否全选
  const checkedAll = ref(false)
  // 多选框组选中内容布尔
  const checkedListBoolean = ref(new Array(props.data.length).fill(false))
  // 是否半选
  const indeterminate = ref(false)
  // 多选框组选中内容
  const checkedList = computed(() => {
    return props.data.filter((item, index) => checkedListBoolean.value[index])
  })

  // 监听多选框改变
  watch(checkedList, () => {
    if (checkedList.value.length === 0) {
      indeterminate.value = false
      checkedAll.value = false
    } else if (checkedList.value.length > 0 && checkedList.value.length < props.data.length) {
      indeterminate.value = true
      checkedAll.value = false
    } else if (checkedList.value.length === props.data.length) {
      indeterminate.value = false
      checkedAll.value = true
    }
  })

  // 全选改变
  const handleChangeCheckedAll = (val) => {
    checkedListBoolean.value = checkedListBoolean.value.map(() => val)
    selectionChange(checkedList.value)
  }

  // 多选框组单个改变
  const handleChangeChecked = () => {
    selectionChange(checkedList.value)
  }

  // 触发父组件change事件
  const selectionChange = (val) => {
    props.rowSelection.onChange(val)
  }

  // 勾选全部
  const selectionAll = () => {
    checkedListBoolean.value = checkedListBoolean.value.map(() => true)
    selectionChange(checkedList.value)
  }

  // 取消所所有勾选
  const selectionNone = () => {
    checkedListBoolean.value = checkedListBoolean.value.map(() => false)
    selectionChange(checkedList.value)
  }

  // 多选框宽度
  const selectionWidth = computed(() => {
    if (props.rowSelection.columnWidth) {
      return { width: props.rowSelection.columnWidth + 'px' }
    }
  })

  return {
    checkedAll,
    checkedList,
    checkedListBoolean,
    indeterminate,
    selectionWidth,
    handleChangeCheckedAll,
    handleChangeChecked,
    selectionAll,
    selectionNone
  }
}
