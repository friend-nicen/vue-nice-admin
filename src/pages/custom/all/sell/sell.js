import api from "@/service/api"
import initTable from "@/common/init-table";
import {disabledDate, filterTreeNode} from '@/common'
import {check} from "@/common/check";


/*表格列配置*/
const columns = [
    {
        "title": "序号",
        "dataIndex": "id",
        "default": true,
        "width": 80,
        "minWidth": 80
    },
    {
        "title": "店铺名称",
        "dataIndex": "name",
        "permiss": 'show_shop_name',
        "default": true,
        "width": 150
    },
    {
        "title": "客户状态",
        "dataIndex": "status",
        "permiss": 'show_shop_status',
        "width": 100,
        "minWidth": 100
    },
    {
        "title": "客户评级",
        "dataIndex": "level",
        "permiss": 'show_shop_level',
        "width": 100,
        "minWidth": 100
    },
    {
        "title": "相关文档",
        "dataIndex": "doc",
        "permiss": 'show_shop_doc',
        "width": 100,
        "minWidth": 100
    },
    {
        "title": "关联客服",
        "dataIndex": "server",
        "permiss": 'show_shop_server',
        "width": 100,
        "minWidth": 100
    },
    {
        "title": "子账号",
        "dataIndex": "sub_account",
        "empty": true,
        "permiss": 'show_shop_sub_account',
        "width": 120,
        "minWidth": 120,
    },
    {
        "title": "关联财务",
        "dataIndex": "finance",
        "permiss": ['show_shop_staff_finance'],
        "width": 100,
        "minWidth": 100
    },
    {
        "title": "关联销售",
        "dataIndex": "nickname",
        "permiss": ['show_shop_staff_nickname', 'list_sub_sell_shop'],
        "width": 150
    },
    {
        "title": "所属部门",
        "dataIndex": "department",
        "permiss": 'show_shop_depart',
        "width": 150
    },
    {
        "title": "店铺类目",
        "dataIndex": "category",
        "permiss": 'show_shop_category',
        "width": 100,
        "minWidth": 100,
    },
    {
        "title": "预存余额",
        "dataIndex": "money",
        "permiss": 'show_shop_money',
        "width": 100,
        "minWidth": 100,
    },
    {
        "title": "客户来源",
        "dataIndex": "source",
        "permiss": 'show_shop_source',
        "width": 100,
        "minWidth": 100,
    },
    {
        "title": "合作平台",
        "dataIndex": "platform",
        "permiss": 'show_shop_platform',
        "width": 100,
        "minWidth": 100,
    },
    {
        "title": "合作类型",
        "permiss": 'show_shop_cooperation',
        "dataIndex": "cooperation",
        "width": 100,
        "minWidth": 100,
    },
    {
        "title": "每日基础询单量",
        "permiss": 'show_shop_day_limit',
        "dataIndex": "day_limit",
        "width": 140,
        "minWidth": 140,
    },
    {
        "title": "服务费用",
        "dataIndex": "charge",
        "permiss": 'show_shop_charge',
        "width": 100,
        "minWidth": 100,
    },
    {
        "title": "超单客户价格",
        "dataIndex": "exceed",
        "permiss": 'show_shop_exceed',
        "width": 140,
        "minWidth": 140,
    },
    {
        "title": "主账号和密码",
        "dataIndex": "main_account",
        "permiss": 'show_shop_main_account',
        "width": 120,
        "minWidth": 120,
    },

    {
        "title": "质检账号和密码",
        "dataIndex": "check_account",
        "permiss": 'show_shop_check_account',
        "width": 120,
        "minWidth": 120,
    },
    {
        "title": "支付方式",
        "dataIndex": "pay_mode",
        "permiss": 'show_shop_pay_mode',
        "width": 100,
        "minWidth": 100,
    },
    {
        "title": "联系人",
        "dataIndex": "contact",
        "permiss": 'show_shop_contact',
        "width": 100,
        "minWidth": 100,
    },
    {
        "title": "联系电话",
        "dataIndex": "contact_number",
        "permiss": 'show_shop_contact_number',
        "width": 100
    },
    {
        "title": "绑定的电话",
        "dataIndex": "bind_mobile",
        "permiss": 'show_shop_bind_mobile',
        "width": 100
    },
    {
        "title": "合作开始时间",
        "dataIndex": "start",
        "permiss": 'show_shop_start',
        "width": 150
    },
    {
        "title": "上次续费日期",
        "dataIndex": "next",
        "permiss": 'show_shop_next',
        "width": 150
    },
    {
        "title": "合作结束时间",
        "dataIndex": "end",
        "permiss": 'show_shop_end',
        "width": 150
    },
    {
        "title": "分流账号和密码",
        "dataIndex": "fork",
        "permiss": 'show_shop_fork',
        "width": 150
    },
    {
        "title": "备注",
        "dataIndex": "remarks",
        "permiss": 'show_shop_remarks',
        "width": 150
    },
    {
        "title": "额外的备注",
        "dataIndex": "extra",
        "permiss": 'show_shop_extra',
        "width": 150
    },

    {
        "title": "添加时间",
        "dataIndex": "datetime",
        "width": 200
    },
    {
        "title": '操作',
        "width": 100,
        "minWidth": 100,
        "fixed": "right"
    }
];


/*
* 用户信息初始化
* */
export default function () {


    /* */
    let form = [
        {
            key: 'name',
            type: "input",
            label: "店铺名称",
            permiss: 'show_shop_name',
            attr: {
                placeholder: "输入店铺名称的关键字",
            }
        },
        {
            key: 'nickname',
            type: "input",
            permiss: 'show_shop_staff_nickname',
            label: "关联销售",
            attr: {
                placeholder: "输入销售姓名的关键字",
            }
        },
        {
            key: 'server',
            type: "input",
            permiss: 'show_shop_server',
            label: "关联客服",
            attr: {
                placeholder: "输入客服姓名的关键字",
            }
        },
        {
            key: 'finance',
            type: "input",
            permiss: 'show_shop_staff_finance',
            label: "关联财务",
            attr: {
                placeholder: "输入财务姓名的关键字",
            }
        },
        {
            key: 'contact',
            type: "input",
            permiss: 'show_shop_contact',
            label: "联系人",
            attr: {
                placeholder: "输入联系人的关键字",
            }
        },
        {
            key: 'datetime',
            type: "range-picker",
            label: "录入时间",
            attr: {
                disabledDate: disabledDate
            }
        },
        {
            key: 'start',
            type: "range-picker",
            permiss: 'show_shop_start',
            label: "开始合作",
            attr: {
                disabledDate: disabledDate
            }
        },
        {
            key: 'end',
            type: "range-picker",
            permiss: 'show_shop_end',
            label: "结束合作"
        },
        {
            key: 'next',
            type: "range-picker",
            permiss: 'show_shop_next',
            label: "上次续费",
            attr: {
                disabledDate: disabledDate
            }
        },
        {
            "key": "source",
            "type": "select",
            "label": "客户来源",
            "permiss": 'show_shop_source',
            "data": `${api.sys.set.get_param}?type=1&mode=2`,
            "attr": {
                "placeholder": "请选择客户来源"
            }
        },
        {
            "key": "platform",
            "type": "select",
            "label": "合作平台",
            "permiss": 'show_shop_platform',
            "data": `${api.sys.set.get_param}?type=2&mode=2`,
            "attr": {
                "placeholder": "请选择合作平台"
            }
        },
        {
            "key": "pay_mode",
            "type": "select",
            "label": "支付方式",
            "permiss": 'show_shop_pay_mode',
            data: `${api.sys.set.get_param}?type=4&mode=2`,
            "attr": {
                "placeholder": "请输入支付方式"
            }
        },
        {
            "key": "cooperation",
            "type": "select",
            "label": "合作类型",
            "permiss": 'show_shop_cooperation',
            "data": `${api.sys.set.get_param}?type=3&mode=2`,
            "attr": {
                "placeholder": "请选择合作类型"
            }
        },
        {
            "key": "assign_server",
            "type": "select",
            "label": "客服分配",
            "permiss": 'show_shop_server',
            "attr": {
                "placeholder": "请选择客服分配状态",
                "options": [
                    {
                        label: "已分配",
                        value: 1
                    },
                    {
                        label: "未分配",
                        value: 0
                    }
                ]
            }
        },
        {
            "key": "assign_finance",
            "type": "select",
            "label": "财务分配",
            "permiss": 'show_shop_staff_finance',
            "attr": {
                "placeholder": "请选择财务分配状态",
                "options": [
                    {
                        label: "已分配",
                        value: 1
                    },
                    {
                        label: "未分配",
                        value: 0
                    }
                ]
            }
        },
        {
            "key": "status",
            "type": "select",
            "label": "客户状态",
            "permiss": 'show_shop_status',
            "attr": {
                "placeholder": "请选择客户状态",
                "options": [
                    {
                        label: "合作正常",
                        value: 1
                    },
                    {
                        label: "合作终止",
                        value: 0
                    }
                ]
            }
        },
        {
            key: 'depart',
            label: "所属部门",
            type: "TreeSelect",
            permiss: ['list_sub_sell_shop', 'show_shop_depart'],
            data: api.custom.all.sell.depart,
            attr: {
                allowClear: true,
                showSearch:true,filterTreeNode:filterTreeNode,
                placeholder: "请选择所属部门",
                "tree-default-expand-all": true,
                fieldNames: {label: 'title', value: 'key', children: 'children'}
            }
        },
        {
            key: 'money',
            type: "input-range",
            label: "预存余额",
            "permiss": 'show_shop_money',
            bind: false,
            attr: {
                title: ["最小值", "最大值"]
            }
        },
        {
            key: 'day_limit',
            type: "input-range",
            label: "月询单量",
            "permiss": 'show_shop_day_limit',
            bind: false,
            attr: {
                title: ["最小值", "最大值"]
            }
        },
        {
            key: 'charge',
            type: "input-range",
            label: "当月服务费",
            "permiss": 'show_shop_charge',
            bind: false,
            attr: {
                title: ["最小值", "最大值"]
            }
        },
        {
            key: 'level',
            type: "select",
            label: "客户评级",
            "permiss": 'show_shop_level',
            data: `${api.sys.set.get_param}?type=5&mode=2`,
            "attr": {
                "placeholder": "请选择客户评级"
            }
        },
    ];


    const table = initTable({
        unique: 'Sell-Custom-List-Table',
        column: columns,
        condition: {
            name: null,
            depart: null,
            nickname: null,
            contact: null,
            money: [null, null],
            day_limit: [null, null],
            start: [null, null],
            end: [null, null],
            next: [null, null],
            charge: [null, null],
            datetime: [null, null],
            level: null,
            sell: null,
            source: null,
            platform: null,
            pay_mode: null,
            server: null,
            cooperation: null,
            status: null
        },
        check: check
    });


    /*
     * 接口列表
     * */
    const face = {
        list: api.custom.all.sell.list,
        add: api.custom.all.sell.add,
        modify: api.custom.all.sell.modify,
    };

    return {
        condition: table.condition,
        face,
        form,
        check: check
    }


}


