<template>
  <footer class="footer">
    <span>Copyright © 2023 叶子亮个人博客</span>
    <span class="email">邮箱：1561213483@qq.com</span>
    <a class="a" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36112202000208" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">赣ICP备2023007562号-1</p></a>
    <span class="website" @click="goMiit">
      <img :src="beian" alt="">
      <div style="margin:0 auto;">
		 		<a class="a" target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36112202000208" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">赣公网安备 36112202000208号</p></a>
		 	</div>
    </span>
  </footer>
  		 	
		 
</template>

<script setup>
import beian from "../assets/images/beian.png"
function goMiit() {
  window.open("https://beian.miit.gov.cn")
}
</script>

<style scoped>
.footer {
  height: var(--footer-height);
  background-color: #303133;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #A8ABB2;
  /* cursor: pointer; */
}

.email {
  margin: 10px 0;
}
.website {
  margin-top: 10px;
  font-size: 12px;
  display: flex;
  align-items: center;
}
.a>p:hover {
  color: #C0C4CC;
  text-decoration: underline;
}
</style>