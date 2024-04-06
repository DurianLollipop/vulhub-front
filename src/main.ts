import { createApp } from 'vue';
// import './style.css';
import './permission';
import { router } from '@/router';
import { createPinia } from 'pinia';
// import { init } from '@/permission'
import App from './App.vue';
import 'normalize.css/normalize.css';
// 引入 element样式
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'

// await init()

createApp(App).use(createPinia()).use(router).mount('#app');