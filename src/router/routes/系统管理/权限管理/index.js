export default function () {
    return [
        {
            path: 'roles',
            component: () => import('@/pages/sys/authority/roles')
        },
        {
            path: 'routes',
            component: () => import('@/pages/sys/authority/routes')
        },
        {
            path: 'permiss',
            component: () => import('@/pages/sys/authority/permiss')
        },
        {
            path: 'role_log',
            component: () => import('@/pages/sys/authority/role_log')
        },
    ];
}