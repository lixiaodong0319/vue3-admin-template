<template>
  <div class="allFiles">全部文件</div>
  <div class="table-container">
    <BasicTable
      ref="basicTableRef"
      :data="data"
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
        <HeaderCellSelected :selections="selections" :basicTableRef="basicTableRef" />
      </template>
      <template #bodyCell="{ column, record }">
        <BodyCell
          v-if="column.key === 'filename'"
          :column="column"
          :record="record"
          :mouseEnterRecordId="mouseEnterRecordId"
        />
      </template>
    </BasicTable>
  </div>
  <ContextMenu ref="contextMenuRef" />
</template>

<script setup lang="ts" name="allFiles">
import { ref } from 'vue'
import BasicTable from '@/components/Table/BasicTable.vue'
import HeaderCellSelected from './HeaderCellSelected.vue'
import ContextMenu from './ContextMenu.vue'
import BodyCell from './BodyCell.vue'
import { columns, tableData } from './constant'

const data = ref(tableData)

const selections = ref([])
const basicTableRef: any = ref(null)

// 多选框改变
const handleSelectionChange = (val) => {
  selections.value = val
}

const mouseEnterRecordId: any = ref(null)
// 鼠标移入
const handleCellMouseEnter = (record, column, cell, e) => {
  mouseEnterRecordId.value = record.id
}

// 鼠标移出
const handleCellMouseLeave = (record, column, cell, e) => {
  mouseEnterRecordId.value = null
}

// 右键菜单
const contextMenuRef: any = ref(null)
const handleRowRightClick = (record, recordIndex, e) => {
  contextMenuRef.value.handleRowRightClick(record, recordIndex, e)
}
</script>

<style lang="scss" scoped>
.table-container {
  width: 780px;
  box-sizing: border-box;
  padding: 0 20px 16px 20px;
  :deep(.basic-table) {
    table {
      thead {
        tr {
          th {
            &.selection-cell {
              padding-right: 0;
            }
          }
        }
      }
      tbody {
        tr {
          td {
            &.selection-cell {
              padding-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
