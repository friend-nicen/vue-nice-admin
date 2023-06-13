/*
* 操作路由的相关方法
* */
import {router} from "@/router";
import user from "@/stores/user";
import routes from "@/router/config/routes";
import used from "@/router/config/used";
import systems from "@/stores/system";
import {cloneDeep} from "lodash";


/*
* 获取某个路由项的下面的子路由
* getRoutes之后的路由路径是完整路由
* children子路由是定义时的路径
* 所以需要转换
* 同时会递归，将所有子路由的path拼接成完整的路径
* 主要用于生成菜单，如果定义了NotMenu元属性或者是动态路由  该路由将被忽略
* 顶部菜单栏通过这个方法获取下级菜单
* 最终返回的 子路由数组
* */
export function getChildren(path) {

    /*
    * path是一个完整的路由路径
    * */
    const routes = router.getRoutes();//得到的一个可以随意修改的不影响router 的数组
    const users = user();  /*用户信息*/
    let children = [];//

    /*
    * 对比路由
    * 判断是否具有子路由
    * */
    for (let i of routes) {
        if (i.path == path) {
            if (!!i.children) {
                children = i.children;
            }
        }
    }


    /*
    * 拼接完整的子路由path访问路径
    * */
    children = children.filter((i) => {

        /*
        * 判断是否作为菜单
        * 判断是否是动态路由
        * 判断权限是否够
        * */
        if (i.meta && ((i.meta.menu === false) || (i.path.indexOf(":") >= 0) || (users.role < i.meta.role))) {
            return false;
        } else {
            return true;
        }

    }).map((i) => {

        /*
        * 获取路由的完整路径
        * */
        //如果本身就是绝对路径
        if (!i.path.startsWith('/')) {
            //如果是相对路径
            if (path == '/') {
                i.path = path + i.path;
            } else {
                i.path = path + '/' + i.path;
            }
        }

        /*
        *
        * 根据完整路径递归子路由
        * */
        if (!!i.children) {
            i.children = getChildren(i.path);
        }

        return i;
    })

    return children;
}


/*
* @author 友人a丶
* @date 2022-07-11
* name代表组件名
* 获取需要缓存的组件
* */
export function getChached(path = '') {

    let routes = router.getRoutes();

    let cahced = []; //是否开启缓存
    /*
    * 为空代表获取所有一级组件
    * */
    if (path == "") {
        routes.forEach((item) => {
            if (item.meta.cache) {
                cahced.push(item.meta.cache);
            }
        });
    } else {
        /*遍历目标子组件*/
        for (let i of routes) {
            if (i.path == path) {
                i.children.forEach((item) => {
                    if (item.meta.cache) {
                        cahced.push(item.meta.cache);
                    }
                });
            }
        }
    }

    return cahced;
}


/*
* 批量导入子路由
* */
export function getChildrens() {

    /*批量导入子路由*/
    const modules = import.meta.glob(['@/router/*/index.js', '@/router/*/*/index.js', '@/router/*/*/*/index.js', '@/router/*/*/*/*/index.js'], {eager: true});
    const AutoRoutes = Object.create(null);//空对象；

    for (let i in modules) {
        let name = /([^/]*)?\/index.js/.exec(i);
        AutoRoutes[name[1]] = modules[i];
    }

    return AutoRoutes;

}


/*
* 加载用户路由表
* */
export function loadRoutes() {

    /* 是否已加载 */
    if (systems.filterRoutes) return;
    systems.filterRoutes = true; //标记路由已加载

    const clone_routes = cloneDeep(routes);
    const in_routes = Object.create(null); //后端返回的路由项
    const userInfo = user(); //用户数据

    /* 过滤用户路由 */
    userInfo.routes.forEach(item => {
        in_routes[item.path] = {
            icon: item.icon,
            name: item.name,
            menu: item.menu,
            keepAlive:true
        };
    });

    const keys = Object.keys(in_routes); //路由键名
    let index = null;//首页的路由对象

    /*
    * 过滤路由
    * */
    function filterRoutes(routes, parent = "") {

        let new_routes = [];

        /* 遍历路由项 */
        for (let i of routes) {

            let prefix = parent; //前缀

            if (keys.indexOf(i.path) !== -1) {

                i.name = i.path; //命名


                /* 更新图标 */
                if (!i.meta) {
                    i.meta = in_routes[i.path];
                }

                /*如果是空或者是根路径*/
                if (prefix == '/' || !prefix) {
                    prefix = prefix + i.path;
                } else {
                    prefix = prefix + '/' + i.path;
                }


                /*
                * 转换用户的首页
                * */
                if (userInfo.index == i.path) {
                    userInfo.index = prefix;
                }


                /* 是否具有子路由 */
                if (!!i.children) {


                    /* 过滤子路由 */
                    i.children = filterRoutes(i.children, prefix);

                    /* 自定重定向到下一个路由 */
                    if (i.children.length > 0) {
                        i.redirect = `${prefix}/${i.children[0].path}`; //重定向到第一个子页面
                    }

                }

                /* 首页重定向到指定的子页面（首页） */
                if (i.path == "/") {
                    index = i;
                }

                new_routes.push(i);
            }

        }

        return new_routes;
    }


    /* 新增路由 */
    used.current = filterRoutes(clone_routes);
    index.redirect = userInfo.index; //指定首页
    used.current.forEach((item) => {
        router.addRoute(item);
    })


    return true;
}


/*
* 清空用户路由表
* */
export function resetRoutes() {

    /* 过滤用户路由 */
    used.current.forEach(item => {
        router.removeRoute(item.name);
    });

    return true;
}