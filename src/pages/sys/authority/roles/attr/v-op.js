/*
* @author 友人a丶
* @date 
* 
* */

import {inject, reactive} from "vue";
import load from "@/common/load";
import api from "@/service/api";
import axios from "axios";


/*操作*/
export const delBatch = reactive({op: null});

export default function (props) {

    const table = inject("table"); //重载表格
    const role = inject("role");


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
            axios.post(api.sys.authority.access.del, {
                route: data,
                role: role.value.key
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
        del
    }

}