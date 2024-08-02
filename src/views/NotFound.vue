<template>
  <div class="not-found">
    <div class="box">
      <div>404!</div>
      <el-button type="primary" link @click="$router.replace('/home')">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 2rem;
    justify-content: space-between;
    height: 4rem;
  }
}
</style>