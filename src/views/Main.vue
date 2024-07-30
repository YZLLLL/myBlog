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
    })
    .finally(() => {
      loading.value = false;
    });
});
const route = useRoute();

const router = useRouter();
const goGroup = (item) => {
  group.setGroup(item);
  router.replace(`/group?id=${itemid}`);
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

function goHome() {
  router.push(`/`);
}
</script>

<template>
  <div class="dark">
  <div class="nav">
    <div class="nav-warpper" @click="goHome">
      <img class="nav-logo" src="@/assets/images/logo.png" alt="">
      <UserTool />
    </div>
  </div>

  <div class="sidebar">
    <el-menu background-color="#FAFAFA" mode="vertical" class="recursive-menu">
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
    padding: 0 32px;
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
}
@media screen and (min-width: 960px) {
  .nav {
    background-image: radial-gradient(transparent 1px, var(--bg-color) 1px);
    backdrop-filter: saturate(50%) blur(4px);
  }
  .sidebar {
    transform: translate(0);
  }
  .main {
    margin-left: var(--sidebar-width);
  }
}
</style>
