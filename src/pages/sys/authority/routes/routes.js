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
import {provide, ref} from "vue";

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

    /* 向下提供方法 */
    provide("tree", {loadData: init})
    init(); //初始化数据


    /*
    * 初始化表头
    * */
    const columns = [
        {
            title: "路径",
            dataIndex: 'path',
            width: 200,
        },
        {
            title: "名称",
            dataIndex: 'name',
            width: 100,
        },
        {
            title: "菜单图标",
            dataIndex: 'icon',
            width: 100,
        },
        {
            title: "显示到菜单",
            dataIndex: 'menu',
            width: 100,
        },
        {
            title: "说明",
            dataIndex: 'info',
            width: 240,
        },
        {
            title: "关联权限",
            dataIndex: 'permission',
            width: 120,
        },
        {
            title: "添加时间",
            dataIndex: 'datetime',
            width: 150,
        },
        {
            title: "操作",
            fixed: "right",
            width: 100
        }
    ];


    /*
    * 接口数据处理
    * */
    const filter = (data) => {
        return {
            data: getTree(data, null, "id")
        };
    }


    const table = initTable({
        unique: 'Sys-Routes-Table',
        column: columns,
        condition: {
            name: ""
        },
        filter: filter
    }); //初始化表格


    /*
    * 改变菜单显示状态
    * */
    const change = (id) => {

        /* 显示加载效果 */
        load.loading("加载中...");

        try {
            /* 开始请求 */
            axios.get(api.sys.authority.routes.set_menu + `?id=${id}`).then((res) => {
                /*
                * 判断请求结果
                * */
                if (res.data.code) {
                    load.success("设置成功！");
                    table.loadData(); //刷新表格
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


    /*
    * 接口列表
    * */
    const face = {
        list: api.sys.authority.routes.list,
        add: api.sys.authority.routes.add,
        delete: api.sys.authority.routes.delete,
        modify: api.sys.authority.routes.modify
    };

    return {
        face,
        table,
        tree,
        loadTree: init,
        change
    };

}
