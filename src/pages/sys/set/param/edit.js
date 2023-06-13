/*
* @author 友人a丶
* @date 
* 
* */

import {store} from "@/common";
import {ref} from 'vue'

export default function () {
    /* */
    const form_add = [
        {
            key: 'value',
            type: "input",
            label: "添加的值",
            attr: {
                placeholder: "输入要添加的值"
            }
        },
    ];


    /*数据模板*/
    const need_add = store({
        value: null,
        type: null
    });


    const visible_add = ref(false); //打开窗口


    return {
        need_add,
        form_add,
        visible_add
    }

}