/*
* @author 友人a丶
* @date 
* 
* */

import {provide, ref} from 'vue'


export default function () {

    const visible_sub = ref(false);
    const select_shop_sub = ref(null);
    provide("select_shop_sub", select_shop_sub);

    const showSubAccount = (id) => {
        visible_sub.value = true;
        select_shop_sub.value = id;
    }

    return {
        visible_sub,
        showSubAccount
    }
}