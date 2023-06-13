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
    let depart_init = inject("depart_init"); //刷新部门树
    const share = iniEdit(); //获取所有表单和数据

    /**
     * 修改用户信息
     */
    const modify = () => {
        share.visible_mod.value = true;
        share.need_mod.$set(props.source.record);
    }

    /**
     * 密码修改
     */
    const modify_pass = () => {
        share.visible_password.value = true;
        share.need_password.$set({
            id: props.source.record.id,
            password: null
        });
    }


    /*
    * 删除指定用户
    * */
    const del = () => {

        load.confirm("确定删除该用户吗？", () => {
            /* 显示加载效果 */
            load.loading("加载中...");

            /* 开始请求 */
            axios.post(api.sys.team.staff.del, {
                id: props.source.record.id
            }).then((res) => {
                /*
                * 判断请求结果
                * */
                if (res.data.code) {
                    load.success(res.data.errMsg);
                    table.loadData(); //刷新数据
                    depart_init.init(); //刷新右侧部门树
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
        modify_pass
    }

}