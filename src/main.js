// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 确保从你的路由文件导入router

createApp(App).use(router).mount('#app');