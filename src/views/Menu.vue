<template>
    <template v-for="item in menuItems" :key="item.id">
      <el-sub-menu
        v-if="item.children && item.children.length > 0"
        :index="item.id"
      >
        <template #title>
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <recursive-menu
          v-if="item.children && item.children.length > 0"
          :menu-items="item.children"
          @close="emits('close')"
        ></recursive-menu>
        <!-- <template v-for="article in item.article" :key="article.id">
        <el-menu-item v-if="!article.url" @click="getArticle(article.id)" :index="article.id">
          <i :class="article.icon"></i>
          <span>{{ article.title }}</span>
        </el-menu-item>
        <el-menu-item v-else @click="goUrl(article.url)" :index="article.id">
          <i :class="article.icon"></i>
          <span>{{ article.title }}</span>
        </el-menu-item>
      </template> -->
      </el-sub-menu>
      <el-menu-item v-else @click="goGroup(item)" :index="`/group/${item.id}`">
        <i :class="item.icon"></i>
        <span>{{ item.title }}</span>
      </el-menu-item>
    </template>
</template>
<script lang="ts">
export default {
  name: "RecursiveMenu",
};
</script>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useGroupStore } from "../stores/group";
const group = useGroupStore();

const router = useRouter();
defineProps<{
  menuItems: any[];
}>();
const emits = defineEmits(["close"]);
const goGroup = (item) => {
  group.setGroup(item);
  router.push(`/group/${item.id}`);
  emits('close')
};

const goUrl = (url) => {
  window.open(url);
};
</script>

<style scoped>

.recursive-menu {
  width: 100%;
}
</style>
<style>
.menu {
  --el-menu-hover-bg-color: rgba(64, 158, 255, .1);
  --el-menu-border-color: transparent;
  ::v-deep(.el-sub-menu) {
    border-radius: 6px;
  }
  ::v-deep(.el-menu-item) {
    border-radius: 6px;
  }
}
</style>
