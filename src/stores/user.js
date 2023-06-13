/*
* @author 友人a丶
* @date 2022-07-11
*
* 保存登录后的用户信息
* */

import {defineStore} from "pinia";
import Cookies from "js-cookie";
import config from "@/config";


export default defineStore('user', {
    state() {
        /*初始数据列表*/
        return {
            nickname: null, //昵称
            username: null,
            token: null, //如果有token
            index: null, //默认的首页
            permissions: [], //权限集合
            routes: [], //路由页面
            expireAt: null, //token有效时间
            role: {
                id: "",
                name: ""
            },
            /* 组织信息 */
            depart: {
                id: "",
                name: ""
            }
        }
    },
    actions: {
        /*
        * 保存用户信息
        * */
        save(state) {

            /* 没有指定首页时，使用默认的首页 */
            if (!state.index) {
                state.index = config.index;
            }

            this.$state = state;//保存用户信息

            /*如果是token模式*/
            if (config.auth.mode == "token") {
                Cookies.set(config.auth.token, state.token, {expires: state.expireAt}); //保存token
            }
        }
    }
})