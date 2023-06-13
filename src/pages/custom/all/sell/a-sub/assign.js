/*
* @author 友人a丶
* @date
*
* */

import {inject, ref} from "vue";
import {store} from "@/common";
import api from "@/service/api";
import {filterOptions} from "@/common";


export default function (sub_lists) {


    const shop = inject("select_shop_sub");

    /*数据模板*/
    const need_assign = store({
        staff: null,
        subs: null,
        shop: shop.value
    });


    /*新用户添加模板*/
    const form_assign = [
        {
            key: 'staff',
            type: "select",
            label: "指定客服",
            data: api.custom.all.sell.server_list + "?shop=" + shop.value,
            attr: {
                showSearch: true,
                placeholder: "请选择分配给哪个客服",
                filterOption: filterOptions,
                required: true
            }
        },
        {
            key: 'subs',
            type: "select",
            label: "指定子账号",
            attr: {
                showSearch: true,
                required: true,
                placeholder: "请选择分配的子账号",
                filterOption: filterOptions,
                options: sub_lists
            }
        },
    ];


    const visible_assign = ref(false); //是否显示修改框


    /*
    * 展示弹出框
    * */
    const showAssign = () => {
        visible_assign.value = true;
        need_assign.data.staff = null;
        need_assign.data.subs = null;
    }

    /*
    * 分配的接口
    * */
    const assign_api = api.custom.all.sell.assign_sub;

    return {
        form_assign,
        need_assign,
        visible_assign,
        assign_api,
        showAssign
    };

}