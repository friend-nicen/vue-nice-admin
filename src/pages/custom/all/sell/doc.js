/*
* @author 友人a丶
* @date 
* 
* */

import {provide, ref} from 'vue'


export default function () {

    const visible_doc = ref(false);
    const select_shop_doc = ref(null);
    provide("select_shop_doc", select_shop_doc);

    const showDoc = (id) => {
        visible_doc.value = true;
        select_shop_doc.value = id;
    }

    return {
        visible_doc,
        showDoc
    }
}