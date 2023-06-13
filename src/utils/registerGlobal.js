/*
* @author 友人a丶
* @date 
* 注册Vue全局方法
* */

import user from "@/stores/user";

/**
 * 注册vue的全局方法
 * @param app {object}
 */
export default function (app,) {


    let userInfo = null; //用来保存用户的数据

    /**
     * 判断用户是否具有权限
     * @param  permiss {array}
     * @return {boolean}
     */
    const auth = (permiss, or = false) => {

        /*
        * 类型转换
        * */
        if (!Array.isArray(permiss)) {
            permiss = [permiss];
        }

        /*
        * 获取用户信息
        * */
        if (!userInfo) {
            userInfo = user();
        }

        /*
        * 用户没有权限
        * */
        if (!userInfo.permissions && userInfo.permissions.length == 0) {
            return false;
        }

        /*
        * 与还是或
        * */
        if (or) {

            for (let i = 0; i < permiss.length; i++) {
                if (userInfo.permissions.indexOf(permiss[i]) > -1) {
                    return true;
                }
            }

            return false;

        } else {

            for (let i = 0; i < permiss.length; i++) {
                if (userInfo.permissions.indexOf(permiss[i]) === -1) {
                    return false;
                }
            }

            return true;
        }

    }


    app.config.globalProperties.$auth = auth;


    return auth;
}