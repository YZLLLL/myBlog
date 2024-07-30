<template>
  <div class="user-tool">
    <el-icon><Fold /></el-icon>
  </div>
</template>

<script setup lang="ts">
import { Fold } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.user-tool {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
}
</style>