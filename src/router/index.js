/*引入vue-*/
import {createRouter, createWebHashHistory} from "vue-router"
import basic from "@/router/config/basic";

/*路由配置项*/
export const router = createRouter({
    history: createWebHashHistory(),
    routes: basic
});
