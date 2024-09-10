<template>
  <BasicDropdownMenu v-model:show="showContextMenu" :position="contextMenuPosition">
    <BasicDropdownItem
      ><div class="dropdown-item">
        <img :src="DownloadSvg" alt="" />下载到本地
      </div></BasicDropdownItem
    >
    <span class="baseline"></span>
    <BasicDropdownItem
      ><div class="dropdown-item"><img :src="DeleteSvg" alt="" />删除</div></BasicDropdownItem
    >
    <BasicDropdownItem
      ><div class="dropdown-item"><img :src="RenameSvg" alt="" />重命名</div></BasicDropdownItem
    >
    <span class="baseline"></span>
    <BasicDropdownItem
      ><div class="dropdown-item"><img :src="MoveSvg" alt="" />移动到</div></BasicDropdownItem
    >
    <BasicDropdownItem
      ><div class="dropdown-item"><img :src="CopySvg" alt="" />复制到</div></BasicDropdownItem
    >
    <span class="baseline"></span>
    <BasicDropdownItem
      ><div class="dropdown-item"><img :src="ReportSvg" alt="" />举报与投诉</div></BasicDropdownItem
    >
  </BasicDropdownMenu>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import BasicDropdownMenu from '@/components/Dropdown/BasicDropdownMenu.vue'
import BasicDropdownItem from '@/components/Dropdown/BasicDropdownItem.vue'
import DownloadSvg from '@/assets/svg/yuntun/menu/menu_ic_download.svg'
import DeleteSvg from '@/assets/svg/yuntun/menu/download_list_ic_delete.svg'
import RenameSvg from '@/assets/svg/yuntun/menu/menu_ic_rename.svg'
import MoveSvg from '@/assets/svg/yuntun/menu/menu_ic_move.svg'
import CopySvg from '@/assets/svg/yuntun/menu/menu_ic_copy.svg'
import ReportSvg from '@/assets/svg/yuntun/menu/menu_ic_report.svg'

const showContextMenu = ref(false)
const contextMenuPosition: any = ref({ top: 0, left: 0 })

const handleRowRightClick = (record, recordIndex, e) => {
  showContextMenu.value = true
  contextMenuPosition.value = { left: e.x, top: e.y }
}

defineExpose({
  handleRowRightClick
})
</script>
<style lang="scss" scoped>
.dropdown-item {
  width: 172px;
  display: flex;
  gap: 8px;
  align-items: center;
}
.baseline {
  display: block;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 2px 8px;
}
</style>
