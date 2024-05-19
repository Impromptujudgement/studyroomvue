// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/UserLogin.vue';        // 你的登录组件
import Dashboard from '../views/UserDashboard.vue'; // 用户登录后看到的组件
import AdminDashborad from '../views/AdminDashboard.vue';
import RoomLayout from '../views/RoomLayout.vue' // 导入自习室布局组件

const routes = [
    { path: '/', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: '/admindashboard', component: AdminDashborad },
    {
        path: '/room/:id', // 动态路径参数
        name: 'room-layout',
        component: RoomLayout,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;