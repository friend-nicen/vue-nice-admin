import {getChildrens} from "@/router/common";

export default function () {

    const children = getChildrens();

    return [
        {
            path: 'team',
            component: () => import('@/layouts/admin-blank-view.vue'),
            children: children.团队管理.default()
        },
        {
            path: 'authority',
            component: () => import('@/layouts/admin-blank-view.vue'),
            children: children.权限管理.default()
        },
        {
            path: 'set',
            component: () => import('@/layouts/admin-blank-view.vue'),
            children: children.系统设置.default()
        },
    ];
}