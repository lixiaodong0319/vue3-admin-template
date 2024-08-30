<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <th v-if="selection">
            <input type="checkbox" v-model="checked" @change="handleChange" />
          </th>
          <th v-for="(col, index) in columns" :key="index">
            {{ col.title }}
            <template v-if="col.sortable"><span @click="handleSort(col)">^</span></template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in data" :key="rowIndex" @mouseover="handleMouseOver">
          <td v-if="selection">
            <input
              type="checkbox"
              v-model="rowCheckedArr[rowIndex]"
              @change="handleChangeRow(row)"
            />
          </td>
          <td v-for="(col, colIndex) in columns" :key="colIndex">
            <template v-if="'render' in col">
              <input type="text" v-model="row[col.key]" />
            </template>
            <template v-else>
              <span>
                {{ row[col.key] }}
              </span>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts" name="Table">
import { reactive, ref, type PropType } from 'vue'

const props = defineProps({
  data: { type: Array as any },
  columns: { type: Array as any },
  selection: { type: Boolean, default: false }
})

const checked = ref(false)

const handleChange = (e) => {
  console.log(e.target.checked, 'e===')
  console.log(checked.value, 'checked')
  rowCheckedArr.value = rowCheckedArr.value.map(() => e.target.checked)
}

let rowCheckedArr = ref(props.data.map(() => false))

const handleChangeRow = (e) => {
  console.log(e, 'e===========')
  console.log(rowCheckedArr, 'rowCheckedArr==========')
  if (rowCheckedArr.value.every((item) => item === true)) {
    checked.value = true
  } else {
    checked.value = false
  }
}

let flag = false
const handleSort = (col) => {
  console.log(col, 'col=================')
  console.log(props.data, 'props.data===============')
  props.data.sort((a, b) => (flag ? a[col.key] - b[col.key] : b[col.key] - a[col.key]))
  flag = !flag
}

const handleMouseOver = (row) => {
  console.log(row, 'row=============')
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
  border: 1px solid #e9e9e9;
}
table th {
  background: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
  white-space: nowrap;
}
table td,
table th {
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  text-align: left;
}
</style>
