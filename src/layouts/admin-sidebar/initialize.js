
/*
* 侧边栏用到的一些东西
* */
import setting from "@/stores/setting";
import enquire from "enquire.js";
import {storeToRefs} from "pinia";



export default function () {

    let sets=setting(); //获取设置


    let {
        collapsed,
        collapsedWidth,
        expandWidth
    } = storeToRefs(sets);

    /*收缩菜单*/
    let toggleCollapsed = () => {
        sets.toggleCollapsed(!collapsed.value);
    }

    /*
    * 匹配屏幕大小的变化
    * */
    enquire.register("screen and (max-width: 1100px)", {
        match() {
            sets.toggleCollapsed(true);
        },
        unmatch() {
            sets.toggleCollapsed(false);
        }
    });

    return {
        collapsed,
        collapsedWidth,
        expandWidth,
        toggleCollapsed
    }
}