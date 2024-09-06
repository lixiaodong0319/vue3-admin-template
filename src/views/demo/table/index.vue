<template>
  <div class="allFiles">全部文件</div>
  <BasicTable
    ref="basicTable"
    :data="tableData"
    :columns="columns"
    :showHeaderTitle="selections.length === 0"
    :rowSelection="{
      columnWidth: 50,
      onChange: handleSelectionChange
    }"
    :cellMouseEnter="handleCellMouseEnter"
    :cellMouseLeave="handleCellMouseLeave"
    :rowContextMenu="handleRowRightClick"
  >
    <template #headerCellSelected>
      <div>
        <span>已选{{ selections.length }}项</span> |
        <BasicButton class="button-size" type="text" @click="handleCancel">取消选择</BasicButton>
        <BasicButtonGroup>
          <BasicButton class="button-size"
            ><template #icon><img :src="DownloadSvg" /></template>下载</BasicButton
          >
          <BasicButton class="button-size" icon="basic-icon-delete">删除</BasicButton>
          <BasicDropdown>
            <template #trigger>
              <i class="basic-icon-more"></i>
            </template>

            <template #menu>
              <BasicDropdownItem>Item 1</BasicDropdownItem>
              <BasicDropdownItem>Item 2</BasicDropdownItem>
              <BasicDropdownItem>Item 3</BasicDropdownItem>
            </template>
          </BasicDropdown>
        </BasicButtonGroup>
      </div>
    </template>
    <template #bodyCell="{ column, record }">
      <div v-if="column.key === 'filename'" :style="{ position: 'relative' }">
        <img
          :src="typeImage[record.type]"
          alt=""
          :style="{ width: 20 + 'px', height: 20 + 'px' }"
        />
        <a v-if="record.filename !== editName" @click="handleFileClick(record)">{{
          record.filename
        }}</a>
        <span v-else>
          <BasicInput v-model="record.filename" :style="{ display: 'inline-block' }" />
        </span>
        <span
          v-if="record.filename === mouseEnterRecord"
          :style="{ position: 'absolute', right: 0, top: 0, zIndex: 10000 }"
        >
          <BasicButton class="button-size" icon="basic-icon-download"></BasicButton>
          <BasicButton
            class="button-size"
            icon="basic-icon-edit"
            @click="handleEdit(record)"
          ></BasicButton>
          <BasicButton class="button-size" icon="basic-icon-delete"></BasicButton>
        </span>
      </div>
    </template>
  </BasicTable>
  <BasicDropdownMenu v-model:show="showContextMenu" :position="contextMenuPosition">
    <BasicDropdownItem>Item 1</BasicDropdownItem>
    <BasicDropdownItem>Item 2</BasicDropdownItem>
    <BasicDropdownItem>Item 34</BasicDropdownItem>
  </BasicDropdownMenu>
</template>

<script setup lang="ts" name="allFiles">
import BasicTable from '@/components/Table/BasicTable.vue'
import { ref } from 'vue'
import BasicButtonGroup from '@/components/Button/BasicButtonGroup.vue'
import BasicButton from '@/components/Button/BasicButton.vue'
import BasicDropdown from '@/components/Dropdown/BasicDropdown.vue'
import BasicDropdownMenu from '@/components/Dropdown/BasicDropdownMenu.vue'
import BasicDropdownItem from '@/components/Dropdown/BasicDropdownItem.vue'
import BasicInput from '@/components/Input/BasicInput.vue'
import fileImage from '@/assets/image/file.png'
import videoImage from '@/assets/image/video.png'
import pdfImage from '@/assets/image/pdf.png'
import DownloadSvg from '@/assets/svg/菜单/menu_ic_download.svg'

const typeImage = {
  file: fileImage,
  video: videoImage,
  pdf: pdfImage
}

const tableData = ref([
  {
    filename: '我的资源',
    size: 9.8,
    updateTime: '2024-09-01 13:13',
    type: 'file',
    children: [
      {
        filename: '新建文件夹',
        size: 4.25,
        updateTime: '2024-09-01 13:13',
        type: 'file',
        children: []
      },
      {
        filename: '盗梦空间',
        size: 4.25,
        updateTime: '2024-09-01 13:13',
        type: 'video'
      }
    ]
  },
  {
    filename: '新建文件夹',
    size: 1.5,
    updateTime: '2024-09-01 13:13',
    type: 'file'
  },
  {
    filename: '我的转存',
    size: 4.25,
    updateTime: '2024-09-01 13:13',
    type: 'file'
  },
  {
    filename: '人工智能大模型',
    size: 4.25,
    updateTime: '2024-09-01 13:13',
    type: 'pdf'
  }
])

const columns: any = [
  {
    title: '文件名',
    key: 'filename',
    width: 500
  },
  {
    title: '大小',
    key: 'size',
    width: 200,
    sortable: true
  },
  {
    title: '修改时间',
    key: 'updateTime'
  }
]

const selections = ref([])
const basicTable: any = ref(null)

const handleSelectionChange = (val) => {
  selections.value = val
}

const handleCancel = () => {
  basicTable.value.selectionNone()
}

const handleCellInput = (val) => {}

const handleFileClick = (record) => {
  console.log(record, 'record========')
  tableData.value = record.children
}

const mouseEnterRecord: any = ref(null)
const handleCellMouseEnter = (record, column, cell, e) => {
  mouseEnterRecord.value = record.filename
}

const handleCellMouseLeave = (record, column, cell, e) => {
  mouseEnterRecord.value = null
}

const showContextMenu = ref(false)
const contextMenuPosition: any = ref({ top: 0, left: 0 })

const handleRowRightClick = (record, recordIndex, e) => {
  console.log(e, 'e================')
  showContextMenu.value = true
  contextMenuPosition.value = { left: e.x, top: e.y }
}

const editName = ref(false)
const handleEdit = (record) => {
  editName.value = record.filename
}
</script>

<style lang="scss" scoped>
.basic-table {
  :deep(.basic-table__row) {
    &:hover {
      background: rgba(0, 0, 0, 0.06);
      border-radius: 8px;
    }
  }
}
</style>
