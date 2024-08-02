<template>
  <el-upload
    ref="uploadRef"
    class="upload-demo"
    :limit="1"
    :accept="'.md'"
    :on-exceed="handleExceed"
    :on-change="handleChange"
    :auto-upload="false"
  >
    <template #trigger>
      <el-button type="primary">选择文件</el-button>
    </template>

    <template #tip>
      <div class="el-upload__tip">
        .md文件
      </div>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadFile, UploadFiles, UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const props = defineProps<{
  modelValue: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const uploadRef = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.value!.handleStart(file)
}

const handleChange: UploadProps['onChange'] = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  const reader = new FileReader()
  reader.readAsText(uploadFile.raw as Blob)
  reader.onload = () => {
    emits('update:modelValue', reader.result as string)
  }
}
</script>