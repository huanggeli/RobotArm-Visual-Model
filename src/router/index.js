// @/router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: {
            title: '首页',
            layout: true,
        }
    },
        {
        path: '/send',
        name: 'send',
        component: () => import('../views/send.vue'),

    },
    {
        path: '/chat',
        name: 'chat',
        component: () => import('../views/chat.vue'),

    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
