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
        route: null,
        info: null,
        api: null
    });

    /*新用户添加模板*/
    const form_add = [
        {
            key: 'name',
            type: "input",
            label: "权限名称",
            attr: {
                required: true,
                placeholder: "请输入权限名称",
            }
        },
        {
            key: 'api',
            type: "input",
            label: "关联的接口",
            attr: {
                required: false,
                placeholder: "请输入关联的接口",
            }
        },
        {
            key: 'route',
            label: "所属页面",
            type: "TreeSelect",
            attr: {
                allowClear: true,
                required: true,
                treeData: tree,
                showSearch:true,filterTreeNode:filterTreeNode,
                placeholder: "请选择权限所属页面",
                "tree-default-expand-all": true,
                fieldNames: {label: 'title', value: 'key', children: 'children'}
            }
        },
        {
            key: 'info',
            type: "textarea",
            label: "  权限说明",
            attr: {
                required: true,
                autoSize: {minRows: 4, maxRows: 4},
                placeholder: "请输入权限说明"
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
        need_mod,
        tree
    }

    return share.data;

}