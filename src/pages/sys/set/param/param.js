import initTable from "@/common/init-table";
import load from "@/common/load";
import axios from "axios";
import api from "@/service/api";

/*表格列配置*/
const columns = [
    {
        title: '选项值',
        default: true,
        dataIndex: 'value'
    },
    {
        title: '删除',
        width: 50,
        minWidth: 50,
        maxWidth: 50,
        default: true
    },
];


/*
* 用户信息初始化
* */
export default function () {


    const table = initTable({
        unique: 'Param--Table',
        column: columns
    })


    /*
    * 删除选项
    * */
    const del = (record) => {

        load.confirm("确定删除该选项吗？", () => {
            /* 显示加载效果 */
            load.loading("加载中...");

            /* 开始请求 */
            axios.post(api.sys.set.del_param, {
                id: record.id
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

    return del;

}


