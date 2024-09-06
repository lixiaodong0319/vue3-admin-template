import { computed, type ComputedRef, type CSSProperties, ref, watchEffect } from 'vue'

export const usePosition = (props) => {
  const dropdownMenuDom: any = ref(null)

  const dropdownTop = ref(0)
  const dropdownLeft = ref(0)

  const dropdownStyles: ComputedRef<CSSProperties> = computed(() => {
    return {
      'z-index': 2000,
      position: 'absolute',
      top: dropdownTop.value + 'px',
      left: dropdownLeft.value + 'px'
    }
  })

  watchEffect(() => {
    dropdownTop.value = props.position.top
    dropdownLeft.value = props.position.left
  })

  return {
    dropdownStyles,
    dropdownMenuDom
  }
}
