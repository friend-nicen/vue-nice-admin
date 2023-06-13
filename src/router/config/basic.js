/*
* 基础路由配置
* */
export default [
    {
        path: "/login",
        meta: {
            role: false,
            name: "登录"
        },
        component: () => import("@/pages/login"),
    },
    {
        path: '/403',
        meta: {
            role: false,
            name: '403'
        },
        component: () => import('@/pages/error/403'),
    },
    {
        path: '/:pathMatch(.*)*',
        meta: {
            role: false,
            name: '404'
        },
        component: () => import('@/pages/error/404'),
    }
];

