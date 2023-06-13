/*
* @author 友人a丶
* @date 
* 
* */

import {provide, ref} from 'vue'

export default function () {

    const visible_server = ref(false);
    const select_shop = ref(null);
    provide("select_shop", select_shop);

    const showServers = (id) => {
        visible_server.value = true;
        select_shop.value = id;
    }

    return {
        visible_server,
        showServers
    }
}