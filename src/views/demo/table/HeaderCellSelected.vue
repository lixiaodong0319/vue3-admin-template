<template>
  <div class="select-options">
    <span class="selected-num">已选 {{ selections.length }} 项</span>
    <BasicButton class="button-size" type="text" @click="handleCancel">取消选择</BasicButton>
    <BasicButtonGroup>
      <BasicButton class="button-size"
        ><template #icon><img :src="DownloadSvg" /></template>下载</BasicButton
      >
      <BasicButton class="button-size"
        ><template #icon><img :src="DeleteSvg" /></template>删除</BasicButton
      >
      <BasicButton ref="moreBtnDom" class="button-size" @click="handleMoreClick"
        ><template #icon><img :src="MoreSvg" /></template
      ></BasicButton>
    </BasicButtonGroup>
    <BasicDropdownMenu v-model:show="showMoreMenu" :position="moreMenuPosition">
      <BasicDropdownItem>
        <div class="dropdown-item"><img :src="CopySvg" alt="" />复制到</div></BasicDropdownItem
      >
      <BasicDropdownItem
        ><div class="dropdown-item"><img :src="MoveSvg" alt="" />移动到</div></BasicDropdownItem
      >
      <BasicDropdownItem
        ><div class="dropdown-item">
          <img :src="RenameSvg" alt="" />批量重命名
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
import DownloadSvg from '@/assets/svg/yuntun/menu/menu_ic_download.svg'
import MoreSvg from '@/assets/svg/yuntun/download_list_ic_more.svg'
import DeleteSvg from '@/assets/svg/yuntun/download_list_ic_delete.svg'
import CopySvg from '@/assets/svg/yuntun/menu/menu_ic_copy.svg'
import MoveSvg from '@/assets/svg/yuntun/menu/menu_ic_move.svg'
import RenameSvg from '@/assets/svg/yuntun/menu/menu_ic_rename.svg'

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
  .basic-button {
    padding: 5px 12px;
    min-height: 32px;
  }
  .basic-button-group {
    margin-left: 4px;
    & > .basic-button {
      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: 16px;
        background-color: rgba(0, 0, 0, 0.1);
      }
      &:last-child {
        &::after {
          content: '';
          display: none;
        }
      }
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
