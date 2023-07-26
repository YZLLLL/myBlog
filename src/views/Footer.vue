<template>
  <footer class="footer">
    <span>Copyright © 2023 叶子亮个人博客</span>
    <span class="website">网站备案号：XXXXXXXX</span>
  </footer>
</template>

<script>
export default {

}
</script>

<style scoped>
.footer {
  height: var(--footer-height);
  background-color: #303133;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #fff;
}
.website {
  margin-top: 10px;
  font-size: 12px;
}
</style>