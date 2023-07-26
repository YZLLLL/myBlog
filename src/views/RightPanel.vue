<template>
  <div class="right-panel">
    <!-- <el-upload
      ref="uploadRef"
      class="upload-demo"
      :http-request="upload"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :auto-upload="false"
    >
    <template #trigger>
      <el-button type="primary">select file</el-button>
    </template>

    <el-button class="ml-3" type="success" @click="submitUpload">
      upload to server
    </el-button>
    </el-upload> -->
    <div class="container">
      <div class="panel-container">
        <div class="panel-item panel-title">热门文章</div>
        <div 
          class="panel-list"
          v-for="item in hotArticles"
          :key="item.id"
          @click="goArticle(item.id)"
        >
          <div class="text-line-1">
            <el-icon class="article-icon"><Document /></el-icon>
            {{ item.title }}
          </div>
          <div class="pv"><el-icon style="margin-right: 4px;"><View /></el-icon>{{ item.pv }}</div>
        </div>
      </div>
      <div class="panel-container">
        <div class="panel-item panel-title">友情链接</div>
        <div 
          class="panel-list"
          v-for="item in links"
          :key="item.herf"
          @click="goAnother(item.herf)"
        >
          <div class="text-line-1">
            <el-icon class="article-icon"><Share /></el-icon>
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getHotArticle } from "../api/article"
import { uploadImage } from "../api/upload"
import { ref } from "vue"
import { useRouter, useRoute } from "vue-router";
const uploadRef = ref();
const submitUpload = () => {
  uploadRef.value?.submit()
}
const upload = (e) => {
  const data = new FormData();
  data.append("image", e.file)
  uploadImage(data);
}

const links = [{
  label: 'MDN Web Docs',
  herf: 'https://developer.mozilla.org/zh-CN/'
}, {
  label: "Vue官网",
  herf: "https://cn.vuejs.org/guide/quick-start.html"
}, {
  label: "稀土掘金",
  herf: "https://juejin.cn/"
}, {
  label: "力扣(LeetCode)",
  herf: "https://leetcode.cn/"
}, {
  label: "印记中文",
  herf: "https://docschina.org/"
}]

const goAnother = (url) => {
  window.open(url)
  // window.open(router.resolve(`/open?target=${url}`).href, '_blank')
}


const hotArticles = ref([]);
const router = useRouter();
getHotArticle().then(({data})=> {
  hotArticles.value = data;
});

const goArticle = (id) => {
  router.push(`/article?id=${id}`)
}
</script>

<style scoped>
.right-panel {
  width: 240px;
  flex-shrink: 0;
  margin-left: 20px;
  
}
.container{
  position: sticky;
  top: 12px;
}
.panel-container {
  background-color: #fff;
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 32px;
}
.panel-item {
  padding: 0 10px;
}
.panel-title {
  font-size: 18px;
  font-weight: 600;
  line-height: 42px;
  color: #fff;
  background-color: #606266;
}
.panel-list {
  margin: 6px 10px;
  padding: 4px 0;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-size: 15px;
  color: #606266;
  border-bottom: 1px solid #E4E7ED;
}
.pv {
  display: flex;
  justify-content: space-between;
  padding-left: 4px;
  flex-shrink: 0;
  align-items: center;
  opacity: 0.8;
  font-size: 12px;
}
.panel-list:last-of-type {
  border-bottom: none;
}
.panel-list:hover {
  color: #409EFF;
  text-decoration: underline;
}
.article-icon {
  height: 100%;
  margin-right: 4px;
  color: #fcd3d3;
}
</style>