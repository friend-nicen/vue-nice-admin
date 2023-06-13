/*
* @author 友人a丶
* @date 
* 
* */

import {inject} from "vue";
import load from "@/common/load";
import api from "@/service/api";
import axios from "axios";
import iniEdit from './edit';

export default function (props) {

    const table = inject("table"); //重载表格
    const role = inject("role"); //被选中的角色
    const share = iniEdit(); //获取所有表单和数据

    /**
     * 修改用户信息
     */
    const modify = (e) => {

        e.stopPropagation(); //停止事件传播
        share.visible_mod.value = true;
        role.value = props.node;


        share.need_mod.$set({
            id: props.node.key,
            name: props.node.title,
            info: props.node.info,
            index: props.node.index,
            extra_depart: !props.node.extra_depart ? [] : props.node.extra_depart.split(",").map(item => {
                return parseInt(item);
            }),
            extra_role: !props.node.extra_role ? [] : props.node.extra_role.split(",").map(item => {
                return parseInt(item);
            }),
        });

        console.log(share.need_mod.data);
    }


    /**
     * 添加部门
     */
    const add = (e) => {
        e.stopPropagation(); //停止事件传播
        role.value = props.node;
        share.visible_add.value = true;
        share.need_add.data.pid = props.node.key;
    }


    /*
    * 删除指定用户
    * */
    let del = (e) => {

        e.stopPropagation(); //停止事件传播

        load.confirm("将删除这个角色以及他的所有子角色，确定继续操作？", () => {
            /* 显示加载效果 */
            load.loading("加载中...");

            /* 开始请求 */
            axios.post(api.sys.authority.role.del, {
                id: props.node.key
            }).then((res) => {
                /*
                * 判断请求结果
                * */
                if (res.data.code) {
                    load.success(res.data.errMsg);
                    table.loadData(); //刷新数据
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

        })

    }

    return {
        modify,
        del,
        add
    }

}