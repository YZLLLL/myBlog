<template>
  <footer class="footer">
    <span>Copyright © 2023 叶子亮个人博客</span>
    <span class="website" @click="goMiit">网站备案号：赣ICP备2023007562号-1</span>
  </footer>
</template>

<script setup>
function goMiit() {
  window.open("https://beian.miit.gov.cn")
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
  color: #A8ABB2;
  cursor: pointer;
}
.footer:hover {
  color: #C0C4CC;
  text-decoration: underline;
}
.website {
  margin-top: 10px;
  font-size: 12px;
}
</style>