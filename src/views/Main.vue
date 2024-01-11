<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import Menu from './Menu.vue'
import { Search } from '@element-plus/icons-vue'
import RightPanel from './RightPanel.vue'
import Footer from './Footer.vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { getGroups } from "../api/group";
import processMenu from "../utils/processMenu"
import { ref, onMounted, computed } from "vue"
import { useGroupStore } from "../stores/group"
const group = useGroupStore();
// todo
/**
 * 图片 icon
 * 备案
 */

const menus = ref();
const loading = ref(false);
onMounted(() => {
  loading.value = true
  getGroups().then(({data}) => {
    menus.value = processMenu(data).sort((a,b) => a.id -b.id)
  }).finally(() => {
    loading.value = false
  })
})
const route = useRoute();

const router = useRouter();
const goGroup = (item) => {
  group.setGroup(item)
  router.replace(`/group?id=${itemid}`)
}
const showBreadcrumb = computed(() => {
  return route.path.indexOf("/home") === -1
})
const showGroup = computed(() => {
  return route.path.indexOf("/group") !== -1
})
const showArticle = computed(() => {
  return route.path.indexOf("/article") !== -1
})
const showSearch = computed(() => {
  return route.path.indexOf("/search") !== -1
})


const searchStr = ref('');
function onSearch() {
  if (!searchStr.value) return
  router.push(`/search?s=${searchStr.value}`)
}

function goHome() {
  router.push(`/`)
}
</script>

<template>
  <div class="main">
    <div class="nav">
      <div class="nav-text" @click="goHome">
        <span class="nav-title">YZL</span>
        <span class="nav-motto">分享技术，记录点滴</span>
      </div>
    </div>

    <div class="menu-container">
      <div class="menu">
        <el-menu background-color="#FAFAFA" :default-active="activeMenu" mode="horizontal" class="recursive-menu">
          <Menu :menu-items="menus" />
        </el-menu>
        <el-input
          v-show="!loading"
          v-model="searchStr"
          class="search"
          placeholder="请输入搜索内容"
          @keyup.enter="onSearch"
        >
          <template #append>
            <el-button @click="onSearch" :icon="Search" />
          </template>
        </el-input>
      </div>
    </div>

    <div class="container" v-loading="loading">

      

      <el-breadcrumb v-if="showBreadcrumb" class="breadcrumb" :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item @click="goGroup(group.group)" v-if="(showGroup||showArticle)&&group.group.title">{{ group.group.title }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="showArticle">文章详情</el-breadcrumb-item>
        <el-breadcrumb-item v-if="showSearch">搜索结果</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <el-page-header class="breadcrumb" @back="goBack">
        <template #content>
          <span class="text-large font-600 mr-3"> 文章详情 </span>
        </template>
      </el-page-header> -->

      <div class="main-container">
        <div id="container">
          <RouterView />
        </div>

        <RightPanel />

      </div>
      
    </div>
  </div>

  <el-backtop :right="100" :bottom="100" />
  <Footer />
  
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
  cursor: pointer;
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
.menu-container, .recursive-menu {
  background-color: #fff !important;
}
.menu {
  position: relative;
  width: var(--container-width);
  margin: 0 auto;
}
.search {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 240px;
}
.main-container {
  /* flex: 1; */
  display: flex;
}
#container {
  flex: 1;
  width: 940px;
}
.breadcrumb {
  margin: 16px 0;
}

</style>
