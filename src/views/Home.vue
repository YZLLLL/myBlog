<template>

  <el-carousel class="carousel" :interval="10000" type="card" height="240px">
    <el-carousel-item class="carousel-item" v-for="item in images" :key="item.id">
      <img class="carousel-item-image" :src="item.path" alt="">
    </el-carousel-item>
  </el-carousel>

  <div class="list-container" v-loading="loading">

    <ArticleList :articles="articles" />
    
    <el-empty v-if="articles&&articles.length==0" description="空空如也~" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router";
import { getLatestArtcile } from "../api/article"
import View from "../assets/images/view.jpg"
import Tixi from "../assets/images/tixi.png"
import DN from "../assets/images/dianao.webp"
import Rumen from "../assets/images/rumen.jpg"
import ArticleList from "../components/ArticleList.vue"
import { throttle } from "../utils/index"

const images = [{
  id: 1,
  path: View
}, {
  id: 2,
  path: Tixi
}, {
  id: 3,
  path: DN
}, {
  id: 4,
  path: Rumen
}]

const loading = ref(false);
const articles = ref([]);
const page = ref(1);

onMounted(() => {
  getArtciles();

  window.addEventListener("scroll", scroll);
  window.removeEventListener("scroll", scroll)

})

function getArtciles() {
  loading.value = true;
  getLatestArtcile({ page: page.value, limit: 10 }).then(({data}) => {
    articles.value = data;
    page.value++;
  }).finally(() => {
    loading.value = false;
  });
}

// todo 首页 触底加载更多
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
</style>