import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from "pinia"
import {router} from "./router/index";


import batch____import from './utils/imports'
import goto____bootstrap from "./utils/bootstrap";
import register____global from "@/utils/registerGlobal";

import './mock';//接口模拟



/* 初始化vue */
let app = createApp(App);
app.use(createPinia());//状态管理器
app.use(router);//路由加载

batch____import(app);//批量导入组件
goto____bootstrap(); //引导系统初始化
register____global(app); //注册全局方法

app.mount('#app')
