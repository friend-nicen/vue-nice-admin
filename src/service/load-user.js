/*
* @author 友人a丶
* @date 2022-07-11
*
* 初始化用户信息
* */


import load from "@/common/load";
import {login} from "@/service/requests";
import user from "@/stores/user";
import systems from "@/stores/system";


export default async function () {


    load.loading("系统正在初始化....");
    console.log("加载用户信息...");

    const result = await login(); //请求初始化登录
    load.loaded(); //加载完毕


    /*
    * 标记系统初始化完毕
    * */
    systems.loaded=true;//已初始化

    /*
    * 获取成功
    * 保存用户信息
    * */
    if (result.code) {
        user().save(result.data);
        return true;
    }


    return false;

}