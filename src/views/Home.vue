<template>

  <el-carousel class="carousel" :interval="10000" type="card" height="240px">
    <el-carousel-item class="carousel-item" v-for="item in images" :key="item.id">
      <img class="carousel-item-image" :src="item.path" alt="">
    </el-carousel-item>
  </el-carousel>

  <div class="list-container" v-loading="loading">
    <div class="article-item" @click="goArticle(item)" v-for="item in articles" :key="item.id">
      <img class="cover" :src="item.cover" alt="" />
      <div class="text">
        <div class="title">{{ item.title }}</div>
        <div class="intro text-line-2">{{ item.introduction }}</div>
      </div>
    </div>
    
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
onMounted(() => {
  loading.value = true;
  getLatestArtcile({ limit: 10 }).then(({data}) => {
    articles.value = data
  }).finally(() => {
    loading.value = false;
  });
})
getLatestArtcile({ limit: 10 }).then(({data}) => {
  articles.value = data
});
const router = useRouter();
const goArticle = (item) => {
  router.push(`/article?id=${item.id}`)
}
</script>

<style scoped>
.list-container {
  padding: 10px 20px;
  margin-bottom: 20px;
  /* min-height: calc(100vh - 60px + 60px + 80px); */
  background-color: #fff;
  border-radius: 20px;
}
.article-item {
  display: flex;
  align-items: center;
  padding: 20px 20px;
  border-bottom: 1px solid #c8c9cc;
  cursor: pointer;
  /* border-radius: 20px; */
}
.article-item:hover {
  background-color: #f4f4f5;
}
.article-item:hover .text {
  text-decoration: underline;
  color: #409EFF;
  transform: scale(1.01);
}

.article-item:last-of-type {
  border-bottom: none;
}
.cover {
  width: 80px;
  height: 80px;
  margin-right: 40px;
  flex-shrink: 0;
  border-radius: 5px;
  object-fit: cover;
}
.text {
  transition: all 0.1s;
}
.title {
  font-size: 18px;
  font-weight: 600;
}
.intro {
  margin-top: 6px;
  font-size: 14px;
  opacity: 0.6;
  line-height: 24px;
}
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