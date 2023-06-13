/*
* @author 友人a丶
* @date
*
* */

import {provide, ref, watch} from "vue";
import {filterTreeNode, store} from "@/common";
import axios from "axios";
import load from "@/common/load";
import api from "@/service/api";
import {filterOptions} from "@/common";


export default function () {


    /*数据模板*/
    const need_finance = store({
        shop: null,
        staff: null,
        depart: null
    });


    const options = ref([]); //被选员工

    /*
    * 同步选定部门的员工
    * */
    watch(() => need_finance.data.depart, () => {


        if (!need_finance.data.depart) return;

        /* 显示加载效果 */
        load.loading("加载中...");

        try {
            /* 开始请求 */
            axios.get(api.custom.all.sell.staff + `?depart=${need_finance.data.depart}`)
                .then((res) => {
                    /*
                    * 判断请求结果
                    * */
                    if (res.data.code) {
                        options.value = res.data.data;
                    } else {
                        /* 弹出错误原因 */
                        load.error(res.data.errMsg);
                    }
                }).catch((e) => {
                /* 弹出错误原因 */
                load.error(e.message);
            }).finally(() => {
                /* 关闭加载效果 */
                load.loaded();
            });

        } catch (e) {
            console.log(e)
            load.error(e);
        }

    })


    /*新用户添加模板*/
    const form_finance = [
        {
            key: 'depart',
            label: "所属部门",
            type: "TreeSelect",
            data: api.custom.all.sell.depart,
            attr: {
                allowClear: true,
                showSearch: true, filterTreeNode: filterTreeNode,
                placeholder: "请选择所属部门",
                "tree-default-expand-all": true,
                fieldNames: {label: 'title', value: 'key', children: 'children'}
            }
        },
        {
            key: 'staff',
            type: "select",
            label: "指定财务",
            attr: {
                showSearch: true,
                placeholder: "请选择分配给哪个财务",
                filterOption: filterOptions,
                required: true,
                options: options
            }
        },
    ];


    const visible_finance = ref(false); //是否显示修改框

    /*
    * 查看客户详细
    * */
    const showCanFinance = (id) => {
        need_finance.reset();
        need_finance.data.shop = id;
        visible_finance.value = true;
    }

    /*
    * 依赖注入
    * */
    provide("showCanFinance", showCanFinance);

    /*
    * 分配的接口
    * */
    const finance_api = api.custom.all.sell.finance;

    return {
        form_finance,
        need_finance,
        visible_finance,
        finance_api
    };

}