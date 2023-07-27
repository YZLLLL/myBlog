<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

const router = useRouter();
// 重写window.open
const open = window.open;

window.open = (url, ...args) => {
  return open(router.resolve(`/open?target=${url}`).href, ...args)
}

// window.addEventListener('copy', (e) => {
//   e.preventDefault();
//   console.log(1)
//   let text = window.getSelection()?.toString();
//   navigator.clipboard.writeText(`${text}
//   版权声明：本文为xxx的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
//   原文链接：https://xxx`);
// });
// // import HelloWorld from './components/HelloWorld.vue'
// import Menu from './views/Menu.vue'
// import RightPanel from './views/RightPanel.vue'
// import Footer from './views/Footer.vue'
// import { ArrowRight } from '@element-plus/icons-vue'
// import { getGroups } from "./api/group";
// import processMenu from "./utils/processMenu"
// import { ref, onMounted, computed } from "vue"

// // todo
// /**
//  * 图片 icon introduction
//  * 评论
//  * 部署
//  * 备案
//  */

// const menus = ref();
// const loading = ref(false);
// onMounted(() => {
//   loading.value = true
//   getGroups().then(({data}) => {
//     menus.value = processMenu(data)
//   }).finally(() => {
//     loading.value = false
//   })
// })
// const getHome = () => {
//   router.push({ path: '/' })
// }
// const route = useRoute();
// console.log(route)
// const router = useRouter();
// const showArticle = computed(() => {
//   return route.path.indexOf("/article") !== -1
// })
</script>

<template>
  <!-- <div class="main">
    <div class="nav">
      <div class="nav-text">
        <span class="nav-title">个人博客</span>
        <span class="nav-motto">分享技术，记录点滴</span>
      </div>
    </div>

    <div class="container" v-loading="loading">
      <el-menu background-color="#f4f4f5" :default-active="activeMenu" mode="horizontal" class="recursive-menu">
        <el-menu-item @click="getHome" :index="123">
          <i class=""></i>
          <span>首页</span>
        </el-menu-item>
        <Menu :menu-items="menus" />
      </el-menu>

      <el-breadcrumb class="breadcrumb" :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="showArticle">文章详情</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="main-container">
        <div id="container">
          <RouterView />
        </div>

        <RightPanel />

      </div>
      
    </div>
  </div>

  <el-backtop :right="100" :bottom="100" />
  <Footer /> -->
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
