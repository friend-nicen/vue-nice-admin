/*
* @author 友人a丶
* @date 2022-07-11
*
* 系统设置
* */
import logo from '@/assets/image/logo.svg'

export default {
    logo: logo, //系统logo
    title: "OA协作", //标题
    index: '/dash/index', //默认首页
    login: 1, //登录页面类型 1,传统，2，经典
    /*权限验证模式*/
    auth: {
        mode: 'token', //token、cookie
        token: 'Authorization' //认证头的名字
    },
    layout: {
        showHeadermenu: true  //显示顶部菜单
    }
}