/*
* @author 友人a丶
* @date 
* 表格编辑和新增的配置
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
        name: null,
        path: null,
        pid: null,
        icon: null,
        info: null
    });

    /*新用户添加模板*/
    const form_add = [
        {
            key: 'name',
            type: "input",
            label: "页面名称",
            attr: {
                required: true,
                placeholder: "请输入页面名称",
            }
        },
        {
            key: 'path',
            type: "input",
            label: "页面路径",
            attr: {
                required: true,
                placeholder: "请输入页面路径",
            }
        },
        {
            key: 'icon',
            type: "PickerIcon",
            label: "菜单图标",
            attr: {
                required: true,
                placeholder: "请输入菜单图标",
            }
        },
        {
            key: 'menu',
            type: "radio-button",
            label: "显示到菜单",
            attr: {
                required: true,
                options: [
                    {
                        label: "显示到菜单",
                        value: 1
                    },
                    {
                        label: "不显示到菜单",
                        value: 0
                    }
                ]
            }
        },
        {
            key: 'pid',
            label: "父级节点",
            type: "TreeSelect",
            attr: {
                allowClear: true,
                required: true,
                treeData: tree,
                showSearch:true,filterTreeNode:filterTreeNode,
                placeholder: "请选择父级节点",
                "tree-default-expand-all": true,
                fieldNames: {label: 'title', value: 'key', children: 'children'}
            }
        },
        {
            key: 'info',
            type: "textarea",
            label: "  页面说明",
            attr: {
                required: true,
                autoSize: {minRows: 4, maxRows: 4},
                placeholder: "请输入页面说明"
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