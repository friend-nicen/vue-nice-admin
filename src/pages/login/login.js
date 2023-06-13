/*
* @author 友人a丶
* @date 2022-07-11
* */


import load from "@/common/load";
import {login as toLogin} from "@/service/requests";
import {router} from "@/router";
import user from "@/stores/user";
import {ref} from "vue";

export default function () {

    console.log("登录")
    /*
    * 用户信息
    * */
    let username = ref(localStorage.getItem('username') ? localStorage.getItem('username') : '');
    let password = ref(localStorage.getItem('password') ? localStorage.getItem('password') : '');

    let loading = ref(false);
    let userInfo = user();


    let mode = ref(1); //登录对象

    /*
    * 请求登录
    * */
    let login = async () => {


        if (username.value == '' || password.value == "") {
            load.loaded();
            load.error("用户名和密码不能为空！");
            return
        }

        load.loading("正在登录.......");
        loading.value = true;


        let result = await toLogin({
            username: username.value,
            password: password.value
        }, mode.value);


        /*判断登录结果*/
        if (result.code) {

            localStorage.setItem('username', username.value);
            localStorage.setItem('password', password.value)

            userInfo.save(result.data);
            router.replace("/"); //跳转首页


        } else {
            load.error(result.errMsg)
        }

        load.loaded();//隐藏加载
        loading.value = false;

    }


    return {
        username,
        password,
        login,
        loading,
        mode
    }

}