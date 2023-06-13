/*
* @author 友人a丶
* @date 
* 角色树
* */

import {computed, inject, provide, ref} from "vue";
import load from "@/common/load";
import axios from "axios";
import api from "@/service/api";
import {getNode, getTree} from "@/common/tree";
import {store} from "@/common";


export default function () {

    const expanded = store([]); //展开
    const tree = ref([]); //树形数据
    const role = inject("role");//当前被选中的角色
    const loaded = ref(false); //页面加载状态


    /* 被选角色
    *  */
    const selectedKeys = computed(() => {
        return [!role.value ? null : role.value.key];
    })


    //初始化数据
    const init = () => {
        /* 显示加载效果 */
        load.loading("加载中...");

        try {
            /* 开始请求 */
            axios.get(api.sys.authority.role.list).then((res) => {
                /*
                * 判断请求结果
                * */
                if (res.data.code) {

                    tree.value = getTree(res.data.data.tree, res.data.data.pid);

                    /*
                    * 如果没有被选中的角色
                    * */
                    if (!role.value && tree.value.length > 0) {
                        role.value = tree.value[0];
                    }

                    /*
                    * 默认展开所有节点
                    * */
                    if (expanded.data.length === 0) {
                        expanded.data = getNode(tree.value); //可展开的节点
                    }

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
                loaded.value = true;
            });
        } catch (e) {
            console.log(e)
            load.error(e);
        }
    }

    /* 向下提供方法 */
    provide("table", {loadData: init})
    init(); //初始化数据


    /*
     * 接口列表
     * */
    const face = {
        list: api.sys.authority.role.list,
        add: api.sys.authority.role.add,
        delete: api.sys.authority.role.del,
        modify: api.sys.authority.role.modify
    };


    return {
        expanded,
        tree,
        face,
        role,
        loaded,
        selectedKeys
    }
}