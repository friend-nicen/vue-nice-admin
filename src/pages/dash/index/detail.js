/*
* 初始化统计信息
* */

import {reactive} from "vue";
import axios from "axios";
import api from "@/service/api";
import load from "@/common/load";

export default function () {

    /*
    * 四项统计数据
    * */
    let data = reactive({
        data: [0,0,0,0]
    })


    axios.get(api.dash.statistics)
        .then((res) => {
            data.data=res.data.data
        }).catch((e) => {
        load.error(e);
    })


    return data;

}