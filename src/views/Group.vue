<template>
  <div class="list-container" v-loading="loading">
    <ArticleList :articles="articles" />
    <el-empty v-if="articles && articles.length == 0" description="空空如也~" />
  </div>
  <div
    v-if="hasNext"
    v-loading="true"
    style="
      height: 32px;
      margin-bottom: 16px;
      --el-loading-spinner-size: 24px;
      --el-mask-color: transparent;
    "
  ></div>
  <div v-if="articles.length !==0 && !hasNext" class="no-more">
    暂无更多
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, onUnmounted, ref, watch } from "vue";
import ArticleList from "../components/ArticleList.vue";
import { getArticles } from "../api/group";
import { throttle } from "../utils/index";

const route = useRoute();
const loading = ref(false);
const articles = ref([]);
const total = ref(0);
const page = ref(1);
const size = ref(6);
const hasNext = ref(true);

onMounted(() => {
  window.addEventListener("scroll", scroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", scroll);
});

function getArtciles(groupId) {
  if (!hasNext.value) {
    return;
  }
  loading.value = true;
  getArticles({ page: page.value, limit: size.value, groupId })
    .then(({ data }) => {
      articles.value = articles.value.concat(data.articles);
      total.value = data.total;
      hasNext.value = data.total > articles.value.length;
      page.value++;
    })
    .finally(() => {
      loading.value = false;
    });
}

// 后端 变成 分页查
const h = 200; // 距离底部多少
const scroll = throttle(function (e) {
  if (loading.value) return;
  // toFixed：把this.scrollTop转换为整数，兼容不同版本浏览器
  var distanceToBottom =
    document.documentElement.scrollHeight -
    window.innerHeight -
    window.pageYOffset;
  if (distanceToBottom < h) {
    getArtciles(route.params.id);
  }
});

watch(
  () => route.params.id,
  (id) => {
    if (id == undefined) return;
    page.value = 1;
    articles.value = []
    total.value = 0
    hasNext.value = true
    getArtciles(id);
  },
  { immediate: true }
);
</script>

<style scoped>
.no-more {
  display: flex;
  justify-content: center;
  height: 2rem;
  font-size: 0.8rem;
  color: var(--el-text-color-placeholder);
}
</style>
