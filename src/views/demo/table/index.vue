<template>
  <div class="allFiles">全部文件</div>
  <BasicTable :data="tableData" :columns="columns" :selection="true"></BasicTable>
</template>

<script setup lang="ts" name="allFiles">
import BasicTable from '@/components/Table/BasicTable.vue'
import { reactive } from 'vue'

const tableData = reactive([
  {
    filename: '我的资源',
    size: 9.8,
    updateTime: '919526400000'
  },
  {
    filename: '新建文件夹',
    size: 1.5,
    updateTime: '696096000000'
  },
  {
    filename: '我的转存',
    size: 4.25,
    updateTime: '696096000000'
  }
])

const columns: any = [
  {
    title: '文件名',
    key: 'filename',
    render: true
  },
  {
    title: '大小',
    key: 'size',
    sortable: true
  },
  {
    title: '修改时间',
    key: 'updateTime'
    // render: (h, { row, column, index }) => {
    //   console.log(h, row, column, index, 'render==========')
    //   const date = new Date(parseInt(row.birthday))
    //   const year = date.getFullYear()
    //   const month = date.getMonth() + 1
    //   const day = date.getDate()
    //   const birthday = `${year}-${month}-${day}`
    //   return h('span', birthday)
    // }
  }
]
</script>

<style lang="scss" scoped></style>
