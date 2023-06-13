export default function () {
    return [
        {
            path: 'param',
            component: () => import('@/pages/sys/set/param')
        },
        {
            path: 'config',
            component: () => import('@/pages/sys/set/config')
        },
    ];
}