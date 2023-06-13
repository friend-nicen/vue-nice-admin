/*
* @author 友人a丶
* @date 
* 
* */

import {inject, reactive} from "vue";
import load from "@/common/load";
import api from "@/service/api";
import axios from "axios";
import iniEdit from './edit';


/*操作*/
export const delBatch = reactive({op: null});

export default function (props) {

    let table = inject("table"); //重载表格
    let tree = inject("tree"); //重载部门树
    let share = iniEdit(); //获取所有表单和数据


    /**
     * 修改用户信息
     */
    let modify = () => {
        share.visible_mod.value = true;
        share.need_mod.$set(props.source.record);
        tree.loadData(); //重载部门树
    }


    /*
    * 删除指定用户
    * */
    let del = (list = null) => {

        load.confirm("确定删除这些页面吗？", () => {
            /* 显示加载效果 */
            load.loading("加载中...");

            let data = null; //待提交的数据

            if (!list) {
                data = [props.source.record.id];
            } else {
                data = list;
            }

            /* 开始请求 */
            axios.post(api.sys.authority.routes.del, {
                id: data
            }).then((res) => {
                /*
                * 判断请求结果
                * */
                if (res.data.code) {
                    load.success(res.data.errMsg);
                    table.loadData(); //刷新数据
                    tree.loadData(); //重载部门树
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


    /*
    * 伤批量删除
    * */
    delBatch.op = () => {
        /*
        * 数量判断
        * */
        if (table.selectRows.rows.length === 0) {
            load.error("尚未选择！")
            return;
        }

        del(table.selectRows.keys); //批量删除

    }


    return {
        modify,
        del
    }

}