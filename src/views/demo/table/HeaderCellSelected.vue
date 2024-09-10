<template>
  <div class="select-options">
    <span class="selected-num">已选 {{ selections.length }} 项</span>
    <BasicButton type="text" @click="handleCancel">取消选择</BasicButton>
    <BasicButtonGroup>
      <BasicButton
        ><template #icon><BasicSvgIcon iconClass="menu_ic_download"></BasicSvgIcon></template
        >下载</BasicButton
      >
      <BasicButton
        ><template #icon
          ><BasicSvgIcon
            iconClass="download_list_ic_delete"
            className="delete"
          ></BasicSvgIcon></template
        >删除</BasicButton
      >
      <BasicButton ref="moreBtnDom" @click="handleMoreClick"
        ><template #icon><BasicSvgIcon iconClass="download_list_ic_more"></BasicSvgIcon></template
      ></BasicButton>
    </BasicButtonGroup>
    <BasicDropdownMenu v-model:show="showMoreMenu" :position="moreMenuPosition">
      <BasicDropdownItem>
        <div class="dropdown-item">
          <BasicSvgIcon iconClass="menu_ic_copy"></BasicSvgIcon>复制到
        </div></BasicDropdownItem
      >
      <BasicDropdownItem
        ><div class="dropdown-item">
          <BasicSvgIcon iconClass="menu_ic_move"></BasicSvgIcon>移动到
        </div></BasicDropdownItem
      >
      <BasicDropdownItem
        ><div class="dropdown-item">
          <BasicSvgIcon iconClass="menu_ic_rename"></BasicSvgIcon>批量重命名
        </div></BasicDropdownItem
      >
    </BasicDropdownMenu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import BasicButtonGroup from '@/components/Button/BasicButtonGroup.vue'
import BasicButton from '@/components/Button/BasicButton.vue'
import BasicDropdownMenu from '@/components/Dropdown/BasicDropdownMenu.vue'
import BasicDropdownItem from '@/components/Dropdown/BasicDropdownItem.vue'
import BasicSvgIcon from '@/components/Icon/BasicSvgIcon.vue'

const props = defineProps({
  selections: { type: Array as any },
  basicTableRef: { type: Object as any }
})

const showMoreMenu = ref(false)
const moreMenuPosition: any = ref({ top: 0, left: 0 })
const moreBtnDom: any = ref(null)

const handleCancel = () => {
  props.basicTableRef.selectionNone()
}

const handleMoreClick = () => {
  showMoreMenu.value = true
  const rect = moreBtnDom.value?.ref?.getBoundingClientRect()
  moreMenuPosition.value = { left: rect.left, top: rect.bottom }
}
</script>
<style lang="scss" scoped>
.select-options {
  display: flex;
  align-items: center;
  margin: -5px 0;
  .selected-num {
    padding-right: 12px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }
  .basic-button-group {
    margin-left: 4px;
    .delete {
      color: rgba(0, 0, 0, 0.6);
    }
  }
}
.dropdown-item {
  width: 172px;
  display: flex;
  gap: 8px;
  align-items: center;
}
</style>
