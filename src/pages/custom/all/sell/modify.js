/*
* @author 友人a丶
* @date 
* 表格编辑和新增的配置
* */

import {provide, ref} from "vue";
import {store} from "@/common";
import api from '@/service/api'


export default function () {


    /*数据模板*/
    const need_modify = store({
        "id": null,
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
    const form_modify = [
        {
            "key": "name",
            "type": "input",
            "label": "店铺名称",
            "permiss": 'modify_shop_name',
            "attr": {
                "required": true,
                "placeholder": "请输入店铺名称"
            }
        },
        {
            "key": "level",
            "type": "select",
            "permiss": 'modify_shop_level',
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
            "permiss": 'modify_shop_category',
            "label": "店铺类目",
            "attr": {
                "required": true,
                "placeholder": "请输入店铺类目"
            }
        },
        {
            "key": "money",
            "permiss": 'modify_shop_money',
            "type": "input-number",
            "label": "预存余额",
            "attr": {
                "required": true,
                "placeholder": "请输入预存余额"
            }
        },
        {
            "key": "source",
            "permiss": 'modify_shop_source',
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
            "permiss": 'modify_shop_platform',
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
            "permiss": 'modify_shop_cooperation',
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
            "permiss": 'modify_shop_day_limit',
            "attr": {
                "required": true,
                "placeholder": "请输入每日基础询单量"
            }
        },
        {
            "key": "charge",
            "type": "input-number",
            "permiss": 'modify_shop_charge',
            "label": "当月服务费",
            "attr": {
                "required": true,
                "placeholder": "请输入当月服务费用"
            }
        },
        {
            "key": "exceed",
            "type": "input-number",
            "permiss": 'modify_shop_exceed',
            "label": "超单价格",
            "attr": {
                "required": true,
                "placeholder": "请输入超单时，单个客户的价格"
            }
        },

        {
            "key": "pay_mode",
            "type": "select",
            "permiss": 'modify_shop_pay_mode',
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
            "permiss": 'modify_shop_contact',
            "attr": {
                "required": true,
                "placeholder": "请输入联系人"
            }
        },
        {
            "key": "contact_number",
            "type": "input",
            "permiss": 'modify_shop_contact_number',
            "label": "联系电话",
            "attr": {
                "required": true,
                "placeholder": "请输入联系电话"
            }
        },
        {
            "key": "bind_mobile",
            "type": "input",
            "permiss": 'modify_shop_bind_mobile',
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
            "permiss": 'modify_shop_start',
            "attr": {
                "required": true,
                "placeholder": "请选择合作开始日期"
            }
        },
        {
            "key": "end",
            "type": "date-picker",
            "label": "合作结束",
            "permiss": 'modify_shop_end',
            "attr": {
                "required": true,
                "placeholder": "请输入合作结束日期"
            }
        },
        {
            "key": "main_account",
            "type": "ItemPicker",
            "permiss": 'modify_shop_main_account',
            "label": "主账号和密码",
            "attr": {
                "required": true,
                "autoSize": {minRows: 4, maxRows: 4},
                "placeholder": "请输入主账号和密码"
            }
        },
        {
            "key": "sub_account",
            "type": "ItemPicker",
            "permiss": 'modify_shop_sub_account',
            "label": "子账号和密码",
            "attr": {
                "required": false,
                "autoSize": {minRows: 4, maxRows: 4},
                "placeholder": "请输入子账号和密码"
            }
        },
        {
            "key": "check_account",
            "permiss": 'modify_shop_check_account',
            "type": "ItemPicker",
            "label": "质检账号和密码",
            "attr": {
                "autoSize": {minRows: 4, maxRows: 4},
                "placeholder": "请输入质检账号和密码"
            }
        },
        {
            "key": "fork",
            "type": "ItemPicker",
            "permiss": 'modify_shop_fork',
            "label": "分流账号和密码和密码",
            "attr": {
                "autoSize": {minRows: 4, maxRows: 4},
                "placeholder": "请输入分流账号和密码和密码"
            }
        },
        {
            "key": "remarks",
            "type": "textarea",
            "permiss": 'modify_shop_remarks',
            "label": "备注",
            "attr": {
                "autoSize": {minRows: 4, maxRows: 4},
                "placeholder": "请输入备注"
            }
        },
        {
            "key": "extra",
            "permiss": 'modify_shop_extra',
            "type": "textarea",
            "label": "市场部备注",
            "attr": {
                "autoSize": {minRows: 4, maxRows: 4},
                "placeholder": "请输入市场部备注"
            }
        }
    ];


    const visible_modify = ref(false); //是否显示修改框

    /*
    * 查看客户详细
    * */
    const showCanModify = (record) => {
        need_modify.reset();
        need_modify.$set(record);
        visible_modify.value = true;
    }

    /*
    * 依赖注入
    * */
    provide("showCanModify", showCanModify);


    return {
        visible_modify,
        form_modify,
        need_modify
    }
}