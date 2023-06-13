/* 筛选表单 */
import {store} from "@/common";
import {ref} from "vue";
import axios from "axios";
import load from "@/common/load";
import api from "@/service/api";

export default function () {


    const loaded = ref(false); //加载状态

    const grid = {
        xxl: 6,
        xl: 6,
        lg: 8,
        md: 10,
        sm: 12,
        xs: 24,
    }; //布局


    const data = store({
        basic: null, //基础询单
        fee: null, //费率
        exceed: null, //超单
    });


    /*
    * 表单
    * */
    const filter = [
        {
            key: 'basic',
            type: "input-number",
            label: "系统设置1",
            attr: {
                required: true,
                placeholder: "请输入系统设置1",
            }
        },
        {
            key: 'fee',
            type: "input-number",
            label: "系统设置2",
            attr: {
                required: true,
                placeholder: "请输入系统设置12",
            }
        },
        {
            key: 'exceed',
            type: "input-number",
            label: "系统设置3",
            attr: {
                required: true,
                placeholder: "请输入系统设置4",
            }
        },
    ];


    /*
    * 加载配置
    * */
    const loadConfig = () => {
        /* 显示加载效果 */
        load.loading("加载中...");

        try {
            /* 开始请求 */
            axios.get(api.sys.set.get_configs)
                .then((res) => {
                    /*
                    * 判断请求结果
                    * */
                    if (res.data.code) {
                        data.$set(res.data.data);
                        loaded.value = true;
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
    };

    /*
    * 提交数据修改
    * */
    const submit = () => {
        /* 提示 */
        load.confirm("确认修改系统配置？", () => {

            /* 显示加载效果 */
            load.loading("加载中...");

            try {
                /* 开始请求 */
                axios.post(api.sys.set.set_configs, data.data)
                    .then((res) => {
                        /*
                        * 判断请求结果
                        * */
                        if (res.data.code) {
                            load.success("修改成功！");
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

    loadConfig(); //加载配置


    return {
        submit,
        grid,
        filter,
        data,
        loaded
    }
}