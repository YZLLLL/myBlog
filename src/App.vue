<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import Menu from './views/Menu.vue'
import Footer from './views/Footer.vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { getGroups } from "./api/group";
import processMenu from "./utils/processMenu"
import { ref, onMounted, computed } from "vue"
// todo
/**
 * 图片 icon introduction
 * 首页
 * 侧边栏
 * 评论
 * 备案
 */

const menus = ref();
const loading = ref(false);
onMounted(() => {
  loading.value = true
  getGroups().then(({data}) => {
    menus.value = processMenu(data)
  }).finally(() => {
    loading.value = false
  })
})
const getHome = () => {
  router.push({ path: '/' })
}
const route = useRoute();
console.log(route)
const router = useRouter();
const showArticle = computed(() => {
  return route.path.indexOf("/article") !== -1
})
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <el-button type="primary">123123</el-button>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
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
      <div class="right-panel">
        <div>
          <div>热门文章</div>
          <div>我都我熬到都扫的是多久啊看到那快速搭建</div>
          <div>我都我熬到都扫的是多久啊看到那快速搭建</div>
          <div>我都我熬到都扫的是多久啊看到那快速搭建</div>
          <div>我都我熬到都扫的是多久啊看到那快速搭建</div>
          <div>我都我熬到都扫的是多久啊看到那快速搭建</div>
        </div>
        <div>
          <div>热门文章</div>
          <div>我都我熬到都扫的是多久啊看到那快速搭建</div>
          <div>我都我熬到都扫的是多久啊看到那快速搭建</div>
          <div>我都我熬到都扫的是多久啊看到那快速搭建</div>
          <div>我都我熬到都扫的是多久啊看到那快速搭建</div>
          <div>我都我熬到都扫的是多久啊看到那快速搭建</div>
        </div>

        <div>
          <div>热门文章</div>
          <div>我都我熬到都扫的是多久啊看到那快速搭建</div>
          <div>我都我熬到都扫的是多久啊看到那快速搭建</div>
          <div>我都我熬到都扫的是多久啊看到那快速搭建</div>
          <div>我都我熬到都扫的是多久啊看到那快速搭建</div>
          <div>我都我熬到都扫的是多久啊看到那快速搭建</div>
        </div>
      </div>
    </div>
    
  </div>
  <el-backtop :right="100" :bottom="100" />
  <Footer />
  
</template>

<style scoped>
.nav {
  --height: 64px;
  height: var(--height);
  background-color: #73767a;
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
.right-panel {
  width: 240px;
  flex-shrink: 0;
  margin-left: 50px;
}
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
