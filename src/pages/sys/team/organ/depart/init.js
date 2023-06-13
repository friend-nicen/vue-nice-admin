/*
* @author 友人a丶
* @date 
* 
* */

import {computed, inject, provide, ref} from "vue";
import load from "@/common/load";
import axios from "axios";
import api from "@/service/api";
import {getNode, getTree} from "@/common/tree";
import {store} from "@/common";

export default function () {

    const expanded = store([]); //展开
    const tree = inject("tree"); //树形数据
    const department = inject("department");
    const loaded = ref(false); //页面加载状态
    let depart_init = inject("depart_init"); //刷新部门树

    /* 被选部门
    *  */
    const selectedKeys = computed(() => {
        return [!department.value ? null : department.value.key];
    })


    //初始化数据
    depart_init.init = () => {
        /* 显示加载效果 */
        load.loading("加载中...");

        try {
            /* 开始请求 */
            axios.get(api.sys.team.depart.list).then((res) => {
                /*
                * 判断请求结果
                * */
                if (res.data.code) {

                    tree.value = getTree(res.data.data.tree, res.data.data.pid);

                    /*
                      * 如果没有被选中的角色
                      * */
                    if (!department.value && tree.value.length > 0) {
                        department.value = tree.value[0];
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
    provide("table", {loadData: depart_init.init})
    depart_init.init(); //初始化数据


    /*
     * 接口列表
     * */
    const face = {
        list: api.sys.team.depart.list,
        add: api.sys.team.depart.add,
        delete: api.sys.team.depart.del,
        modify: api.sys.team.depart.modify
    };


    return {
        expanded,
        tree,
        face,
        department,
        selectedKeys,
        loaded
    }
}