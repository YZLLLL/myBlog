<template>
  <div class="article-item" @click="goArticle(item)" v-for="item in articles" :key="item.id">
    <img class="cover" :src="item.cover || 'https://fbimg.fangxinxue.net/plan/202108/27/163006392734634.jpeg'" alt="" />
    <div class="text">
      <div class="title">{{ item.title }}</div>
      <div class="intro text-line-2">{{ item.introduction }}</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const { articles } = defineProps({
  articles: {
    type: Array,
    default: () => []
  }
})

const router = useRouter();
const goArticle = (item) => {
  router.push(`/article?id=${item.id}`)
}
</script>

<style scoped>
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
  letter-spacing: 0.1em;
}
</style>