/*
* @author 友人a丶
* @date 
* 
* */

import {inject, onUnmounted, ref, watch} from "vue";
import {filterOptions, filterTreeNode, store} from "@/common";
import load from "@/common/load";
import axios from "axios";
import api from "@/service/api";
import {getTree} from "@/common/tree";

const share = {data: null}; //共享数据

export default function () {

    /*
    * 如果已经被初始化，直接返回
    * */
    if (share.data) {
        return share.data;
    }

    /*
    * 清理全局函数
    * */
    onUnmounted(() => {
        share.data = null;
    })


    //被选的角色
    const role = inject("role");
    //树形数据
    const tree = ref([]);
    const depart = ref([]);
    const roles = ref([]);


    //初始化数据
    const init = () => {

        /* 显示加载效果 */
        load.loading("加载中...");

        try {
            /* 开始请求 */
            axios.post(api.sys.authority.access.raw + `?role=${role.value.key}&parent=0`)
                .then((res) => {
                    /*
                    * 判断请求结果
                    * */
                    if (res.data.code) {

                        tree.value = getTree(res.data.data, null, 'key');

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

        load.loading("加载中...");

        try {
            /* 开始请求 */
            axios.get(api.sys.authority.role.depart)
                .then((res) => {
                    /*
                    * 判断请求结果
                    * */
                    if (res.data.code) {

                        depart.value = getTree(res.data.data.tree, res.data.data.pid, 'key');

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


        load.loading("加载中...");

        try {
            /* 开始请求 */
            axios.get(api.sys.authority.role.list_raw)
                .then((res) => {
                    /*
                    * 判断请求结果
                    * */
                    if (res.data.code) {
                        roles.value = res.data.data;
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

    }


    /*数据模板*/
    const need_add = store({
        pid: null,
        name: null,
        info: null,
        index: null,
        extra_depart: [],
        extra_role: []
    });


    /*新用户添加模板*/
    const form_add = [
        {
            key: 'name',
            type: "input",
            label: "角色名称",
            attr: {
                required: true,
                placeholder: "请输入角色名称",
            }
        },
        {
            key: 'index',
            label: "默认首页",
            type: "TreeSelect",
            attr: {
                allowClear: true,
                required: true,
                treeData: tree,
                showSearch: true, filterTreeNode: filterTreeNode,
                placeholder: "请选择默认的首页",
                "tree-default-expand-all": true,
                fieldNames: {label: 'title', value: 'key', children: 'children'}
            }
        },
        {
            key: 'extra_depart',
            label: "额外权限",
            type: "TreeSelect",
            attr: {
                treeCheckable: true,
                allowClear: true,
                treeData: depart,
                showSearch: true, filterTreeNode: filterTreeNode,
                "showCheckedStrategy": "SHOW_PARENT",
                placeholder: "请选择该角色额外可访问的组织",
                "tree-default-expand-all": true,
                fieldNames: {label: 'title', value: 'key', children: 'children'}
            }
        },
        {
            key: 'extra_role',
            label: "额外权限",
            type: "select",
            attr: {
                options: roles,
                showSearch: true,
                mode: "multiple",
                maxTagCount: 2,
                placeholder: "请选择角色额外可操作的角色",
                filterOption: filterOptions,
            }
        },

        {
            key: 'info',
            type: "textarea",
            label: "  角色说明",
            attr: {
                required: true,
                autoSize: {minRows: 4, maxRows: 4},
                placeholder: "请输入角色说明"
            }
        }
    ];


    /*数据模板*/
    const need_mod = store({});
    /*新用户添加模板*/
    const form_mod = form_add;


    const visible_add = ref(false); //是否显示修改框
    const visible_mod = ref(false); //是否显示修改框


    /*
    * 显示已选项
    * */
    watch(() => visible_add, () => {
        if (visible_add.value) {
            init(); //刷新数据
        }
    }, {
        deep: true
    })

    /*
    * 显示已选项
    * */
    watch(() => visible_mod, () => {
        if (visible_mod.value) {
            init(); //刷新数据
        }
    }, {
        deep: true
    })

    /*
    * 记录数据
    * */
    share.data = {
        visible_add,
        visible_mod,
        form_add,
        need_add,
        form_mod,
        need_mod
    }

    return share.data;

}