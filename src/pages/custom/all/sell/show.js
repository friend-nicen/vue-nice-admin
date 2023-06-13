/*
* @author 友人a丶
* @date 
* 
* */

import {store} from "@/common";
import {ref} from "vue";

export default function () {
    /*新用户添加模板*/
    const need_see = store({});
    const visible_see = ref(false); //是否显示修改框
    const form_see = [
        {
            "key": "name",
            "type": "input",
            "label": "店铺名称",
            "permiss": "show_shop_name",
            "attr": {
                "required": true,
                "readOnly": true, "allowClear": false,
                "placeholder": "请输入店铺名称"
            }
        },
        {
            "key": "level",
            "type": "input",
            "permiss": "show_shop_level",
            "label": "客户评级",
            "attr": {
                "required": true,
                "readOnly": true, "allowClear": false,
                "placeholder": "请选择客户评级"
            }
        },
        {
            "key": "category",
            "type": "input",
            "permiss": "show_shop_category",
            "label": "店铺类目",
            "attr": {
                "readOnly": true, "allowClear": false,
                "required": true,
                "placeholder": "请输入店铺类目"
            }
        },
        {
            "key": "money",
            "type": "input",
            "permiss": "show_shop_money",
            "label": "预存余额",
            "attr": {
                "readOnly": true, "allowClear": false,
                "required": true,
                "placeholder": "请输入预存余额"
            }
        },
        {
            "key": "source",
            "type": "input",
            "permiss": "show_shop_source",
            "label": "客户来源",
            "attr": {
                "required": true,
                "readOnly": true, "allowClear": false,
                "placeholder": "请选择客户来源"
            }
        },
        {
            "key": "platform",
            "type": "input",
            "permiss": "show_shop_platform",
            "label": "合作平台",
            "attr": {
                "required": true,
                "readOnly": true, "allowClear": false,
                "placeholder": "请选择合作平台"
            }
        },
        {
            "key": "cooperation",
            "type": "select",
            "permiss": "show_shop_cooperation",
            "label": "合作类型",
            "attr": {
                "required": true,
                "readOnly": true, "allowClear": false,
                "options": [
                    {
                        label: "售前",
                        value: 1
                    },
                    {
                        label: "售后",
                        value: 2
                    }
                ],
                "placeholder": "请选择合作类型"
            }
        },
        {
            "key": "day_limit",
            "type": "input",
            "permiss": "show_shop_day_limit",
            "label": "基础询单量",
            "attr": {
                "required": true,
                "readOnly": true, "allowClear": false,
                "placeholder": "请输入每日基础询单量"
            }
        },
        {
            "key": "charge",
            "type": "input",
            "permiss": "show_shop_charge",
            "label": "当月服务费",
            "attr": {
                "required": true,
                "readOnly": true, "allowClear": false,
                "placeholder": "请输入当月服务费用"
            }
        },
        {
            "key": "exceed",
            "permiss": "show_shop_exceed",
            "type": "input",
            "label": "超单价格",
            "attr": {
                "required": true,
                "readOnly": true, "allowClear": false,
                "placeholder": "请输入超单时，单个客户的价格"
            }
        },
        {
            "key": "pay_mode",
            "type": "input",
            "permiss": "show_shop_pay_mode",
            "label": "支付方式",
            "attr": {
                "required": true,
                "readOnly": true, "allowClear": false,
                "placeholder": "请输入支付方式"
            }
        },
        {
            "key": "contact",
            "type": "input",
            "permiss": "show_shop_contact",
            "label": "联系人",
            "attr": {
                "required": true,
                "readOnly": true, "allowClear": false,
                "placeholder": "请输入联系人"
            }
        },
        {
            "key": "contact_number",
            "type": "input",
            "permiss": "show_shop_contact_number",
            "label": "联系电话",
            "attr": {
                "required": true,
                "readOnly": true, "allowClear": false,
                "placeholder": "请输入联系电话"
            }
        },
        {
            "key": "bind_mobile",
            "type": "input",
            "permiss": "show_shop_bind_mobile",
            "label": "绑定电话",
            "attr": {
                "required": true,
                "readOnly": true, "allowClear": false,
                "placeholder": "请输入绑定的电话"
            }
        },
        {
            "key": "start",
            "type": "input",
            "label": "合作开始",
            "permiss": "show_shop_start",
            "attr": {
                "required": true,
                "readOnly": true, "allowClear": false,
                "placeholder": "请选择合作开始日期"
            }
        },
        {
            "key": "end",
            "type": "input",
            "permiss": "show_shop_end",
            "label": "合作结束",
            "attr": {
                "required": true,
                "readOnly": true, "allowClear": false,
                "placeholder": "请输入合作结束日期"
            }
        },
        {
            "key": "datetime",
            "type": "input",
            "label": "录入时间",
            "attr": {
                "required": true,
                "readOnly": true, "allowClear": false,
                "placeholder": "请输入数据录入时间"
            }
        },
        {
            "key": "update_time",
            "type": "input",
            "label": "上次修改",
            "attr": {
                "required": true,
                "readOnly": true, "allowClear": false,
                "placeholder": "请输入上次修改时间"
            }
        },
        {
            "key": "nickname",
            "type": "input",
            "permiss": "show_shop_staff_nickname",
            "label": "所属员工",
            "attr": {
                "required": true,
                "readOnly": true, "allowClear": false,
                "placeholder": "请输入所属员工"
            }
        },
        {
            "key": "department",
            "type": "input",
            "permiss": "show_shop_depart",
            "label": "所属部门",
            "attr": {
                "required": true,
                "readOnly": true, "allowClear": false,
                "placeholder": "请输入所属部门"
            }
        },
        {
            "key": "main_account",
            "type": "textarea",
            "permiss": "show_shop_main_account",
            "label": "主账号和密码",
            "attr": {
                "required": true,
                "autoSize": {minRows: 4, maxRows: 4},
                "readOnly": true, "allowClear": false,
                "placeholder": "请输入主账号和密码"
            }
        },
        {
            "key": "sub_account",
            "type": "textarea",
            "label": "子账号和密码",
            "permiss": "show_shop_sub_account",
            "attr": {
                "required": false,
                "autoSize": {minRows: 4, maxRows: 4},
                "readOnly": true, "allowClear": false,
                "placeholder": "请输入子账号和密码"
            }
        },
        {
            "key": "check_account",
            "type": "textarea",
            "label": "质检账号和密码",
            "permiss": "show_shop_check_account",
            "attr": {
                "autoSize": {minRows: 4, maxRows: 4},
                "readOnly": true, "allowClear": false,
                "placeholder": "请输入质检账号和密码"
            }
        },
        {
            "key": "fork",
            "type": "textarea",
            "permiss": "show_shop_fork",
            "label": "分流账号和密码",
            "attr": {
                "autoSize": {minRows: 4, maxRows: 4},
                "readOnly": true, "allowClear": false,
                "placeholder": "请输入分流账号和密码、密码"
            }
        },
        {
            "key": "remarks",
            "type": "textarea",
            "permiss": "show_shop_remarks",
            "label": "备注",
            "attr": {
                "autoSize": {minRows: 4, maxRows: 4},
                "readOnly": true, "allowClear": false,
                "placeholder": "请输入备注"
            }
        },
        {
            "key": "extra",
            "type": "textarea",
            "permiss": "show_shop_extra",
            "label": "市场部备注",
            "attr": {
                "autoSize": {minRows: 4, maxRows: 4},
                "readOnly": true, "allowClear": false,
                "placeholder": "请输入市场部备注"
            }
        }
    ];


    /*
    * 查看客户详细
    * */
    const showRecord = (record) => {
        need_see.$set(record);
        visible_see.value = true;
    }

    return {
        form_see,
        need_see,
        visible_see,
        showRecord
    }
}