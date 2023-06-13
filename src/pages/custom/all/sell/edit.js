/*
* @author 友人a丶
* @date 
* 表格编辑和新增的配置
* */

import {onUnmounted, ref} from "vue";
import {store} from "@/common";
import api from '@/service/api'

let share = {data: null}; //共享数据

export default function () {

    /*
    * 如果已经被初始化，直接返回
    * */
    if (share.data) {
        return share.data;
    }

    /*
    * 清除数据
    * */
    onUnmounted(() => {
        share.data = null;
    })


    /*数据模板*/
    const need_add = store({
        "name": null,
        "level": null,
        "category": null,
        "money": null,
        "source": null,
        "platform": null,
        "cooperation": null,
        "day_limit": null,
        "charge": null,
        "exceed": null,
        "main_account": null,
        "sub_account": null,
        "check_account": null,
        "pay_mode": null,
        "contact": null,
        "contact_number": null,
        "bind_mobile": null,
        "start": null,
        "end": null,
        "fork": null,
        "remarks": null,
        "extra": null
    });


    /*新用户添加模板*/
    const form_add = [
        {
            "key": "name",
            "type": "input",
            "label": "店铺名称",
            "attr": {
                "required": true,
                "placeholder": "请输入店铺名称"
            }
        },
        {
            "key": "level",
            "type": "select",
            "label": "客户评级",
            "data": `${api.sys.set.get_param}?type=5&mode=2`,
            "attr": {
                "required": true,
                "placeholder": "请选择客户评级"
            }
        },
        {
            "key": "category",
            "type": "input",
            "label": "店铺类目",
            "attr": {
                "required": true,
                "placeholder": "请输入店铺类目"
            }
        },
        {
            "key": "money",
            "type": "input-number",
            "label": "预存余额",
            "attr": {
                "required": true,
                "placeholder": "请输入预存余额"
            }
        },
        {
            "key": "source",
            "type": "select",
            "label": "客户来源",
            "data": `${api.sys.set.get_param}?type=1&mode=2`,
            "attr": {
                "required": true,
                "placeholder": "请选择客户来源"
            }
        },
        {
            "key": "platform",
            "type": "select",
            "label": "合作平台",
            "data": `${api.sys.set.get_param}?type=2&mode=2`,
            "attr": {
                "required": true,
                "placeholder": "请选择合作平台"
            }
        },
        {
            "key": "cooperation",
            "type": "select",
            "label": "合作类型",
            "data": `${api.sys.set.get_param}?type=3&mode=2`,
            "attr": {
                "required": true,
                "placeholder": "请选择合作类型"
            }
        },
        {
            "key": "day_limit",
            "type": "input-number",
            "label": "基础询单量",
            "attr": {
                "required": true,
                "placeholder": "请输入每日基础询单量"
            }
        },
        {
            "key": "charge",
            "type": "input-number",
            "label": "当月服务费",
            "attr": {
                "required": true,
                "placeholder": "请输入当月服务费用"
            }
        },
        {
            "key": "exceed",
            "type": "input-number",
            "label": "超单价格",
            "attr": {
                "required": true,
                "placeholder": "请输入超单时，单个客户的价格"
            }
        },
        {
            "key": "pay_mode",
            "type": "select",
            "label": "支付方式",
            data: `${api.sys.set.get_param}?type=4&mode=2`,
            "attr": {
                "required": true,
                "placeholder": "请输入支付方式"
            }
        },
        {
            "key": "contact",
            "type": "input",
            "label": "联系人",
            "attr": {
                "required": true,
                "placeholder": "请输入联系人"
            }
        },
        {
            "key": "contact_number",
            "type": "input",
            "label": "联系电话",
            "attr": {
                "required": true,
                "placeholder": "请输入联系电话"
            }
        },
        {
            "key": "bind_mobile",
            "type": "input",
            "label": "绑定电话",
            "attr": {
                "required": true,
                "placeholder": "请输入绑定的电话"
            }
        },
        {
            "key": "start",
            "type": "date-picker",
            "label": "合作开始",
            "attr": {
                "required": true,
                "placeholder": "请选择合作开始日期"
            }
        },
        {
            "key": "end",
            "type": "date-picker",
            "label": "合作结束",
            "attr": {
                "required": true,
                "placeholder": "请输入合作结束日期"
            }
        },
        {
            "key": "main_account",
            "type": "ItemPicker",
            "label": "主账号和密码",
            "attr": {
                "autoSize": {minRows: 4, maxRows: 4},
                "required": true,
                "placeholder": "请输入主账号和密码"
            }
        },
        {
            "key": "sub_account",
            "type": "ItemPicker",
            "label": "子账号和密码",
            "attr": {
                "required": false,
                "autoSize": {minRows: 4, maxRows: 4},
                "placeholder": "请输入子账号和密码"
            }
        },
        {
            "key": "check_account",
            "type": "ItemPicker",
            "label": "质检账号和密码",
            "attr": {
                "autoSize": {minRows: 4, maxRows: 4},
                "required": false,
                "placeholder": "请输入质检账号和密码"
            }
        },
        {
            "key": "fork",
            "type": "ItemPicker",
            "label": "分流账号和密码和密码",
            "attr": {
                "autoSize": {minRows: 4, maxRows: 4},
                "placeholder": "请输入分流账号和密码和密码"
            }
        },
        {
            "key": "remarks",
            "type": "textarea",
            "label": "备注",
            "attr": {
                "autoSize": {minRows: 4, maxRows: 4},
                "placeholder": "请输入备注"
            }
        },
        {
            "key": "extra",
            "type": "textarea",
            "label": "市场部备注",
            "attr": {
                "autoSize": {minRows: 4, maxRows: 4},
                "placeholder": "请输入市场部备注"
            }
        }
    ];


    const visible_add = ref(false); //是否显示修改框


    /*
    * 记录数据
    * */
    share.data = {
        visible_add,
        form_add,
        need_add
    }

    return share.data;

}