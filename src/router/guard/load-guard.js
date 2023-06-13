/*
* @author 友人a丶
* @date 2022-07-11
*
* 加载全局路由守卫
* */


import {router} from "@/router";
import userStore from "@/stores/user";
import systems from "@/stores/system";
import NProgress from 'nprogress'
import loadUser from "@/service/load-user";
import {loadRoutes} from "@/router/common";


/*进度条*/
NProgress.configure({showSpinner: false})


// 不需要拦截的路由配置
const ignoreRoute = {
    names: ['404', '403'],      //根据路由名称匹配
    paths: ['/login'],   //根据路由fullPath匹配
    /**
     * 判断路由是否包含在该配置中
     * @param route vue-router 的 route 对象
     * @returns {boolean}
     */
    includes(route) {
        return ignoreRoute.names.includes(route.name) || ignoreRoute.paths.includes(route.path)
    }
}


/*
* 加载路由守卫
* */
export default function () {

    console.log("加载路由守卫...");
    const user = userStore();//全局状态
    console.log("当前路由列表：", router.getRoutes());


    /*
    * 加载进度条
    * */
    router.beforeEach((to, from, next) => {
        // start progress bar
        if (!NProgress.isStarted()) {
            NProgress.start()
        }
        next()
    });

    /*
    * 判断系统是否初始化
    * */
    router.beforeEach(async (to, from, next) => {

        /* 系统尚未初始化 */
        if (!systems.loaded) {
            await loadUser();//加载用户信息初始化系统
        }

        next(); //下一个

    });


    /*
    * 判断是否登录，未登录时，去登录页面
    * */
    router.beforeEach((to, from, next) => {

        console.log("登录判断守卫激活....")


        /*
        * 判断是否需要拦截
        * */
        if (ignoreRoute.includes(to)) {
            next();
        } else {
            /*
            * 角色为0，代表未登录
            * */
            if (!user.token) {
                next({path: '/login'});
            } else {
                next();
            }

        }
    });


    /*
    * 到这一步已经是正常访问了
    * 判断是否已经重置路由
    * */
    router.beforeEach(async (to, from, next) => {


        /* 如果成功获取用户信息，跳转登录页面，则直接访问首页 */
        if (!!user.token && !systems.filterRoutes) {
            loadRoutes(); //加载路由表
            next(to);//继续跳转
        } else {
            next();//继续跳转
        }


    });


    /*
    * 已登录时，访问登录页面，让它走
    * */
    router.beforeEach((to, from, next) => {
        /* 如果成功获取用户信息，跳转登录页面，则直接访问首页 */
        if (!!user.token && (to.path == "/login")) {
            next(user.index);
        } else {
            next(); //下一个
        }
    });


    /*
    * 切换页面标题
    * */
    router.beforeEach((to, from, next) => {
        document.title = to.meta.name
        next();
    })


    /*
    * 结束进度条
    * */
    router.afterEach(() => {
        // finish progress bar
        NProgress.done()
    });


}

