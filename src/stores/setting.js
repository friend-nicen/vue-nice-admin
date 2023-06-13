/*
* @author 友人a丶
* @date 2022-07-11
*
* 系统UI设置状态
* */

import {defineStore} from "pinia";

const setting = defineStore('setting', {
    state() {
        let collapsed = localStorage.getItem("collapsed");
        /*初始数据列表*/
        return {
            collapsed: (collapsed == 'false' || !collapsed) ? false : true,//收缩菜单栏
            collapsedWidth: 70,
            expandWidth: 220
        }
    },
    actions: {
        /*
        * 切换显示
        * */
        toggleCollapsed(flag) {
            localStorage.setItem("collapsed", flag);
            this.collapsed = flag;
        }
    }
})

export default setting;