<template>
  <div class="operate">
    <div class="operate-container">
      <el-button type="primary" @click="$router.push('/operate/addArticle')">
        新增文章
      </el-button>
      <span></span>
      <el-button type="primary" @click="$router.push('/operate/articleList')">
        文章列表
      </el-button>
      <span></span>
      <el-button type="primary" link @click="$router.push('/home')">
        返回首页
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.operate {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  &-container {
    padding: 20px 40px;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }
}
</style>
