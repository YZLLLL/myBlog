<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";
// import HelloWorld from './components/HelloWorld.vue'
import Menu from "./Menu.vue";
import { Search } from "@element-plus/icons-vue";
import RightPanel from "./RightPanel.vue";
import Footer from "./Footer.vue";
import { ArrowRight } from "@element-plus/icons-vue";
import { getGroups } from "../api/group";
import processMenu from "../utils/processMenu";
import { ref, onMounted, computed } from "vue";
import { useGroupStore } from "../stores/group";
import UserTool from "@/components/UserTool.vue";
const group = useGroupStore();
// todo
/**
 * 图片 icon
 * 备案
 */

const menus = ref();
const loading = ref(false);
onMounted(() => {
  loading.value = true;
  getGroups()
    .then(({ data }) => {
      menus.value = processMenu(data).sort((a, b) => a.id - b.id);
      group.setMenus(menus.value);
      console.log(menus.value)
    })
    .finally(() => {
      loading.value = false;
    });
});
const route = useRoute();

const router = useRouter();
const goGroup = (item) => {
  group.setGroup(item);
  router.replace(`/group/${item.id}`);
};
const showBreadcrumb = computed(() => {
  return route.path.indexOf("/home") === -1;
});
const showGroup = computed(() => {
  return route.path.indexOf("/group") !== -1;
});
const showArticle = computed(() => {
  return route.path.indexOf("/article") !== -1;
});
const showSearch = computed(() => {
  return route.path.indexOf("/search") !== -1;
});

const searchStr = ref("");
function onSearch() {
  if (!searchStr.value) return;
  router.push(`/search?s=${searchStr.value}`);
}

const activeMenu = computed(() => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

function goHome() {
  router.push(`/`);
}
</script>

<template>
  <div class="dark">
    <div class="nav">
      <div class="nav-warpper">
        <img class="nav-logo" @click="goHome" src="@/assets/images/logo.png" alt="" />
        <UserTool />
      </div>
    </div>

    <div class="sidebar">
      <el-menu :default-active="activeMenu" mode="vertical" class="menu">
        <Menu :menu-items="menus" />
      </el-menu>
      <!-- <el-input
          v-show="!loading"
          v-model="searchStr"
          class="search"
          placeholder="请输入搜索内容"
          @keyup.enter="onSearch"
        >
          <template #append>
            <el-button @click="onSearch" :icon="Search" />
          </template>
        </el-input> -->
    </div>
    <div class="main" v-loading="loading">

      <el-breadcrumb v-if="showBreadcrumb" class="breadcrumb" :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item @click="goGroup(group.group)" v-if="(showGroup||showArticle)&&group.group.title">{{ group.group.title }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="showArticle">文章详情</el-breadcrumb-item>
        <el-breadcrumb-item v-if="showSearch">搜索结果</el-breadcrumb-item>
      </el-breadcrumb>

      <RouterView />
      <!-- <RightPanel /> -->
    </div>

    <el-backtop :visibility-height="1200" :right="50" :bottom="50" />
    <Footer />
  </div>
</template>

<style scoped lang="scss">
.nav {
  top: 0;
  left: 0;
  width: 100%;
  position: sticky;
  z-index: 100;
  height: var(--nav-height);
  background-size: 4px 4px;
  border-bottom: 1px solid var(--border-color);
  background-image: radial-gradient(var(--bg-color), var(--bg-color));
  .nav-warpper {
    padding: 0 12px 0 24px;
    height: 100%;
    display: flex;
    align-items: center;
    .nav-logo {
      width: 32px;
    }
  }
}

.sidebar {
  position: fixed;
  inset: 0;
  top: var(--nav-height);
  width: var(--sidebar-width);
  background-color: var(--bg-color);
  transform: translate(-100%);
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  ::v-deep(.el-menu) {
    border: none;
    background: var(--bg-color);
  }
}
.main {
  margin-left: 0;
  transition: margin-left 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  .breadcrumb {
    height: 2rem;
    line-height: 2rem;
    padding-left: 0.5rem;
  } 
}
@media screen and (min-width: 960px) {
  .nav {
    background-image: radial-gradient(transparent 1px, var(--bg-color) 1px);
    backdrop-filter: saturate(50%) blur(4px);
    .nav-warpper {
      padding: 0 24px;
    }
  }
  .sidebar {
    transform: translate(0);
  }
  .main {
    margin-left: var(--sidebar-width);
  }
}
</style>
