/*
* @author 友人a丶
* @date
*
* */

import {inject, ref} from "vue";
import {store} from "@/common";
import api from "@/service/api";
import load from "@/common/load";
import axios from "axios";
import dayjs from "dayjs";
import initTable from "@/common/init-table";


export default function () {


    const shop = inject("select_shop_doc");

    /*
    * 表格列
    * */
    const columns = [
        {
            "title": "序号",
            "dataIndex": "id",
            "default": true,
            "width": 80,
            "minWidth": 80
        },
        {
            "title": "文档名",
            "dataIndex": "name",
            "default": true,
            "width": 150
        },
        {
            "title": "文档大小",
            "dataIndex": "size",
            "width": 100,
            "minWidth": 100
        },

        {
            "title": "阅读次数",
            "dataIndex": "count",
            "width": 100,
            "minWidth": 100
        },
        {
            "title": "上传人员",
            "dataIndex": "staff",
            "width": 180,
            "minWidth": 180
        },
        {
            "title": "时间",
            "dataIndex": "datetime",
            "width": 180,
            "minWidth": 180
        },
        {
            "title": "操作",
            "width": 50,
            "fixed": "right",
            "minWidth": 50
        },
    ];
    /*
    * 筛选的表单
    * */
    const form = [
        {
            key: 'name',
            type: "input",
            label: "文件名搜索",
            grid: {
                xxl: 24,
                xl: 24,
                lg: 24,
                md: 24,
                sm: 24,
                xs: 24,
            },
            attr: {
                placeholder: "请输入文件名搜索",
            }
        },
    ];


    /* 初始化表格 */
    const table = initTable({
        unique: 'Doc-List-Table',
        column: columns,
        condition: {
            name: null,
            shop: shop.value
        }
    });

    /*数据模板*/
    const need_upload = store({
        shop: shop.value,
        datetime: dayjs().format("YYYY-MM-DD")
    });


    /*新用户添加模板*/
    const form_upload = [
        {
            key: 'datetime',
            type: "input",
            label: "当前时间",
            attr: {
                readOnly: true,
                placeholder: "请选择时间",
                required: true
            }
        },
    ];


    const visible_upload = ref(false); //是否显示修改框


    /*
    * 展示弹出框
    * */
    const showUpload = () => {
        visible_upload.value = true;
    }

    /*
    * 分配的接口
    * */
    const submit_api = api.custom.all.sell.upload_doc;
    const files = ref([]); //待上传的文件

    /*
    * 预览
    * */
    const openLink = (id) => {
        window.open(api.preview + id, "_blank")
    };

    /*
    * 开始上传素材
    * */
    let submit = () => {

        /*
        * 文件检测
        * */
        if (files.value.length === 0) {
            load.error("尚未选择文件")
            return;
        }


        load.loading("正在上传...");

        let form = new FormData(); //blob对象

        /*
        * 添加文件
        * */
        for (let i of files.value) {
            form.append("assets[]", i); //文件对象
        }


        form.append("shop", shop.value); //店铺


        return new Promise(resolve => {

            try {
                axios.post(submit_api, form, {
                    headers: {
                        "Content-type": " multipart/form-data"
                    }
                }).then((res) => {
                    if (res.data.code) {
                        load.success(res.data.errMsg);
                        resolve(true);//成功
                    } else {
                        load.error(res.data.errMsg);
                    }
                }).catch(e => {
                    load.error(e);
                }).finally(() => {
                    load.loaded();
                })
            } catch (e) {
                load.error(e)
            }

        })

    }


    /*
    * 删除已上传的文件
    * */
    const del_file = (id) => {
        load.confirm("删除这个文件？", () => {
            /* 显示加载效果 */
            load.loading("加载中...");

            try {
                /* 开始请求 */
                axios.post(api.custom.all.sell.del_doc, {
                    doc: id
                }).then((res) => {
                    /*
                    * 判断请求结果
                    * */
                    if (res.data.code) {
                        load.success(res.data.errMsg);
                        table.loadData(); //表格刷新
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

        })
    }


    return {
        form_upload,
        need_upload,
        visible_upload,
        showUpload,
        submit_api,
        files,
        submit,
        openLink,
        columns,
        del_file,
        form,
        table
    };

}