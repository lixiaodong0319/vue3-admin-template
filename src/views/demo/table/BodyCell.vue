<template>
  <div class="body-cell" :style="{ position: 'relative' }">
    <img :src="TYPE_IMAGE[record.type]" alt="" class="type-image" />
    <a v-if="record.id !== editId" @click="handleFileClick(record)">{{ record.filename }}</a>
    <div v-else class="input-container">
      <BasicInput ref="basicInputRef" v-model="record.filename" @blur="handleBlur" />
    </div>
    <span v-if="record.id === mouseEnterRecordId" class="button-container">
      <BasicButton><BasicSvgIcon #icon iconClass="menu_ic_download"></BasicSvgIcon></BasicButton>
      <BasicButton @click="handleEdit(record)"
        ><BasicSvgIcon #icon iconClass="menu_ic_rename"></BasicSvgIcon
      ></BasicButton>
      <BasicButton class="deleteBtn"
        ><BasicSvgIcon #icon iconClass="download_list_ic_delete" className="delete"></BasicSvgIcon
      ></BasicButton>
    </span>
  </div>
</template>
<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue'
import BasicInput from '@/components/Input/BasicInput.vue'
import BasicButton from '@/components/Button/BasicButton.vue'
import BasicSvgIcon from '@/components/Icon/BasicSvgIcon.vue'
import { TYPE_IMAGE, tableData } from './constant'

const props = defineProps({
  column: { type: Object as any },
  record: { type: Object as any },
  mouseEnterRecordId: { type: [Number] }
})

const editId = ref(null)
const basicInputRef: any = ref(null)

const handleEdit = (record) => {
  editId.value = record.id
  nextTick(() => {
    console.log(basicInputRef.value.ref)
    basicInputRef.value?.ref?.select()
    basicInputRef.value?.ref?.focus()
  })
}

const handleBlur = () => {
  editId.value = null
}

const handleFileClick = (record) => {
  //   data.value = record.children
}
</script>
<style lang="scss" scoped>
.body-cell {
  display: flex;
  gap: 8px;
  .type-image {
    width: 32px;
    height: 32px;
  }
  .input-container {
    display: flex;
    align-items: center;
  }
  .button-container {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    gap: 4px;
    :deep(.basic-button) {
      padding: 8px;
      min-height: 32px;
      height: 32px;
      width: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      &.deleteBtn {
        color: rgba(0, 0, 0, 0.6);
        &:hover {
          background-color: #f6685d;
          color: #fff;
        }
      }
      .img-slot {
        width: 16px;
        height: 16px;
        img {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
}
</style>
