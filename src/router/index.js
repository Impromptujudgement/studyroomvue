// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/UserLogin.vue';        // 你的登录组件
import Dashboard from '../views/UserDashboard.vue'; // 用户登录后看到的组件
import AdminDashborad from '../views/AdminDashboard.vue';
import RoomLayout from '../views/RoomLayout.vue' // 导入自习室布局组件
import RoomChange from '../views/RoomChange.vue'
import RoomTimeChange from '../views/RoomTimeChange.vue'

const routes = [
    { path: '/', component: Login },
    { path: '/dashboard', component: Dashboard },
    { path: '/admindashboard', component: AdminDashborad },
    {
        path: '/room/layout/:id', // 动态路径参数
        name: 'room-layout',
        component: RoomLayout,
    },
    {
        path: '/room/change/:id', // 动态路径参数
        name: 'room-change',
        component: RoomChange, 
    },
    {
        path: '/room/timechange/:id', // 动态路径参数
        name: 'room-timechange',
        component: RoomTimeChange, 
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to,from,next)=>{return next()})
export default router;