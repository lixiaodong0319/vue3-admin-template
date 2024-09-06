<template>
  <table>
    <!-- <thead>
        <tr>
            <th v-for="(row, index) in tableData">{{ row }}</th>
        </tr>
    </thead> -->
    <tbody>
      <tr>
        <td v-for="(item, index) in tableData">
          <slot></slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
  tableData: Object
})
</script>
