import 'normalize.css'
import './assets/main.scss'
import './assets/common.scss'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './router/permission'
const app = createApp(App)

// 导入所有图标并进行全局注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
} 



app.use(createPinia())
app.use(router)

app.mount('#app')
