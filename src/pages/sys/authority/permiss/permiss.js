/*
* @author 友人a丶
* @date 
* 
* */
import initTable from "@/common/init-table";
import api from "@/service/api";
import load from "@/common/load";
import axios from "axios";
import {getTree} from "@/common/tree";
import {ref} from "vue";

export default function () {


    // 树形数据
    const tree = ref([]); //树形数据


    //初始化数据
    const init = () => {
        /* 显示加载效果 */
        load.loading("加载中...");

        try {
            /* 开始请求 */
            axios.get(api.sys.authority.routes.raw)
                .then((res) => {
                    /*
                    * 判断请求结果
                    * */
                    if (res.data.code) {

                        tree.value = getTree(res.data.data, null);

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
        } catch (e) {
            console.log(e)
            load.error(e);
        }
    }

    init(); //初始化数据


    /*
    * 初始化表头
    * */
    const columns = [
        {
            title: "ID",
            dataIndex: 'id',
            width: 60,
        },
        {
            title: "名称",
            dataIndex: 'name',
            width: 100,
        },
        {
            title: "说明",
            dataIndex: 'info',
            width: 100,
        },
        {
            title: "关联页面",
            dataIndex: 'page',
            width: 120,
        },
        {
            title: "关联接口",
            dataIndex: 'api',
            width: 120,
        },
        {
            title: "添加时间",
            dataIndex: 'datetime',
            width: 120,
            sortable: 'dayjs'
        },
        {
            title: "操作",
            fixed: "right",
            width: 100
        }
    ];


    const table = initTable({
        unique: 'Sys-Permiss-Table',
        column: columns,
        condition: {
            name: null,
            route: null,
            api: null
        },
    }); //初始化表格

    /*
    * 接口列表
    * */
    const face = {
        list: api.sys.authority.permiss.list,
        add: api.sys.authority.permiss.add,
        delete: api.sys.authority.permiss.delete,
        modify: api.sys.authority.permiss.modify
    };


    return {
        face,
        table,
        tree
    };

}
