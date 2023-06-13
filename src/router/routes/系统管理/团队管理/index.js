export default function () {
    return [
        {
            path: 'organ',
            component: () => import('@/pages/sys/team/organ')
        },
        {
            path: 'login_log',
            component: () => import('@/pages/sys/team/login_log')
        },
        {
            path: 'organ_log',
            component: () => import('@/pages/sys/team/organ_log')
        },
    ];
}