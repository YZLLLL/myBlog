<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
// import { useUserStore } from "./stores/user";
// const user = useUserStore();
// console.log(user)
const router = useRouter();
// 重写window.open
const open = window.open;

window.open = (url, ...args) => {
  return open(router.resolve(`/open?target=${url}`).href, ...args)
}

// // todo
// /**
//  * 图片 icon introduction
//  * 评论
//  * 部署
//  * 备案
//  */

</script>

<template>
  <RouterView />
</template>

<style scoped>
.main {
  min-height: calc(100vh - var(--footer-height));
}
.nav {
  --height: 64px;
  height: var(--height);
  background-color: #303133;
}
.nav-text {
  color: #fff;
  width: var(--container-width);
  margin: 0 auto;
}
.nav-title {
  font-size: 20px;
  line-height: var(--height);
}
.nav-motto {
  margin-left: 40px;
  font-size: 13px;
}
.container {
  width: var(--container-width);
  /* display: flex; */
  margin: 0 auto;
}
.main-container {
  /* flex: 1; */
  display: flex;
}
#container {
  flex: 1;
}
.breadcrumb {
  margin: 16px 0;
}

</style>
