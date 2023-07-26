<template>
  <div class="mask">
    <div class="container">

      <div>
        <div class="title">即将离开本站</div>
        <div>您即将离开本站，请注意您的帐号和财产安全。</div>
        <div>{{ traget }}</div>
      </div>

      <div class="btn-container">
        <el-button type="danger" @click="go">继续访问</el-button>
      </div>

    </div>
    
    
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const traget = route.query.target;
const go = () => {
  
  window.location.href = traget;

}
</script>

<style scoped>
.mask {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #F2F6FC;
}
.container {
  margin-top: calc( 100vh / 5);
  border: 1px solid #E4E7ED;
  border-radius: 5px;
  padding: 32px;
  line-height: 32px;
  font-size: 14px;
  background-color: #fff;
}
.title {
  font-size: 20px;
  line-height: 40px;
}
.btn-container {
  margin-top: 10px;
  border-top: 1px solid #E4E7ED;
  padding-top: 20px;
  display: flex;
  flex-direction: row-reverse;
}
</style>