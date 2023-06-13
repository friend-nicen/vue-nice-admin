import {getChildrens} from "@/router/common";

export default function () {

    const children = getChildrens();

    return [
        {
            path: 'all',
            component: () => import('@/layouts/admin-blank-view.vue'),
            children: children.全部客户.default
        },
        {
            path: 'data',
            component: () => import('@/layouts/admin-blank-view.vue'),
            children: children.数据统计.default
        },
    ];
}