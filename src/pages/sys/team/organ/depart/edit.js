/*
* @author 友人a丶
* @date 
* 
* */

import {onUnmounted, ref} from "vue";
import {filterTreeNode, store} from "@/common";

let share = {data: null}; //共享数据

export default function (tree) {

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


    /*数据模板*/
    const need_add = store({
        pid: null,
        name: null,
        remarks: null
    });


    /*新用户添加模板*/
    const form_add = [
        {
            key: 'name',
            type: "input",
            label: "部门名称",
            attr: {
                required: true,
                placeholder: "请输入部门名称",
            }
        },
        {
            key: 'remarks',
            type: "input",
            label: "部门类型",
            attr: {
                placeholder: "请输入部门类型",
            }
        }
    ];


    /*数据模板*/
    const need_mod = store({});
    /*新用户添加模板*/
    const form_mod = [
        {
            key: 'name',
            type: "input",
            label: "部门名称",
            attr: {
                required: true,
                placeholder: "请输入部门名称",
            }
        },
        {
            key: 'pid',
            label: "上级部门",
            type: "TreeSelect",
            attr: {
                allowClear: true,
                treeData: tree,
                showSearch:true,filterTreeNode:filterTreeNode,
                placeholder: "请选择上级部门",
                "tree-default-expand-all": true,
                fieldNames: {label: 'title', value: 'key', children: 'children'}
            }
        },
        {
            key: 'remarks',
            type: "input",
            label: "部门类型",
            attr: {
                placeholder: "请输入部门类型",
            }
        }
    ];


    const visible_add = ref(false); //是否显示修改框
    const visible_mod = ref(false); //是否显示修改框


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