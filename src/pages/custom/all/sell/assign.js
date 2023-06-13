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
    const need_assign = store({
        shop: null,
        staff: [],
        depart: null,
        subs: null
    });


    const options = ref([]); //被选员工
    const sub_lists = ref([]); //被选员工

    /*
    * 同步选定部门的员工
    * */
    watch(() => need_assign.data.depart, () => {


        if (!need_assign.data.depart) return;

        /* 显示加载效果 */
        load.loading("加载中...");

        try {


            /* 开始请求 */
            axios.get(api.custom.all.sell.staff + `?depart=${need_assign.data.depart}`)
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

    /*
    * 同步子账号
    * */
    const sync_sub_lists = () => {

        /* 显示加载效果 */
        load.loading("加载中...");

        try {


            /* 开始请求 */
            axios.get(api.custom.all.sell.sub_lists + `?shop=${need_assign.data.shop}`)
                .then((res) => {
                    /*
                    * 判断请求结果
                    * */
                    if (res.data.code) {
                        sub_lists.value = res.data.data;
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

    };

    /*新用户添加模板*/
    const form_assign = [
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
            label: "指定客服",
            attr: {
                showSearch: true,
                mode: "multiple",
                maxTagCount: 2,
                placeholder: "请选择分配给哪个客服",
                filterOption: filterOptions,
                required: true,
                options: options
            }
        },
        {
            key: 'subs',
            type: "select",
            label: "指定子账号",
            attr: {
                showSearch: true,
                placeholder: "请选择分配的子账号",
                filterOption: filterOptions,
                options: sub_lists
            }
        },
    ];


    const visible_assign = ref(false); //是否显示修改框

    /*
    * 查看客户详细
    * */
    const showCanAssign = (id) => {
        need_assign.reset();
        need_assign.data.shop = id;
        sync_sub_lists(); //同步子账号
        visible_assign.value = true;
    }

    /*
    * 依赖注入
    * */
    provide("showCanAssign", showCanAssign);

    /*
    * 分配的接口
    * */
    const assign_api = api.custom.all.sell.assign;

    return {
        form_assign,
        need_assign,
        visible_assign,
        assign_api
    };

}