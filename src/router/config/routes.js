/*
* @author 友人a丶
* @date 
* 完整的路由配置
* */

import {getChildrens} from '@/router/common'
import AdminLayout from '@/layouts/admin-layout'
import config from "@/config";


/*
* meta元属性
*
* cache，代表页面是否缓存(true,缓存），默认不写为false
* icon，菜单的图标
* role，是否参与角色控制
* menu，是否作为菜单，默认不写为true
* */

const children = getChildrens();

//路由页面
export default [
    {
        path: "/",
        redirect: config.index,
        component: AdminLayout,
        children: [
            {
                path: "dash",
                component: () => import('@/layouts/admin-view.vue'),
                children: children.工作台.default()
            },
            {
                path: "custom",
                component: () => import('@/layouts/admin-view.vue'),
                children: children.客户管理.default()
            },
            {
                path: "sys",
                component: () => import('@/layouts/admin-view.vue'),
                children: children.系统管理.default()
            }
        ]
    }
];
