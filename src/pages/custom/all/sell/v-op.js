/*
* @author 友人a丶
* @date 
* 
* */

import {inject} from "vue";
import load from "@/common/load";
import api from "@/service/api";
import axios from "axios";


export default function (props) {

    const table = inject("table"); //重载表格
    const showCanAssign = inject('showCanAssign'); //显示分配框
    const showCanMove = inject('showCanMove'); //显示分配框
    const showCanModify = inject('showCanModify'); //显示分配框
    const showCanFinance = inject('showCanFinance'); //显示分配框


    /*
    * 删除指定用户
    * */
    const del = () => {

        load.confirm("确定删除该店铺吗？", () => {
            /* 显示加载效果 */
            load.loading("加载中...");

            /* 开始请求 */
            axios.post(api.custom.all.sell.del, {
                id: props.source.record.id
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
        del,
        showCanAssign,
        showCanMove,
        showCanModify,
        showCanFinance
    }

}