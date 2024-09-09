<template>
  <div class="body-cell" :style="{ position: 'relative' }">
    <img :src="TYPE_IMAGE[record.type]" alt="" class="type-image" />
    <a v-if="record.id !== editId" @click="handleFileClick(record)">{{ record.filename }}</a>
    <div v-else class="input-container">
      <BasicInput ref="basicInputRef" v-model="record.filename" @blur="handleBlur" />
    </div>
    <span v-if="true || record.id === mouseEnterRecordId" class="button-group">
      <BasicButton
        ><template #icon><img :src="DownloadSvg" /></template
      ></BasicButton>
      <BasicButton @click="handleEdit(record)"
        ><template #icon><img :src="RenameSvg" /></template
      ></BasicButton>
      <BasicButton class="delete"
        ><template #icon><img :src="DeleteSvg" /></template
      ></BasicButton>
    </span>
  </div>
</template>
<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue'
import BasicInput from '@/components/Input/BasicInput.vue'
import BasicButton from '@/components/Button/BasicButton.vue'
import DownloadSvg from '@/assets/svg/yuntun/menu/menu_ic_download.svg'
import DeleteSvg from '@/assets/svg/yuntun/download_list_ic_delete.svg'
import RenameSvg from '@/assets/svg/yuntun/menu/menu_ic_rename.svg'
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
  .button-group {
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
      &.delete {
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
