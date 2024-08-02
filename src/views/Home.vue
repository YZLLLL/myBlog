<template>
  <!-- <el-carousel class="carousel" :interval="10000" type="card" height="240px">
    <el-carousel-item class="carousel-item" v-for="item in images" :key="item.id">
      <img class="carousel-item-image" :src="item.path" alt="">
    </el-carousel-item>
  </el-carousel> -->

  <div class="list-container">
    <ArticleList :articles="articles" />
    <el-empty v-if="articles&&articles.length==0" description="空空如也~" />
  </div>
  <div v-if="hasNext" v-loading="true" style="height: 32px; margin-bottom: 16px; --el-loading-spinner-size: 24px;--el-mask-color: transparent"></div>
  <div v-if="articles.length !==0 && !hasNext" class="no-more">
    暂无更多
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue"
import { getLatestArtcile } from "../api/article"
import ArticleList from "../components/ArticleList.vue"
import { throttle } from "../utils/index"


const loading = ref(false);
const articles = ref([]);
const total = ref(0);
const page = ref(1);
const hasNext = ref(true)

onMounted(() => {
  getArtciles();
  window.addEventListener("scroll", scroll);
})
onUnmounted(() => {
  window.removeEventListener("scroll", scroll);
})

function getArtciles() {
  if (!hasNext.value) {
    return
  }
  loading.value = true;
  getLatestArtcile({ page: page.value, limit: 10 }).then(({data}) => {
    articles.value = articles.value.concat(data.articles);
    total.value = data.total;
    hasNext.value = data.total > articles.value.length;
    page.value++;
  }).finally(() => {
    loading.value = false;
  });
}

// 后端 变成 分页查
const h = 200; // 距离底部多少
const scroll = throttle(function(e) {
  if (loading.value) return;
  // toFixed：把this.scrollTop转换为整数，兼容不同版本浏览器
  var distanceToBottom = document.documentElement.scrollHeight - window.innerHeight - window.pageYOffset;
  if (distanceToBottom < h) {
    getArtciles();
  }
})
</script>

<style scoped>
.carousel {
  margin: 20px 0;
}
.carousel-item {
  background-color: #999;
  border-radius: 10px;
  overflow: hidden;
}
.carousel-item-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.no-more {
  display: flex;
  justify-content: center;
  height: 2rem;
  font-size: 0.8rem;
  color: var(--el-text-color-placeholder);
}
</style>