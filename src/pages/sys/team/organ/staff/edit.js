/*
* @author 友人a丶
* @date 
* 
* */

import {inject, onUnmounted, ref} from "vue";
import {filterTreeNode, store} from "@/common";
import load from "@/common/load";
import axios from "axios";
import api from "@/service/api";
import {getTree} from "@/common/tree";


let share = {data: null}; //共享数据

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

    const tree = inject("tree");
    const roles = ref([]); //角色树


    //初始化数据
    const init = () => {
        /* 显示加载效果 */
        load.loading("加载中...");

        try {

            /* 开始请求 */
            axios.get(api.sys.team.staff.roles).then((res) => {
                /*
                * 判断请求结果
                * */
                if (res.data.code) {

                    roles.value = getTree(res.data.data.tree, res.data.data.pid);

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
    init(); //初始化角色树


    /*数据模板*/
    const need_add = store({
        username: null,
        password: null,
        role: null,
        depart: null,
        nickname: null
    });


    /*新用户添加模板*/
    const form_add = [
        {
            key: 'username',
            type: "input",
            label: "手机号",
            attr: {
                required: true,
                placeholder: "请输入手机号",
            }
        },
        {
            key: 'password',
            type: "input",
            label: "登录密码",
            attr: {
                required: true,
                placeholder: "请输入登录密码",
            }
        },
        {
            key: 'nickname',
            type: "input",
            label: "用户昵称",
            attr: {
                required: true,
                placeholder: "请输入用户昵称",
            }
        },
        {
            key: 'depart',
            label: "所在部门",
            type: "TreeSelect",
            attr: {
                allowClear: true,
                treeData: tree,
                showSearch:true,filterTreeNode:filterTreeNode,
                required: true,
                placeholder: "请选择所在部门",
                "tree-default-expand-all": true,
                fieldNames: {label: 'title', value: 'key', children: 'children'}
            }
        },
        {
            key: 'role',
            label: "用户角色",
            type: "TreeSelect",
            attr: {
                allowClear: true,
                showSearch:true,filterTreeNode:filterTreeNode,
                treeData: roles,
                required: true,
                placeholder: "请选择用户角色",
                "tree-default-expand-all": true,
                fieldNames: {label: 'title', value: 'key', children: 'children'}
            }
        },
    ];


    /*数据过滤*/
    const filter = [

        {
            key: 'nickname',
            type: "input",
            label: "用户昵称",
            attr: {
                placeholder: "请输入用户昵称",
            }
        },
        {
            key: 'role',
            label: "用户角色",
            type: "TreeSelect",
            attr: {
                allowClear: true,
                showSearch:true,filterTreeNode:filterTreeNode,
                treeData: roles,
                placeholder: "请选择用户角色",
                "tree-default-expand-all": true,
                fieldNames: {label: 'title', value: 'key', children: 'children'}
            }
        },
        {
            key: 'status',
            type: "radio-button",
            label: "用户状态",
            attr: {
                options: [
                    {
                        label: "全部",
                        value: "0"
                    },
                    {
                        label: "在职",
                        value: "1"
                    },
                    {
                        label: "离职",
                        value: "2"
                    }
                ]
            }
        },
    ];


    /*数据模板*/
    const need_mod = store({});
    /*新用户添加模板*/
    const form_mod = [
        {
            key: 'username',
            type: "input",
            label: "手机号",
            attr: {
                allowClear: false,
                required: true,
                placeholder: "请输入手机号",
            }
        },
        {
            key: 'nickname',
            type: "input",
            label: "用户昵称",
            attr: {
                required: true,
                placeholder: "请输入用户昵称",
            }
        },
        {
            key: 'status',
            type: "select",
            label: "用户状态",
            attr: {
                placeholder: "请选择用户状态",
                required: true,
                options: [
                    {
                        label: "在职",
                        value: 1
                    },
                    {
                        label: "已离职",
                        value: 2
                    }
                ]
            }
        },
        {
            key: 'depart',
            label: "所在部门",
            type: "TreeSelect",
            attr: {
                allowClear: true,
                treeData: tree,
                showSearch:true,filterTreeNode:filterTreeNode,
                required: true,
                placeholder: "请选择所在部门",
                "tree-default-expand-all": true,
                fieldNames: {label: 'title', value: 'key', children: 'children'}
            }
        },
        {
            key: 'role',
            label: "用户角色",
            type: "TreeSelect",
            attr: {
                allowClear: true,
                treeData: roles,
                showSearch:true,filterTreeNode:filterTreeNode,
                required: true,
                placeholder: "请选择用户角色",
                "tree-default-expand-all": true,
                fieldNames: {label: 'title', value: 'key', children: 'children'}
            }
        },
    ];


    /*数据模板*/
    const need_password = store({});


    /*新用户添加模板*/
    const form_password = [
        {
            key: 'password',
            type: "input-password",
            label: "用户密码",
            attr: {
                required: true,
                placeholder: "请输入新的用户密码",
            }
        }
    ];


    const visible_add = ref(false); //是否显示修改框
    const visible_mod = ref(false); //是否显示修改框
    const visible_password = ref(false); //是否显示修改框

    /*
    * 记录数据
    * */
    share.data = {
        visible_add,
        visible_mod,
        visible_password,
        form_password,
        need_password,
        form_add,
        need_add,
        form_mod,
        need_mod,
        filter
    }


    return share.data;

}