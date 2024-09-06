<template>
  <div class="allFiles">全部文件</div>
  <div class="table-container">
    <BasicTable
      ref="basicTable"
      :data="tableData"
      :columns="columns"
      :showHeaderTitle="selections.length === 0"
      :rowSelection="{
        columnWidth: 16,
        onChange: handleSelectionChange
      }"
      :cellMouseEnter="handleCellMouseEnter"
      :cellMouseLeave="handleCellMouseLeave"
      :rowContextMenu="handleRowRightClick"
    >
      <template #headerCellSelected>
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
            <BasicDropdownItem>Item 1</BasicDropdownItem>
            <BasicDropdownItem>Item 2</BasicDropdownItem>
            <BasicDropdownItem>Item 3</BasicDropdownItem>
          </BasicDropdownMenu>
        </div>
      </template>
      <template #bodyCell="{ column, record }">
        <div v-if="column.key === 'filename'" :style="{ position: 'relative' }">
          <img
            :src="typeImage[record.type]"
            alt=""
            :style="{ width: 20 + 'px', height: 20 + 'px', verticalAlign: 'middle' }"
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
  </div>
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
import BasicDropdownMenu from '@/components/Dropdown/BasicDropdownMenu.vue'
import BasicDropdownItem from '@/components/Dropdown/BasicDropdownItem.vue'
import BasicInput from '@/components/Input/BasicInput.vue'
import DownloadSvg from '@/assets/svg/yuntun/menu/menu_ic_download.svg'
import MoreSvg from '@/assets/svg/yuntun/download_list_ic_more.svg'
import DeleteSvg from '@/assets/svg/yuntun/download_list_ic_delete.svg'

import FolderSvg from '@/assets/svg/yuntun/fileType/download_list_file_folder.svg'
import PdfSvg from '@/assets/svg/yuntun/fileType/download_list_file_pdf.svg'
import VideoSvg from '@/assets/svg/yuntun/fileType/download_list_file_video.svg'

const typeImage = {
  file: FolderSvg,
  video: VideoSvg,
  pdf: PdfSvg
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
    title: '文件名称',
    key: 'filename'
  },
  {
    title: '大小',
    key: 'size',
    width: 88,
    sortable: true
  },
  {
    title: '修改时间',
    width: 150,
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

const showMoreMenu = ref(false)
const moreMenuPosition: any = ref({ top: 0, left: 0 })
const moreBtnDom: any = ref(null)

const handleMoreClick = () => {
  showMoreMenu.value = true
  const rect = moreBtnDom.value?.ref?.getBoundingClientRect()
  moreMenuPosition.value = { left: rect.left, top: rect.bottom }
}
</script>

<style lang="scss" scoped>
.table-container {
  width: 780px;
  box-sizing: border-box;
  padding: 0 20px 16px 20px;
  border: 1px solid red;
  :deep(.basic-table) {
    table {
      thead {
        tr {
          th {
            height: 22px;
            line-height: 22px;
            padding: 9px 12px;
            color: var(--60, rgba(0, 0, 0, 0.6));
            font-family: 'Microsoft YaHei UI';
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            &.selection-cell {
              padding-right: 0;
            }
            .basic-checkbox {
              .checkbox__inner {
                vertical-align: text-bottom;
              }
            }
          }
        }
      }
      tbody {
        tr {
          &:hover {
            background: rgba(0, 0, 0, 0.06);
            border-radius: 8px;
          }
          td {
            height: 32px;
            line-height: 32px;
            padding: 10px 12px;
            color: rgba(0, 0, 0, 0.6);
            &.selection-cell {
              padding-right: 0;
            }
          }
        }
      }
    }
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
  }
}
</style>
