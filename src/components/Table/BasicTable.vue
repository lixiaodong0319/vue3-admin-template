<template>
  <div class="basic-table">
    <table>
      <thead>
        <tr>
          <th v-if="rowSelection" class="selection-cell" :style="selectionStyles">
            <BasicCheckbox
              v-model="checkedAll"
              :indeterminate="indeterminate"
              @change="handleChangeCheckedAll"
            ></BasicCheckbox>
          </th>
          <template v-if="showHeaderTitle">
            <template v-for="(column, columnIndex) in columns" :key="columnIndex">
              <th :style="{ width: column.width + 'px' }">
                <slot name="headerCell" v-bind="{ column }">{{ column.title }}</slot>
                <template v-if="column.sortable"
                  ><span @click="handleSort(column)">^</span></template
                >
              </th>
            </template>
          </template>
          <template v-else>
            <th :colspan="columns.length">
              <slot name="headerCellSelected"></slot>
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(record, recordIndex) in data"
          :key="recordIndex"
          class="basic-table__row"
          @contextmenu.prevent="(e) => rowContextMenu(record, recordIndex, e)"
        >
          <td v-if="rowSelection" class="selection-cell" :style="selectionStyles">
            <BasicCheckbox
              v-model="checkedListBoolean[recordIndex]"
              @change="handleChangeChecked"
            ></BasicCheckbox>
          </td>
          <template v-for="(column, colIndex) in columns" :key="colIndex">
            <td
              class="basic-table__cell"
              :style="{ width: column.width + 'px' }"
              @mouseenter="(e) => cellMouseEnter(record, column, record[column.key], e)"
              @mouseleave="(e) => cellMouseLeave(record, column, record[column.key], e)"
            >
              <slot name="bodyCell" v-bind="{ column, colIndex, record, recordIndex }">{{
                record[column.key]
              }}</slot>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts" name="Table">
import BasicCheckbox from '@/components/Checkbox/BasicCheckbox.vue'
import { useCheckbox } from './useCheckbox'
import { useSortable } from './useSortable'

const props = defineProps({
  data: { type: Array as any },
  columns: { type: Array as any },
  showHeaderTitle: { type: Boolean, default: true },
  rowSelection: { type: Object as any },
  cellMouseEnter: { type: Function as any },
  cellMouseLeave: { type: Function as any },
  rowContextMenu: { type: Function as any }
})

// 多选框逻辑
const {
  checkedAll,
  checkedListBoolean,
  indeterminate,
  selectionStyles,
  handleChangeCheckedAll,
  handleChangeChecked,
  selectionAll,
  selectionNone
} = useCheckbox(props)

// 排序
const { handleSort } = useSortable(props)

defineExpose({
  selectionAll,
  selectionNone
})
</script>

<style lang="scss" scoped>
.basic-table {
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    text-align: left;
    font-size: 14px;
    thead {
      tr {
        th {
          height: 48px;
          padding: 12px;
          color: #909399;
          font-weight: bold;
        }
      }
    }
    tbody {
      tr {
        td {
          height: 48px;
          padding: 12px;
          color: #606266;
        }
      }
    }
  }
}
</style>
