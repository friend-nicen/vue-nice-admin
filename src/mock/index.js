/* eslint-disable */
import Mock from 'mockjs'
import api from "../service/api"
import {getDays} from "@/common";
import Cookies from "js-cookie";
import dayjs from "dayjs"; //接口配置对象


Mock.mock(new RegExp(`.*${api.login}.*`), /.*/, (request) => {

    /* 如果cookie存在，或者提交了登录信息 */
    if (Cookies.get("Authorization") || request.body) {
        /* 设置Cookie */
        Cookies.set("Authorization", "Authorization_Test")
        /* 返回值 */
        return {
            "code": 1,
            "errMsg": "登录成功！",
            "data": {
                "nickname": "爱心发电丶",
                "username": "Tutu",
                "token": "JWT",
                "index": "index",
                "permissions": [
                    "access_route_add",
                    "access_route_del",
                    "access_route_list",
                    "access_route_list_raw",
                    "add_depart",
                    "add_in_server_sub_account",
                    "add_param",
                    "add_permiss",
                    "add_role",
                    "add_route",
                    "add_sell_shop",
                    "add_server_sub_account",
                    "add_staff",
                    "assign_finance_shop",
                    "assign_server_shop",
                    "assign_to_server_shop",
                    "delete_in_server_sub_account",
                    "delete_server_sub_account",
                    "del_depart",
                    "del_finance_shop",
                    "del_param",
                    "del_permiss",
                    "del_role",
                    "del_route",
                    "del_sell_shop",
                    "del_service",
                    "del_shop_doc",
                    "del_shop_server",
                    "del_staff",
                    "del_sub_finance_shop",
                    "del_sub_sell_shop",
                    "list_depart",
                    "list_login_log",
                    "list_organ_log",
                    "list_role_log",
                    "list_role_staff",
                    "list_self_all_service_log",
                    "list_sell_shop",
                    "list_service_log",
                    "list_staff",
                    "list_sub_down_log",
                    "list_sub_finance_shop",
                    "list_sub_login_log",
                    "list_sub_organ_log",
                    "list_sub_role_log",
                    "list_sub_sell_shop",
                    "list_sub_server_shop",
                    "list_sub_service_log",
                    "modify_config",
                    "modify_depart",
                    "modify_finance_shop",
                    "modify_password",
                    "modify_permiss",
                    "modify_role",
                    "modify_role_permiss",
                    "modify_route",
                    "modify_sell_shop",
                    "modify_shop_bind_mobile",
                    "modify_shop_category",
                    "modify_shop_charge",
                    "modify_shop_check_account",
                    "modify_shop_contact",
                    "modify_shop_contact_number",
                    "modify_shop_cooperation",
                    "modify_shop_day_limit",
                    "modify_shop_end",
                    "modify_shop_exceed",
                    "modify_shop_extra",
                    "modify_shop_fork",
                    "modify_shop_level",
                    "modify_shop_main_account",
                    "modify_shop_money",
                    "modify_shop_name",
                    "modify_shop_next",
                    "modify_shop_pay_mode",
                    "modify_shop_platform",
                    "modify_shop_remarks",
                    "modify_shop_source",
                    "modify_shop_start",
                    "modify_shop_status",
                    "modify_shop_sub_account",
                    "modify_staff",
                    "modify_sub_finance_shop",
                    "modify_sub_sell_shop",
                    "move_finance_shop",
                    "move_sell_shop",
                    "permiss_list",
                    "role_list",
                    "role_permiss_list",
                    "route_list",
                    "route_list_raw",
                    "set_menu",
                    "show_finance_server_sub_account",
                    "show_finance_shop_doc",
                    "show_in_server_sub_account",
                    "show_server_shop_doc",
                    "show_server_sub_account",
                    "show_shop_assoc_server",
                    "show_shop_bind_mobile",
                    "show_shop_category",
                    "show_shop_charge",
                    "show_shop_check_account",
                    "show_shop_contact",
                    "show_shop_contact_number",
                    "show_shop_cooperation",
                    "show_shop_day_limit",
                    "show_shop_depart",
                    "show_shop_doc",
                    "show_shop_end",
                    "show_shop_exceed",
                    "show_shop_extra",
                    "show_shop_fork",
                    "show_shop_level",
                    "show_shop_main_account",
                    "show_shop_money",
                    "show_shop_name",
                    "show_shop_next",
                    "show_shop_pay_mode",
                    "show_shop_platform",
                    "show_shop_remarks",
                    "show_shop_source",
                    "show_shop_staff_finance",
                    "show_shop_staff_nickname",
                    "show_shop_start",
                    "show_shop_status",
                    "show_shop_sub_account",
                    "upload_shop_doc"
                ],
                "routes": [
                    {
                        "path": "/",
                        "icon": "PartitionOutlined",
                        "name": "系统入口",
                        "menu": 1
                    },
                    {
                        "path": "sys",
                        "icon": "",
                        "name": "系统管理",
                        "menu": 1
                    },
                    {
                        "path": "authority",
                        "icon": "GoldOutlined",
                        "name": "访问控制",
                        "menu": 1
                    },
                    {
                        "path": "routes",
                        "icon": "PartitionOutlined",
                        "name": "页面管理",
                        "menu": 1
                    },
                    {
                        "path": "permiss",
                        "icon": "LockOutlined",
                        "name": "权限配置",
                        "menu": 1
                    },
                    {
                        "path": "roles",
                        "icon": "DeploymentUnitOutlined",
                        "name": "角色管理",
                        "menu": 1
                    },
                    {
                        "path": "organ",
                        "icon": "BranchesOutlined",
                        "name": "组织架构",
                        "menu": 1
                    },
                    {
                        "path": "team",
                        "icon": "AntDesignOutlined",
                        "name": "团队管理",
                        "menu": 1
                    },
                    {
                        "path": "dash",
                        "icon": "CloudOutlined",
                        "name": "工作台",
                        "menu": 1
                    },
                    {
                        "path": "login_log",
                        "icon": "BugOutlined",
                        "name": "登录日志",
                        "menu": 1
                    },
                    {
                        "path": "organ_log",
                        "icon": "ClockCircleOutlined",
                        "name": "操作日志",
                        "menu": 1
                    },
                    {
                        "path": "role_log",
                        "icon": "ClusterOutlined",
                        "name": "角色日志",
                        "menu": 1
                    },
                    {
                        "path": "custom",
                        "icon": "ContactsOutlined",
                        "name": "客户管理",
                        "menu": 1
                    },
                    {
                        "path": "all",
                        "icon": "DeploymentUnitOutlined",
                        "name": "全部客户",
                        "menu": 1
                    },
                    {
                        "path": "sell",
                        "icon": "BranchesOutlined",
                        "name": "客户列表",
                        "menu": 1
                    },
                    {
                        "path": "shop_log",
                        "icon": "AntCloudOutlined",
                        "name": "操作日志",
                        "menu": 1
                    },
                    {
                        "path": "set",
                        "icon": "PushpinOutlined",
                        "name": "系统设置",
                        "menu": 1
                    },
                    {
                        "path": "param",
                        "icon": "FormOutlined",
                        "name": "参数配置",
                        "menu": 1
                    },
                    {
                        "path": "index",
                        "icon": "AlertOutlined",
                        "name": "数据概览",
                        "menu": 1
                    },
                    {
                        "path": "data",
                        "icon": "ProjectOutlined",
                        "name": "数据统计",
                        "menu": 1
                    },
                    {
                        "path": "serve_data",
                        "icon": "FundOutlined",
                        "name": "服务统计",
                        "menu": 1
                    },
                    {
                        "path": "config",
                        "icon": "SettingOutlined",
                        "name": "运行配置",
                        "menu": 1
                    }
                ],
                "expireAt": 1686642243,
                "role": {
                    "id": 1,
                    "name": "系统管理员"
                },
                "depart": {
                    "name": "根节点",
                    "id": 1
                }
            }
        };
    } else {
        return {"code": 0, "errMsg": "登录手机号不能为空！"};
    }


});


Mock.mock(new RegExp(`.*${api.dash.statistics}.*`), /.*/, (request) => {
    /* 返回值 */
    const json = {
        "code": 1,
        "errMsg": "ok",
        "data": {
            "week": Mock.mock('@integer(10, 1000)'),
            "half": Mock.mock('@integer(10, 1000)'),
            "month": Mock.mock('@integer(10, 1000)'),
            "count": Mock.mock('@integer(10, 1000)')
        }
    };
    return json;
});

Mock.mock(new RegExp(`.*${api.dash.chart}.*`), /.*/, (request) => {
    /* 返回值 */
    const json = {
        "code": 1,
        "errMsg": "ok",
        "data": getDays(dayjs().subtract(7, 'days'), dayjs())
            .map(item => {
                return {
                    datetime: item,
                    count: Mock.mock('@integer(10, 1000)')
                }
            })
    };
    return json;
});

Mock.mock(new RegExp(`.*${api.custom.all.statistic.depart}.*`), /.*/, (request) => {


    /* 返回值 */
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": {
            "pid": null,
            "tree": [
                {
                    "key": 1,
                    "title": "根节点",
                    "pid": null
                },
                {
                    "key": 2,
                    "title": "好梦网络科技有限公司",
                    "pid": 1
                },
                {
                    "key": 3,
                    "title": "超越战队",
                    "pid": 2
                },
                {
                    "key": 5,
                    "title": "越众战队",
                    "pid": 2
                }
            ]
        }
    };
});

Mock.mock(new RegExp(`.*${api.sys.set.get_param}.*`), /.*/, (request) => {

    const json = JSON.parse(request.body);

    if (json.mode == 2) {
        /* 返回值 */
        return {
            "code": 1,
            "errMsg": "查询成功！",
            "data": (new Array(30)).fill(1).map(item => {
                return {
                    "value": Mock.mock('@cname'),
                    "label": Mock.mock('@cname')
                }
            })
        }
    } else {
        return {
            "code": 1,
            "errMsg": "查询成功！",
            "data": {
                "total": 4,
                "per_page": 4,
                "current_page": 1,
                "last_page": 1,
                "data": [
                    {
                        "value": "服务商",
                        "id": 22
                    },
                    {
                        "value": "电销",
                        "id": 41
                    },
                    {
                        "value": "网销",
                        "id": 42
                    },
                    {
                        "value": "友商",
                        "id": 43
                    }
                ]
            }
        }
    }


});

Mock.mock(new RegExp(`.*${api.custom.all.statistic.list}.*`), /.*/, (request) => {

    /* 返回值 */
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": {
            "total": Mock.mock('@integer(0, 10000)'),
            "per_page": 30,
            "current_page": 1,
            "last_page": 895,
            "data": (new Array(30)).fill(1).map((item, index) => {
                return {
                    "id": index + 1,
                    "nickname": Mock.mock('@cname'),
                    "customer": Mock.mock('@cname'),
                    "mobile": "139" + Mock.mock('@integer(10000, 20000)') + "783",
                    "duration": Mock.mock('@integer(0, 200)'),
                    "status": ['呼入', '呼出'][Mock.mock('@integer(0, 1)')],
                    "type": Mock.mock('@integer(0, 1)'),
                    "src": null,
                    "place": "中国移动 " + Mock.mock('@city(true)'),
                    "callTime": Mock.mock('@datetime()'),
                    "datetime": Mock.mock('@datetime()')
                }
            })
            ,
            "ok_total": Mock.mock('@integer(0, 10000)'),
            "total_time": Mock.mock('@integer(10, 10000)'),
            "no_total": Mock.mock('@integer(10, 10000)')
        }
    };
});

Mock.mock(new RegExp(`.*${api.custom.all.sell.list}.*`), /.*/, (request) => {

    /* 返回值 */
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": {
            "per_page": 30,
            "current_page": 1,
            "last_page": 895,
            "data": (new Array(30)).fill(1).map((item, index) => {
                return {
                    "name": Mock.mock('@name()'),
                    "status": 1,
                    "level": "D",
                    "category": "冰袖",
                    "money": "0.00",
                    "source": "服务商",
                    "platform": "阿里巴巴",
                    "cooperation": "全包客服",
                    "day_limit": Mock.mock('@integer(0, 80)'),
                    "charge": "560.00",
                    "exceed": "0.23",
                    "main_account": Mock.mock('@name()') + " , I9jnXXjj",
                    "sub_account": Mock.mock('@name()') + " , I9jnXXjj",
                    "doc": 0,
                    "check_account": null,
                    "pay_mode": Mock.mock('@name()'),
                    "contact": Mock.mock('@name()'),
                    "contact_number": "139" + Mock.mock('@integer(10000, 20000)') + "783",
                    "bind_mobile": "139" + Mock.mock('@integer(10000, 20000)') + "783",
                    "start": Mock.mock('@date()'),
                    "next": null,
                    "end": Mock.mock('@datetime()'),
                    "fork": null,
                    "remarks": Mock.mock('@cparagraph'),
                    "extra": null,
                    "nickname": Mock.mock('@cname()'),
                    "department": Mock.mock('@name()'),
                    "id": index + 1,
                    "datetime": Mock.mock('@datetime()'),
                    "finance": "财务",
                    "servers": "203",
                    "update_time": Mock.mock('@datetime()')
                }
            })
        }
    };
});

Mock.mock(new RegExp(`.*${api.custom.all.sell.sub_lists}.*`), /.*/, (request) => {

    /* 返回值 */
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": (new Array(30)).fill(1).map(item => {
            return {
                "value": Mock.mock('@cname'),
                "label": Mock.mock('@cname')
            }
        })
    }
});

Mock.mock(new RegExp(`.*${api.custom.all.sell.server_list}.*`), /.*/, (request) => {

    /* 返回值 */
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": (new Array(30)).fill(1).map(item => {
            return {
                "value": Mock.mock('@cname'),
                "label": Mock.mock('@cname')
            }
        })
    }
});

Mock.mock(new RegExp(`.*${api.custom.all.sell.depart}.*`), /.*/, (request) => {


    /* 返回值 */
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": {
            "pid": null,
            "tree": [
                {
                    "key": 1,
                    "title": "根节点",
                    "pid": null
                },
                {
                    "key": 2,
                    "title": "好梦网络科技有限公司",
                    "pid": 1
                },
                {
                    "key": 3,
                    "title": "超越战队",
                    "pid": 2
                },
                {
                    "key": 5,
                    "title": "越众战队",
                    "pid": 2
                }
            ]
        }
    };
});

Mock.mock(new RegExp(`.*${api.sys.team.depart.list}.*`), /.*/, (request) => {

    /* 返回值 */
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": {
            "pid": null,
            "tree": [
                {
                    "key": 1,
                    "title": "总公司",
                    "pid": null,
                    "count": 527,
                    "remarks": "总公司"
                },
                {
                    "key": 6,
                    "title": Mock.mock('@region') + "公司",
                    "pid": 1,
                    "count": 526,
                    "remarks": "公司"
                },
                {
                    "key": 8,
                    "title": Mock.mock('@region') + "市场部",
                    "pid": 6,
                    "count": 24,
                    "remarks": "销售"
                },
                {
                    "key": 12,
                    "title": Mock.mock('@region') + "市场部",
                    "pid": 6,
                    "count": 19,
                    "remarks": "销售"
                },
                {
                    "key": 14,
                    "title": Mock.mock('@region') + "市场部",
                    "pid": 6,
                    "count": 8,
                    "remarks": "销售"
                },
                {
                    "key": 19,
                    "title": Mock.mock('@region') + "财务部",
                    "pid": 6,
                    "count": 16,
                    "remarks": "财务"
                },
                {
                    "key": 20,
                    "title": Mock.mock('@region') + "行政部",
                    "pid": 6,
                    "count": 29,
                    "remarks": "行政"
                }
            ]
        }
    }
});

Mock.mock(new RegExp(`.*${api.sys.team.staff.roles}.*`), /.*/, (request) => {

    /* 返回值 */
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": {
            "pid": null,
            "tree": [
                {
                    "key": 1,
                    "title": "系统管理员",
                    "pid": null,
                    "tree": null
                },
                {
                    "key": 2,
                    "title": "总经理",
                    "pid": 1,
                    "tree": "1"
                },
                {
                    "key": 20,
                    "title": "销售主管",
                    "pid": 2,
                    "tree": "1,2"
                },
                {
                    "key": 26,
                    "title": "财务主管",
                    "pid": 2,
                    "tree": "1,2"
                },
                {
                    "key": 29,
                    "title": "行政主管",
                    "pid": 2,
                    "tree": "1,2"
                },
                {
                    "key": 39,
                    "title": "人事主管",
                    "pid": 2,
                    "tree": "1,2"
                }
            ]
        }
    }
});

Mock.mock(new RegExp(`.*${api.sys.team.staff.list}.*`), /.*/, (request) => {

    /* 返回值 */
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": {
            "per_page": 30,
            "current_page": 1,
            "last_page": 895,
            "data": (new Array(30)).fill(1).map((item, index) => {


                return {
                    "id": index + 1,
                    "depart_name": Mock.mock('@name()'),
                    "depart": 180,
                    "username": "139" + Mock.mock('@integer(10000, 20000)') + "783",
                    "nickname": Mock.mock('@cname()'),
                    "role_name": Mock.mock('@name()'),
                    "role": 43,
                    "status": 1,
                    "register": Mock.mock('@datetime()')
                };

            })
        }
    };
});

Mock.mock(new RegExp(`.*${api.custom.all.log.list}.*`), /.*/, (request) => {

    /* 返回值 */
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": {
            "per_page": 30,
            "current_page": 1,
            "last_page": 895,
            "data": (new Array(30)).fill(1).map((item, index) => {


                return {
                    "id": index + 1,
                    "nickname": Mock.mock('@cname()'),
                    "datetime": Mock.mock('@datetime()'),
                    "info": `【${Mock.mock('@cname()')}】将客户【${Mock.mock('@cname()')}】分配给了【${Mock.mock('@cname()')}】`,
                    "device": "Mozilla\/5.0 (Windows NT 6.1; WOW64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/86.0.4240.198 Safari\/537.36",
                    "ip": Mock.mock('@ip'),
                    "addr": Mock.mock('@city(true)') + " 联通",
                    "type": 4
                };

            })
        }
    };
});

Mock.mock(new RegExp(`.*${api.sys.team.staff.login_log}.*`), /.*/, (request) => {

    /* 返回值 */
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": {
            "per_page": 30,
            "current_page": 1,
            "last_page": 895,
            "data": (new Array(30)).fill(1).map((item, index) => {


                return {
                    "id": index + 1,
                    "nickname": Mock.mock('@cname()'),
                    "datetime": Mock.mock('@datetime()'),
                    "info": `用户登录系统！`,
                    "device": "Mozilla\/5.0 (Windows NT 6.1; WOW64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/86.0.4240.198 Safari\/537.36",
                    "ip": Mock.mock('@ip'),
                    "addr": Mock.mock('@city(true)') + " 联通",
                };

            })
        }
    };
});

Mock.mock(new RegExp(`.*${api.sys.team.depart.organ_log}.*`), /.*/, (request) => {

    /* 返回值 */
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": {
            "per_page": 30,
            "current_page": 1,
            "last_page": 895,
            "data": (new Array(30)).fill(1).map((item, index) => {

                return {
                    "id": index + 1,
                    "nickname": Mock.mock('@cname()'),
                    "datetime": Mock.mock('@datetime()'),
                    "info": `【${Mock.mock('@cname()')}】新增了组织【${Mock.mock('@cname()')}】`,
                    "device": "Mozilla\/5.0 (Windows NT 6.1; WOW64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/86.0.4240.198 Safari\/537.36",
                    "ip": Mock.mock('@ip'),
                    "addr": Mock.mock('@city(true)') + " 联通",
                    "type": 1
                };

            })
        }
    };
});

Mock.mock(new RegExp(`.*${api.sys.authority.role.list}.*`), /.*/, (request) => {

    /* 返回值 */
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": {
            "pid": null,
            "tree": [
                {
                    "key": 1,
                    "title": "系统管理员",
                    "pid": null,
                    "tree": null
                },
                {
                    "key": 2,
                    "title": "总经理",
                    "pid": 1,
                    "tree": "1"
                },
                {
                    "key": 20,
                    "title": "销售主管",
                    "pid": 2,
                    "tree": "1,2"
                },
                {
                    "key": 26,
                    "title": "财务主管",
                    "pid": 2,
                    "tree": "1,2"
                },
                {
                    "key": 29,
                    "title": "行政主管",
                    "pid": 2,
                    "tree": "1,2"
                },
                {
                    "key": 39,
                    "title": "人事主管",
                    "pid": 2,
                    "tree": "1,2"
                }
            ]
        }
    }
});

Mock.mock(new RegExp(`.*${api.sys.authority.access.raw}.*`), /.*/, (request) => {
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": [
            {
                "key": 1,
                "title": "系统入口",
                "pid": null
            },
            {
                "key": 4,
                "title": "系统管理",
                "pid": 1
            },
            {
                "key": 17,
                "title": "工作台",
                "pid": 1
            },
            {
                "key": 21,
                "title": "客户管理",
                "pid": 1
            },
            {
                "key": 5,
                "title": "访问控制",
                "pid": 4
            },
            {
                "key": 16,
                "title": "团队管理",
                "pid": 4
            },
            {
                "key": 31,
                "title": "系统设置",
                "pid": 4
            },
            {
                "key": 6,
                "title": "页面管理",
                "pid": 5
            },
            {
                "key": 12,
                "title": "权限配置",
                "pid": 5
            },
            {
                "key": 13,
                "title": "角色管理",
                "pid": 5
            },
            {
                "key": 20,
                "title": "角色日志",
                "pid": 5
            },
            {
                "key": 15,
                "title": "组织架构",
                "pid": 16
            },
            {
                "key": 18,
                "title": "登录日志",
                "pid": 16
            },
            {
                "key": 19,
                "title": "操作日志",
                "pid": 16
            },
            {
                "key": 33,
                "title": "数据概览",
                "pid": 17
            },
            {
                "key": 22,
                "title": "全部客户",
                "pid": 21
            },
            {
                "key": 34,
                "title": "数据统计",
                "pid": 21
            },
            {
                "key": 23,
                "title": "客户列表",
                "pid": 22
            },
            {
                "key": 26,
                "title": "操作日志",
                "pid": 22
            },

            {
                "key": 32,
                "title": "参数配置",
                "pid": 31
            },
            {
                "key": 37,
                "title": "运行配置",
                "pid": 31
            },
            {
                "key": 35,
                "title": "服务统计",
                "pid": 34
            }
        ]
    };
});

Mock.mock(new RegExp(`.*${api.sys.authority.access.list}.*`), /.*/, (request) => {

    /* 返回值 */
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": {
            "total": 26,
            "per_page": 26,
            "current_page": 1,
            "last_page": 1,
            "data": [
                {
                    "id": 37,
                    "name": "运行配置",
                    "icon": "SettingOutlined",
                    "path": "config",
                    "info": "运行参数配置\n",
                    "pid": 31,
                    "datetime": "2023-04-28 11:10:14"
                },

                {
                    "id": 33,
                    "name": "数据概览",
                    "icon": "AlertOutlined",
                    "path": "index",
                    "info": "数据概览",
                    "pid": 17,
                    "datetime": "2023-03-26 19:21:27"
                },
                {
                    "id": 32,
                    "name": "参数配置",
                    "icon": "FormOutlined",
                    "path": "param",
                    "info": "设置系统的一些运行参数",
                    "pid": 31,
                    "datetime": "2023-03-25 09:23:42"
                },
                {
                    "id": 31,
                    "name": "系统设置",
                    "icon": "PushpinOutlined",
                    "path": "set",
                    "info": "设置系统的一些运行参数",
                    "pid": 4,
                    "datetime": "2023-03-25 09:23:07"
                },

                {
                    "id": 26,
                    "name": "操作日志",
                    "icon": "AntCloudOutlined",
                    "path": "shop_log",
                    "info": "记录所有店铺的操作日志",
                    "pid": 22,
                    "datetime": "2023-03-24 20:26:12"
                },
                {
                    "id": 23,
                    "name": "客户列表",
                    "icon": "BranchesOutlined",
                    "path": "sell",
                    "info": "销售端客户列表",
                    "pid": 22,
                    "datetime": "2023-03-24 12:41:14"
                },
                {
                    "id": 22,
                    "name": "全部客户",
                    "icon": "DeploymentUnitOutlined",
                    "path": "all",
                    "info": "管理全部客户",
                    "pid": 21,
                    "datetime": "2023-03-24 12:40:14"
                },
                {
                    "id": 21,
                    "name": "客户管理",
                    "icon": "ContactsOutlined",
                    "path": "custom",
                    "info": "管理系统的所有客户",
                    "pid": 1,
                    "datetime": "2023-03-24 12:38:27"
                },
                {
                    "id": 20,
                    "name": "角色日志",
                    "icon": "ClusterOutlined",
                    "path": "role_log",
                    "info": "角色的操作日志",
                    "pid": 5,
                    "datetime": "2023-03-23 14:28:51"
                },
                {
                    "id": 19,
                    "name": "操作日志",
                    "icon": "ClockCircleOutlined",
                    "path": "organ_log",
                    "info": "组织架构操作的日志",
                    "pid": 16,
                    "datetime": "2023-03-23 14:27:51"
                },
                {
                    "id": 18,
                    "name": "登录日志",
                    "icon": "BugOutlined",
                    "path": "login_log",
                    "info": "用户的登录日志",
                    "pid": 16,
                    "datetime": "2023-03-23 10:22:02"
                },
                {
                    "id": 17,
                    "name": "工作台",
                    "icon": "CloudOutlined",
                    "path": "dash",
                    "info": "工作台，一些数据的报表",
                    "pid": 1,
                    "datetime": "2023-03-21 15:50:58"
                },
                {
                    "id": 16,
                    "name": "团队管理",
                    "icon": "AntDesignOutlined",
                    "path": "team",
                    "info": "团队相关的一些功能",
                    "pid": 4,
                    "datetime": "2023-03-19 18:46:18"
                },
                {
                    "id": 15,
                    "name": "组织架构",
                    "icon": "BranchesOutlined",
                    "path": "organ",
                    "info": "组织架构管理",
                    "pid": 16,
                    "datetime": "2023-03-19 18:33:51"
                },
                {
                    "id": 13,
                    "name": "角色管理",
                    "icon": "DeploymentUnitOutlined",
                    "path": "roles",
                    "info": "管理系统内的用户角色",
                    "pid": 5,
                    "datetime": "2023-03-17 21:05:50"
                },
                {
                    "id": 12,
                    "name": "权限配置",
                    "icon": "LockOutlined",
                    "path": "permiss",
                    "info": "页面相关的一些权限控制",
                    "pid": 5,
                    "datetime": "2023-03-17 15:53:53"
                },
                {
                    "id": 1,
                    "name": "系统入口",
                    "icon": "PartitionOutlined",
                    "path": "\/",
                    "info": "系统入口",
                    "pid": null,
                    "datetime": "2023-03-17 15:34:48"
                },
                {
                    "id": 6,
                    "name": "页面管理",
                    "icon": "PartitionOutlined",
                    "path": "routes",
                    "info": "整个系统的所有页面",
                    "pid": 5,
                    "datetime": "2023-03-15 00:18:41"
                },
                {
                    "id": 5,
                    "name": "访问控制",
                    "icon": "GoldOutlined",
                    "path": "authority",
                    "info": "权限管理的菜单",
                    "pid": 4,
                    "datetime": "2023-03-15 00:14:36"
                },
                {
                    "id": 4,
                    "name": "系统管理",
                    "icon": "",
                    "path": "sys",
                    "info": "系统管理的菜单",
                    "pid": 1,
                    "datetime": "2023-03-15 00:13:38"
                }
            ]
        }
    };
});

Mock.mock(new RegExp(`.*${api.sys.authority.role.permiss}.*`), /.*/, (request) => {

    /* 返回值 */
    return {
        "code": 1,
        "errMsg": "删除成功！",
        "data": {
            "total": [
                {
                    "permiss": 65,
                    "name": "添加客户",
                    "route": 25,
                    "info": "为下级用户新增客户"
                },
                {
                    "permiss": 69,
                    "name": "添加公海客户",
                    "route": 23,
                    "info": "修改公海客户信息"
                },
                {
                    "permiss": 83,
                    "name": "上门记录",
                    "route": 57,
                    "info": "修改客户上门记录"
                },
                {
                    "permiss": 76,
                    "name": "添加客户",
                    "route": 25,
                    "info": "修改客户信息"
                },
                {
                    "permiss": 78,
                    "name": "添加客户",
                    "route": 25,
                    "info": "修改客户状态"
                },
                {
                    "permiss": 33,
                    "name": "组织架构",
                    "route": 15,
                    "info": "修改指定员工的信息"
                },
                {
                    "permiss": 36,
                    "name": "组织架构",
                    "route": 15,
                    "info": "修改指定员工的密码"
                },
                {
                    "permiss": 32,
                    "name": "组织架构",
                    "route": 15,
                    "info": "修改指定组织的信息"
                },
                {
                    "permiss": 26,
                    "name": "角色管理",
                    "route": 13,
                    "info": "修改指定角色的权限"
                },
                {
                    "permiss": 8,
                    "name": "页面管理",
                    "route": 6,
                    "info": "修改指定页面的信息"
                },
                {
                    "permiss": 86,
                    "name": "签约记录",
                    "route": 58,
                    "info": "修改签约记录"
                },
                {
                    "permiss": 11,
                    "name": "权限配置",
                    "route": 12,
                    "info": "修改系统权限信息"
                },
                {
                    "permiss": 24,
                    "name": "角色管理",
                    "route": 13,
                    "info": "修改角色信息"
                },
                {
                    "permiss": 68,
                    "name": "客户列表",
                    "route": 31,
                    "info": "分配公海客户"
                },
                {
                    "permiss": 50,
                    "name": "添加公海客户",
                    "route": 23,
                    "info": "删除公海客户的附件"
                },
                {
                    "permiss": 82,
                    "name": "上门记录",
                    "route": 57,
                    "info": "删除客户上门记录"
                },
                {
                    "permiss": 34,
                    "name": "组织架构",
                    "route": 15,
                    "info": "删除指定员工"
                },
                {
                    "permiss": 67,
                    "name": "客户列表",
                    "route": 31,
                    "info": "删除指定的公海客户"
                },
                {
                    "permiss": 74,
                    "name": "客户列表",
                    "route": 21,
                    "info": "删除指定的客户"
                },
                {
                    "permiss": 30,
                    "name": "组织架构",
                    "route": 15,
                    "info": "删除指定的组织"
                },
                {
                    "permiss": 13,
                    "name": "角色管理",
                    "route": 13,
                    "info": "删除指定角色"
                },
                {
                    "permiss": 23,
                    "name": "角色管理",
                    "route": 13,
                    "info": "删除指定角色可访问的页面"
                },
                {
                    "permiss": 7,
                    "name": "页面管理",
                    "route": 6,
                    "info": "删除指定页面"
                },
                {
                    "permiss": 87,
                    "name": "签约记录",
                    "route": 58,
                    "info": "删除签约记录"
                },
                {
                    "permiss": 10,
                    "name": "权限配置",
                    "route": 12,
                    "info": "删除系统权限"
                },
                {
                    "permiss": 85,
                    "name": "客户列表",
                    "route": 21,
                    "info": "新增签约记录"
                },
                {
                    "permiss": 9,
                    "name": "权限配置",
                    "route": 12,
                    "info": "新增系统权限"
                },
                {
                    "permiss": 6,
                    "name": "页面管理",
                    "route": 6,
                    "info": "新增页面"
                },
                {
                    "permiss": 79,
                    "name": "系统入口",
                    "route": 1,
                    "info": "是否能够使用拨号APP"
                },
                {
                    "permiss": 57,
                    "name": "客户排名",
                    "route": 24,
                    "info": "查看上门客户图表"
                },
                {
                    "permiss": 56,
                    "name": "客户排名",
                    "route": 24,
                    "info": "查看上门客户排名"
                },
                {
                    "permiss": 73,
                    "name": "员工日志",
                    "route": 44,
                    "info": "查看下级员工的员工日志"
                },
                {
                    "permiss": 44,
                    "name": "客户列表",
                    "route": 21,
                    "info": "查看下级员工的客户"
                },
                {
                    "permiss": 54,
                    "name": "客户负债",
                    "route": 22,
                    "info": "查看下级员工的客户负债数据"
                },
                {
                    "permiss": 72,
                    "name": "客户日志",
                    "route": 26,
                    "info": "查看下级员工的操作日志"
                },
                {
                    "permiss": 77,
                    "name": "通话记录",
                    "route": 48,
                    "info": "查看下级员工的通话记录"
                },
                {
                    "permiss": 81,
                    "name": "上门记录",
                    "route": 57,
                    "info": "查看下级客户上门记录"
                },
                {
                    "permiss": 59,
                    "name": "登录日志",
                    "route": 41,
                    "info": "查看下级用户的登录日志"
                },
                {
                    "permiss": 63,
                    "name": "操作日志",
                    "route": 43,
                    "info": "查看下级用户的组织架构操作日志"
                },
                {
                    "permiss": 61,
                    "name": "角色日志",
                    "route": 42,
                    "info": "查看下级用户的角色操作日志"
                },
                {
                    "permiss": 89,
                    "name": "签约记录",
                    "route": 58,
                    "info": "查看下级的签约记录列表"
                },
                {
                    "permiss": 64,
                    "name": "添加客户",
                    "route": 25,
                    "info": "查看下级组织用户的客户详情"
                },
                {
                    "permiss": 66,
                    "name": "客户列表",
                    "route": 31,
                    "info": "查看公海客户列表"
                },
                {
                    "permiss": 71,
                    "name": "客户负债",
                    "route": 35,
                    "info": "查看公海客户的债务列表"
                },
                {
                    "permiss": 70,
                    "name": "客户列表",
                    "route": 31,
                    "info": "查看单个客户的债务"
                },
                {
                    "permiss": 53,
                    "name": "客户列表",
                    "route": 21,
                    "info": "查看单个客户的债务数据"
                },
                {
                    "permiss": 80,
                    "name": "上门记录",
                    "route": 57,
                    "info": "查看客户上门记录"
                },
                {
                    "permiss": 45,
                    "name": "客户列表",
                    "route": 21,
                    "info": "查看客户列表"
                },
                {
                    "permiss": 48,
                    "name": "添加客户",
                    "route": 25,
                    "info": "查看客户详情"
                },
                {
                    "permiss": 55,
                    "name": "客户负债",
                    "route": 22,
                    "info": "查看客户负债数据"
                },
                {
                    "permiss": 27,
                    "name": "角色管理",
                    "route": 13,
                    "info": "查看指定角色的拥有的权限"
                },
                {
                    "permiss": 58,
                    "name": "登录日志",
                    "route": 41,
                    "info": "查看用户的登录日志"
                },
                {
                    "permiss": 88,
                    "name": "签约记录",
                    "route": 58,
                    "info": "查看签约记录列表"
                },
                {
                    "permiss": 62,
                    "name": "操作日志",
                    "route": 43,
                    "info": "查看组织架构操作日志\t"
                },
                {
                    "permiss": 25,
                    "name": "角色管理",
                    "route": 13,
                    "info": "查看角色列表"
                },
                {
                    "permiss": 60,
                    "name": "角色日志",
                    "route": 42,
                    "info": "查看角色操作日志"
                },
                {
                    "permiss": 20,
                    "name": "角色管理",
                    "route": 13,
                    "info": "查询指定角色可访问的页面"
                },
                {
                    "permiss": 28,
                    "name": "组织架构",
                    "route": 15,
                    "info": "添加下级组织"
                },
                {
                    "permiss": 51,
                    "name": "添加公海客户",
                    "route": 23,
                    "info": "添加公海客户"
                },
                {
                    "permiss": 12,
                    "name": "角色管理",
                    "route": 13,
                    "info": "添加子角色"
                },
                {
                    "permiss": 75,
                    "name": "添加客户",
                    "route": 25,
                    "info": "添加客户"
                },
                {
                    "permiss": 84,
                    "name": "客户列表",
                    "route": 21,
                    "info": "添加客户上门记录"
                },
                {
                    "permiss": 29,
                    "name": "组织架构",
                    "route": 15,
                    "info": "添加指定组织的用户"
                },
                {
                    "permiss": 22,
                    "name": "角色管理",
                    "route": 13,
                    "info": "添加指定角色可访问的页面"
                },
                {
                    "permiss": 38,
                    "name": "数据概览",
                    "route": 18,
                    "info": "获取下级成员的图表数据"
                },
                {
                    "permiss": 39,
                    "name": "数据概览",
                    "route": 18,
                    "info": "获取下级成员的统计数据"
                },
                {
                    "permiss": 37,
                    "name": "组织架构",
                    "route": 15,
                    "info": "获取下级角色列表"
                },
                {
                    "permiss": 41,
                    "name": "数据概览",
                    "route": 18,
                    "info": "获取图表数据"
                },
                {
                    "permiss": 31,
                    "name": "组织架构",
                    "route": 15,
                    "info": "获取所在下级组织的列表"
                },
                {
                    "permiss": 35,
                    "name": "组织架构",
                    "route": 15,
                    "info": "获取指定组织的员工列表"
                },
                {
                    "permiss": 21,
                    "name": "角色管理",
                    "route": 13,
                    "info": "获取父角色可访问的页面列表"
                },
                {
                    "permiss": 15,
                    "name": "权限配置",
                    "route": 12,
                    "info": "获取系统权限列表"
                },
                {
                    "permiss": 42,
                    "name": "数据概览",
                    "route": 18,
                    "info": "获取统计数据"
                },
                {
                    "permiss": 17,
                    "name": "页面管理",
                    "route": 6,
                    "info": "获取页面数据列表"
                },
                {
                    "permiss": 16,
                    "name": "页面管理",
                    "route": 6,
                    "info": "获取页面数据的树形结构数据"
                },
                {
                    "permiss": 43,
                    "name": "页面管理",
                    "route": 6,
                    "info": "设置页面是否显示到菜单"
                },
                {
                    "permiss": 46,
                    "name": "客户列表",
                    "route": 21,
                    "info": "重新分配客户到指定用户"
                }
            ],
            "has": [
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                15,
                16,
                17,
                20,
                21,
                22,
                23,
                24,
                25,
                26,
                27,
                28,
                29,
                30,
                31,
                32,
                33,
                34,
                35,
                36,
                37,
                38,
                39,
                41,
                42,
                43,
                44,
                45,
                46,
                48,
                50,
                51,
                53,
                54,
                55,
                56,
                57,
                58,
                59,
                60,
                61,
                62,
                63,
                64,
                65,
                66,
                67,
                68,
                69,
                70,
                71,
                72,
                73,
                74,
                75,
                76,
                77,
                78,
                79,
                80,
                81,
                82,
                83,
                84,
                85,
                86,
                87,
                88,
                89
            ]
        }
    };
});

Mock.mock(new RegExp(`.*${api.custom.all.sell.staff}.*`), /.*/, (request) => {

    /* 返回值 */
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": (new Array(30)).fill(1).map(item => {
            return {
                "value": Mock.mock('@cname'),
                "label": Mock.mock('@cname')
            }
        })
    }
});

Mock.mock(new RegExp(`.*${api.sys.authority.routes.raw}.*`), /.*/, (request) => {
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": [
            {
                "key": 1,
                "title": "系统入口",
                "pid": null
            },
            {
                "key": 4,
                "title": "系统管理",
                "pid": 1
            },
            {
                "key": 17,
                "title": "工作台",
                "pid": 1
            },
            {
                "key": 21,
                "title": "客户管理",
                "pid": 1
            },
            {
                "key": 5,
                "title": "访问控制",
                "pid": 4
            },
            {
                "key": 16,
                "title": "团队管理",
                "pid": 4
            },
            {
                "key": 31,
                "title": "系统设置",
                "pid": 4
            },
            {
                "key": 6,
                "title": "页面管理",
                "pid": 5
            },
            {
                "key": 12,
                "title": "权限配置",
                "pid": 5
            },
            {
                "key": 13,
                "title": "角色管理",
                "pid": 5
            },
            {
                "key": 20,
                "title": "角色日志",
                "pid": 5
            },
            {
                "key": 15,
                "title": "组织架构",
                "pid": 16
            },
            {
                "key": 18,
                "title": "登录日志",
                "pid": 16
            },
            {
                "key": 19,
                "title": "操作日志",
                "pid": 16
            },
            {
                "key": 33,
                "title": "数据概览",
                "pid": 17
            },
            {
                "key": 22,
                "title": "全部客户",
                "pid": 21
            },
            {
                "key": 34,
                "title": "数据统计",
                "pid": 21
            },
            {
                "key": 23,
                "title": "客户列表",
                "pid": 22
            },
            {
                "key": 26,
                "title": "操作日志",
                "pid": 22
            },

            {
                "key": 32,
                "title": "参数配置",
                "pid": 31
            },
            {
                "key": 37,
                "title": "运行配置",
                "pid": 31
            },
            {
                "key": 35,
                "title": "服务统计",
                "pid": 34
            }
        ]
    };
});

Mock.mock(new RegExp(`.*${api.sys.authority.routes.list}.*`), /.*/, (request) => {
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": {
            "total": 26,
            "per_page": 26,
            "current_page": 1,
            "last_page": 1,
            "data": [
                {
                    "id": 37,
                    "name": "运行配置",
                    "icon": "SettingOutlined",
                    "path": "config",
                    "info": "运行参数配置\n",
                    "pid": 31,
                    "menu": 1,
                    "permission": "modify_config",
                    "datetime": "2023-04-28 11:10:14"
                },

                {
                    "id": 34,
                    "name": "数据统计",
                    "icon": "ProjectOutlined",
                    "path": "data",
                    "info": "数据统计相关的功能",
                    "pid": 21,
                    "menu": 1,
                    "permission": null,
                    "datetime": "2023-04-16 16:52:11"
                },
                {
                    "id": 33,
                    "name": "数据概览",
                    "icon": "AlertOutlined",
                    "path": "index",
                    "info": "数据概览",
                    "pid": 17,
                    "menu": 1,
                    "permission": null,
                    "datetime": "2023-03-26 19:21:27"
                },
                {
                    "id": 32,
                    "name": "参数配置",
                    "icon": "FormOutlined",
                    "path": "param",
                    "info": "设置系统的一些运行参数",
                    "pid": 31,
                    "menu": 1,
                    "permission": "add_param,del_param",
                    "datetime": "2023-03-25 09:23:42"
                },
                {
                    "id": 31,
                    "name": "系统设置",
                    "icon": "PushpinOutlined",
                    "path": "set",
                    "info": "设置系统的一些运行参数",
                    "pid": 4,
                    "menu": 1,
                    "permission": null,
                    "datetime": "2023-03-25 09:23:07"
                },


                {
                    "id": 23,
                    "name": "客户列表",
                    "icon": "BranchesOutlined",
                    "path": "sell",
                    "info": "销售端客户列表",
                    "pid": 22,
                    "menu": 1,
                    "permission": "list_sub_sell_shop,list_sell_shop,add_sell_shop,del_sell_shop,del_sub_sell_shop,move_sell_shop,show_shop_name,show_shop_status,show_shop_level,show_shop_category,show_shop_money,show_shop_source,show_shop_platform,show_shop_cooperation,show_shop_day_limit,show_shop_charge,show_shop_exceed,show_shop_main_account,show_shop_sub_account,show_shop_check_account,show_shop_pay_mode,show_shop_contact,show_shop_contact_number,show_shop_bind_mobile,show_shop_start,show_shop_next,show_shop_end,show_shop_fork,show_shop_remarks,show_shop_extra,modify_shop_name,modify_shop_status,modify_shop_level,modify_shop_category,modify_shop_money,modify_shop_source,modify_shop_platform,modify_shop_cooperation,modify_shop_day_limit,modify_shop_charge,modify_shop_exceed,modify_shop_main_account,modify_shop_sub_account,modify_shop_check_account,modify_shop_pay_mode,modify_shop_contact,modify_shop_contact_number,modify_shop_bind_mobile,modify_shop_start,modify_shop_next,modify_shop_end,modify_shop_fork,modify_shop_remarks,modify_shop_ext",
                    "datetime": "2023-03-24 12:41:14"
                },
                {
                    "id": 22,
                    "name": "全部客户",
                    "icon": "DeploymentUnitOutlined",
                    "path": "all",
                    "info": "管理全部客户",
                    "pid": 21,
                    "menu": 1,
                    "permission": null,
                    "datetime": "2023-03-24 12:40:14"
                },
                {
                    "id": 21,
                    "name": "客户管理",
                    "icon": "ContactsOutlined",
                    "path": "custom",
                    "info": "管理系统的所有客户",
                    "pid": 1,
                    "menu": 1,
                    "permission": null,
                    "datetime": "2023-03-24 12:38:27"
                },
                {
                    "id": 20,
                    "name": "角色日志",
                    "icon": "ClusterOutlined",
                    "path": "role_log",
                    "info": "角色的操作日志",
                    "pid": 5,
                    "menu": 1,
                    "permission": "list_sub_role_log,list_role_log",
                    "datetime": "2023-03-23 14:28:51"
                },
                {
                    "id": 19,
                    "name": "操作日志",
                    "icon": "ClockCircleOutlined",
                    "path": "organ_log",
                    "info": "组织架构操作的日志",
                    "pid": 16,
                    "menu": 1,
                    "permission": "list_organ_log,list_sub_organ_log",
                    "datetime": "2023-03-23 14:27:51"
                },
                {
                    "id": 18,
                    "name": "登录日志",
                    "icon": "BugOutlined",
                    "path": "login_log",
                    "info": "用户的登录日志",
                    "pid": 16,
                    "menu": 1,
                    "permission": "list_login_log,list_sub_login_log",
                    "datetime": "2023-03-23 10:22:02"
                },
                {
                    "id": 17,
                    "name": "工作台",
                    "icon": "CloudOutlined",
                    "path": "dash",
                    "info": "工作台，一些数据的报表",
                    "pid": 1,
                    "menu": 1,
                    "permission": null,
                    "datetime": "2023-03-21 15:50:58"
                },
                {
                    "id": 16,
                    "name": "团队管理",
                    "icon": "AntDesignOutlined",
                    "path": "team",
                    "info": "团队相关的一些功能",
                    "pid": 4,
                    "menu": 1,
                    "permission": null,
                    "datetime": "2023-03-19 18:46:18"
                },
                {
                    "id": 15,
                    "name": "组织架构",
                    "icon": "BranchesOutlined",
                    "path": "organ",
                    "info": "组织架构管理",
                    "pid": 16,
                    "menu": 1,
                    "permission": "add_depart,add_staff,list_role_staff,modify_password,modify_staff,list_staff,del_staff,modify_depart,list_depart,del_depart",
                    "datetime": "2023-03-19 18:33:51"
                },
                {
                    "id": 13,
                    "name": "角色管理",
                    "icon": "DeploymentUnitOutlined",
                    "path": "roles",
                    "info": "管理系统内的用户角色",
                    "pid": 5,
                    "menu": 1,
                    "permission": "add_role,del_role,access_route_list,access_route_list_raw,access_route_add,access_route_del,modify_role,role_list,modify_role_permiss,role_permiss_list",
                    "datetime": "2023-03-17 21:05:50"
                },
                {
                    "id": 12,
                    "name": "权限配置",
                    "icon": "LockOutlined",
                    "path": "permiss",
                    "info": "页面相关的一些权限控制",
                    "pid": 5,
                    "menu": 1,
                    "permission": "add_permiss,del_permiss,modify_permiss,permiss_list",
                    "datetime": "2023-03-17 15:53:53"
                },
                {
                    "id": 1,
                    "name": "系统入口",
                    "icon": "PartitionOutlined",
                    "path": "\/",
                    "info": "系统入口",
                    "pid": null,
                    "menu": 1,
                    "permission": null,
                    "datetime": "2023-03-17 15:34:48"
                },
                {
                    "id": 6,
                    "name": "页面管理",
                    "icon": "PartitionOutlined",
                    "path": "routes",
                    "info": "整个系统的所有页面",
                    "pid": 5,
                    "menu": 1,
                    "permission": "add_route,del_route,modify_route,route_list_raw,route_list,set_menu",
                    "datetime": "2023-03-15 00:18:41"
                },
                {
                    "id": 5,
                    "name": "访问控制",
                    "icon": "GoldOutlined",
                    "path": "authority",
                    "info": "权限管理的菜单",
                    "pid": 4,
                    "menu": 1,
                    "permission": null,
                    "datetime": "2023-03-15 00:14:36"
                },
                {
                    "id": 4,
                    "name": "系统管理",
                    "icon": "",
                    "path": "sys",
                    "info": "系统管理的菜单",
                    "pid": 1,
                    "menu": 1,
                    "permission": null,
                    "datetime": "2023-03-15 00:13:38"
                }
            ]
        }
    };
});

Mock.mock(new RegExp(`.*${api.sys.authority.permiss.list}.*`), /.*/, (request) => {
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": {
            "total": 77,
            "per_page": 77,
            "current_page": 1,
            "last_page": 1,
            "data": [
                {
                    "id": 43,
                    "name": "set_menu",
                    "page": "页面管理",
                    "route": 6,
                    "info": "设置页面是否显示到菜单",
                    "api": "\/sys\/route\/set_menu",
                    "datetime": "2023-03-22 19:59:46"
                },
                {
                    "id": 8,
                    "name": "modify_route",
                    "page": "页面管理",
                    "route": 6,
                    "info": "修改指定页面的信息",
                    "api": "\/sys\/route\/modify",
                    "datetime": "2023-03-18 15:19:06"
                },
                {
                    "id": 16,
                    "name": "route_list_raw",
                    "page": "页面管理",
                    "route": 6,
                    "info": "获取页面数据的树形结构数据",
                    "api": "\/sys\/route\/list_raws",
                    "datetime": "2023-03-19 18:12:56"
                },
                {
                    "id": 17,
                    "name": "route_list",
                    "page": "页面管理",
                    "route": 6,
                    "info": "获取页面数据列表",
                    "api": "\/sys\/route\/list",
                    "datetime": "2023-03-19 18:13:09"
                },
                {
                    "id": 7,
                    "name": "del_route",
                    "page": "页面管理",
                    "route": 6,
                    "info": "删除指定页面",
                    "api": "\/sys\/route\/del",
                    "datetime": "2023-03-18 15:18:16"
                },
                {
                    "id": 6,
                    "name": "add_route",
                    "page": "页面管理",
                    "route": 6,
                    "info": "新增页面",
                    "api": "\/sys\/route\/add",
                    "datetime": "2023-03-16 21:48:37"
                },
                {
                    "id": 60,
                    "name": "list_role_log",
                    "page": "角色日志",
                    "route": 42,
                    "info": "查看角色操作日志",
                    "api": "\/sys\/role\/role_log",
                    "datetime": "2023-03-23 16:02:18"
                },
                {
                    "id": 26,
                    "name": "modify_role_permiss",
                    "page": "角色管理",
                    "route": 13,
                    "info": "修改指定角色的权限",
                    "api": "\/sys\/role\/permiss_set",
                    "datetime": "2023-03-21 10:49:40"
                },
                {
                    "id": 27,
                    "name": "role_permiss_list",
                    "page": "角色管理",
                    "route": 13,
                    "info": "查看指定角色的拥有的权限",
                    "api": "\/sys\/role\/permiss_list",
                    "datetime": "2023-03-21 10:50:11"
                },
                {
                    "id": 24,
                    "name": "modify_role",
                    "page": "角色管理",
                    "route": 13,
                    "info": "修改角色信息",
                    "api": "\/sys\/role\/modify",
                    "datetime": "2023-03-21 10:46:00"
                },
                {
                    "id": 25,
                    "name": "role_list",
                    "page": "角色管理",
                    "route": 13,
                    "info": "查看角色列表",
                    "api": "\/sys\/role\/list",
                    "datetime": "2023-03-21 10:47:15"
                },
                {
                    "id": 13,
                    "name": "del_role",
                    "page": "角色管理",
                    "route": 13,
                    "info": "删除指定角色",
                    "api": "\/sys\/role\/del",
                    "datetime": "2023-03-19 13:31:07"
                },
                {
                    "id": 12,
                    "name": "add_role",
                    "page": "角色管理",
                    "route": 13,
                    "info": "添加子角色",
                    "api": "\/sys\/role\/add",
                    "datetime": "2023-03-18 18:02:07"
                },
                {
                    "id": 11,
                    "name": "modify_permiss",
                    "page": "权限配置",
                    "route": 12,
                    "info": "修改系统权限信息",
                    "api": "\/sys\/permiss\/modify",
                    "datetime": "2023-03-18 15:28:53"
                },
                {
                    "id": 15,
                    "name": "permiss_list",
                    "page": "权限配置",
                    "route": 12,
                    "info": "获取系统权限列表",
                    "api": "\/sys\/permiss\/list",
                    "datetime": "2023-03-19 14:10:09"
                },
                {
                    "id": 10,
                    "name": "del_permiss",
                    "page": "权限配置",
                    "route": 12,
                    "info": "删除系统权限",
                    "api": "\/sys\/permiss\/del",
                    "datetime": "2023-03-18 15:28:40"
                },
                {
                    "id": 9,
                    "name": "add_permiss",
                    "page": "权限配置",
                    "route": 12,
                    "info": "新增系统权限",
                    "api": "\/sys\/permiss\/add",
                    "datetime": "2023-03-18 15:28:27"
                },
                {
                    "id": 21,
                    "name": "access_route_list_raw",
                    "page": "角色管理",
                    "route": 13,
                    "info": "获取父角色可访问的页面列表",
                    "api": "\/sys\/access\/list_raws",
                    "datetime": "2023-03-19 19:05:40"
                },
                {
                    "id": 20,
                    "name": "access_route_list",
                    "page": "角色管理",
                    "route": 13,
                    "info": "查询指定角色可访问的页面",
                    "api": "\/sys\/access\/list",
                    "datetime": "2023-03-19 18:56:10"
                },
                {
                    "id": 23,
                    "name": "access_route_del",
                    "page": "角色管理",
                    "route": 13,
                    "info": "删除指定角色可访问的页面",
                    "api": "\/sys\/access\/del",
                    "datetime": "2023-03-19 19:06:52"
                },
                {
                    "id": 22,
                    "name": "access_route_add",
                    "page": "角色管理",
                    "route": 13,
                    "info": "添加指定角色可访问的页面",
                    "api": "\/sys\/access\/add",
                    "datetime": "2023-03-19 19:06:34"
                },
                {
                    "id": 37,
                    "name": "list_role_staff",
                    "page": "组织架构",
                    "route": 15,
                    "info": "获取下级角色列表",
                    "api": "\/organ\/staffs\/role_list",
                    "datetime": "2023-03-22 14:36:34"
                },
                {
                    "id": 36,
                    "name": "modify_password",
                    "page": "组织架构",
                    "route": 15,
                    "info": "修改指定员工的密码",
                    "api": "\/organ\/staffs\/password",
                    "datetime": "2023-03-22 14:35:32"
                },
                {
                    "id": 33,
                    "name": "modify_staff",
                    "page": "组织架构",
                    "route": 15,
                    "info": "修改指定员工的信息",
                    "api": "\/organ\/staffs\/modify",
                    "datetime": "2023-03-22 14:34:31"
                },
                {
                    "id": 58,
                    "name": "list_login_log",
                    "page": "登录日志",
                    "route": 41,
                    "info": "查看用户的登录日志",
                    "api": "\/organ\/staffs\/log_list",
                    "datetime": "2023-03-23 10:26:08"
                },
                {
                    "id": 35,
                    "name": "list_staff",
                    "page": "组织架构",
                    "route": 15,
                    "info": "获取指定组织的员工列表",
                    "api": "\/organ\/staffs\/list",
                    "datetime": "2023-03-22 14:35:17"
                },
                {
                    "id": 34,
                    "name": "del_staff",
                    "page": "组织架构",
                    "route": 15,
                    "info": "删除指定员工",
                    "api": "\/organ\/staffs\/del",
                    "datetime": "2023-03-22 14:34:52"
                },
                {
                    "id": 29,
                    "name": "add_staff",
                    "page": "组织架构",
                    "route": 15,
                    "info": "添加指定组织的用户",
                    "api": "\/organ\/staffs\/add",
                    "datetime": "2023-03-21 22:43:21"
                },
                {
                    "id": 62,
                    "name": "list_organ_log",
                    "page": "操作日志",
                    "route": 43,
                    "info": "查看组织架构操作日志\t",
                    "api": "\/organ\/depart\/organ_log",
                    "datetime": "2023-03-23 16:03:05"
                },
                {
                    "id": 32,
                    "name": "modify_depart",
                    "page": "组织架构",
                    "route": 15,
                    "info": "修改指定组织的信息",
                    "api": "\/organ\/depart\/modify",
                    "datetime": "2023-03-22 14:31:08"
                },
                {
                    "id": 31,
                    "name": "list_depart",
                    "page": "组织架构",
                    "route": 15,
                    "info": "获取所在下级组织的列表",
                    "api": "\/organ\/depart\/list",
                    "datetime": "2023-03-22 14:30:43"
                },
                {
                    "id": 30,
                    "name": "del_depart",
                    "page": "组织架构",
                    "route": 15,
                    "info": "删除指定的组织",
                    "api": "\/organ\/depart\/del",
                    "datetime": "2023-03-22 14:30:16"
                },
                {
                    "id": 28,
                    "name": "add_depart",
                    "page": "组织架构",
                    "route": 15,
                    "info": "添加下级组织",
                    "api": "\/organ\/depart\/add",
                    "datetime": "2023-03-21 22:42:37"
                },
                {
                    "id": 69,
                    "name": "modify_water_custom",
                    "page": "添加公海客户",
                    "route": 23,
                    "info": "修改公海客户信息",
                    "api": "\/doit\/water\/modify",
                    "datetime": "2023-05-02 10:05:09"
                },
                {
                    "id": 66,
                    "name": "list_water",
                    "page": "客户列表",
                    "route": 31,
                    "info": "查看公海客户列表",
                    "api": "\/doit\/water\/lists",
                    "datetime": "2023-05-02 09:58:42"
                },
                {
                    "id": 50,
                    "name": "del_water_uploads",
                    "page": "添加公海客户",
                    "route": 23,
                    "info": "删除公海客户的附件",
                    "api": "\/doit\/water\/deleteFile",
                    "datetime": "2023-03-22 23:54:15"
                },
                {
                    "id": 67,
                    "name": "del_water",
                    "page": "客户列表",
                    "route": 31,
                    "info": "删除指定的公海客户",
                    "api": "\/doit\/water\/del",
                    "datetime": "2023-05-02 09:59:11"
                },
                {
                    "id": 71,
                    "name": "list_water_debts_list",
                    "page": "客户负债",
                    "route": 35,
                    "info": "查看公海客户的债务列表",
                    "api": "\/doit\/water\/debts",
                    "datetime": "2023-05-02 15:13:31"
                },
                {
                    "id": 70,
                    "name": "list_water_debts",
                    "page": "客户列表",
                    "route": 31,
                    "info": "查看单个客户的债务",
                    "api": "\/doit\/water\/debt",
                    "datetime": "2023-05-02 15:12:59"
                },
                {
                    "id": 68,
                    "name": "assign_water",
                    "page": "客户列表",
                    "route": 31,
                    "info": "分配公海客户",
                    "api": "\/doit\/water\/assign",
                    "datetime": "2023-05-02 10:00:09"
                },
                {
                    "id": 51,
                    "name": "add_water_customer",
                    "page": "添加公海客户",
                    "route": 23,
                    "info": "添加公海客户",
                    "api": "\/doit\/water\/add",
                    "datetime": "2023-03-22 23:55:08"
                },
                {
                    "id": 56,
                    "name": "list_rank",
                    "page": "客户排名",
                    "route": 24,
                    "info": "查看上门客户排名",
                    "api": "\/doit\/rank\/lists",
                    "datetime": "2023-03-23 00:44:02"
                },
                {
                    "id": 57,
                    "name": "list_rank_chart",
                    "page": "客户排名",
                    "route": 24,
                    "info": "查看上门客户图表",
                    "api": "\/doit\/rank\/charts",
                    "datetime": "2023-03-23 00:44:33"
                },
                {
                    "id": 86,
                    "name": "modify_loaned",
                    "page": "签约记录",
                    "route": 58,
                    "info": "修改签约记录",
                    "api": "\/doit\/loaned\/modify",
                    "datetime": "2023-06-11 23:17:19"
                },
                {
                    "id": 88,
                    "name": "list_loaned",
                    "page": "签约记录",
                    "route": 58,
                    "info": "查看签约记录列表",
                    "api": "\/doit\/loaned\/list",
                    "datetime": "2023-06-11 23:17:53"
                },
                {
                    "id": 87,
                    "name": "del_loaned",
                    "page": "签约记录",
                    "route": 58,
                    "info": "删除签约记录",
                    "api": "\/doit\/loaned\/del",
                    "datetime": "2023-06-11 23:17:33"
                },
                {
                    "id": 85,
                    "name": "add_loaned",
                    "page": "客户列表",
                    "route": 21,
                    "info": "新增签约记录",
                    "api": "\/doit\/loaned\/add",
                    "datetime": "2023-06-11 23:16:41"
                },
                {
                    "id": 46,
                    "name": "assign_customer",
                    "page": "客户列表",
                    "route": 21,
                    "info": "重新分配客户到指定用户",
                    "api": "\/doit\/custom\/reassign",
                    "datetime": "2023-03-22 22:30:39"
                },
                {
                    "id": 76,
                    "name": "modify_customer",
                    "page": "添加客户",
                    "route": 25,
                    "info": "修改客户信息",
                    "api": "\/doit\/custom\/modify",
                    "datetime": "2023-05-02 21:22:49"
                },
                {
                    "id": 45,
                    "name": "person_list",
                    "page": "客户列表",
                    "route": 21,
                    "info": "查看客户列表",
                    "api": "\/doit\/custom\/lists",
                    "datetime": "2023-03-22 20:56:10"
                },
                {
                    "id": 48,
                    "name": "custom_detail",
                    "page": "添加客户",
                    "route": 25,
                    "info": "查看客户详情",
                    "api": "\/doit\/custom\/detail",
                    "datetime": "2023-03-22 23:14:34"
                },
                {
                    "id": 44,
                    "name": "person_sub_list",
                    "page": "客户列表",
                    "route": 21,
                    "info": "查看下级员工的客户",
                    "api": "\/doit\/custom\/depart",
                    "datetime": "2023-03-22 20:55:36"
                },
                {
                    "id": 74,
                    "name": "del_customer",
                    "page": "客户列表",
                    "route": 21,
                    "info": "删除指定的客户",
                    "api": "\/doit\/custom\/del",
                    "datetime": "2023-05-02 21:12:47"
                },
                {
                    "id": 55,
                    "name": "list_debts",
                    "page": "客户负债",
                    "route": 22,
                    "info": "查看客户负债数据",
                    "api": "\/doit\/custom\/debts",
                    "datetime": "2023-03-23 00:19:51"
                },
                {
                    "id": 53,
                    "name": "list_debt",
                    "page": "客户列表",
                    "route": 21,
                    "info": "查看单个客户的债务数据",
                    "api": "\/doit\/custom\/debt",
                    "datetime": "2023-03-23 00:10:25"
                },
                {
                    "id": 75,
                    "name": "add_customer",
                    "page": "添加客户",
                    "route": 25,
                    "info": "添加客户",
                    "api": "\/doit\/custom\/add",
                    "datetime": "2023-05-02 21:21:40"
                },
                {
                    "id": 83,
                    "name": "modify_comed",
                    "page": "上门记录",
                    "route": 57,
                    "info": "修改客户上门记录",
                    "api": "\/doit\/comed\/modify",
                    "datetime": "2023-06-11 23:00:32"
                },
                {
                    "id": 80,
                    "name": "list_comed",
                    "page": "上门记录",
                    "route": 57,
                    "info": "查看客户上门记录",
                    "api": "\/doit\/comed\/list",
                    "datetime": "2023-06-11 22:59:40"
                },
                {
                    "id": 82,
                    "name": "del_comed",
                    "page": "上门记录",
                    "route": 57,
                    "info": "删除客户上门记录",
                    "api": "\/doit\/comed\/del",
                    "datetime": "2023-06-11 23:00:19"
                },
                {
                    "id": 84,
                    "name": "add_comed",
                    "page": "客户列表",
                    "route": 21,
                    "info": "添加客户上门记录",
                    "api": "\/doit\/comed\/add",
                    "datetime": "2023-06-11 23:01:03"
                },
                {
                    "id": 41,
                    "name": "get_dash_chart",
                    "page": "数据概览",
                    "route": 18,
                    "info": "获取图表数据",
                    "api": "\/app\/dash\/datachart",
                    "datetime": "2023-03-22 15:14:44"
                },
                {
                    "id": 42,
                    "name": "get_dash_total",
                    "page": "数据概览",
                    "route": 18,
                    "info": "获取统计数据",
                    "api": "\/app\/dash\/dashboard",
                    "datetime": "2023-03-22 15:14:58"
                },
                {
                    "id": 38,
                    "name": "get_sub_chart",
                    "page": "数据概览",
                    "route": 18,
                    "info": "获取下级成员的图表数据",
                    "api": null,
                    "datetime": "2023-03-22 14:46:45"
                },
                {
                    "id": 39,
                    "name": "get_sub_total",
                    "page": "数据概览",
                    "route": 18,
                    "info": "获取下级成员的统计数据",
                    "api": null,
                    "datetime": "2023-03-22 14:47:07"
                },
                {
                    "id": 54,
                    "name": "list_sub_debts",
                    "page": "客户负债",
                    "route": 22,
                    "info": "查看下级员工的客户负债数据",
                    "api": null,
                    "datetime": "2023-03-23 00:18:39"
                },
                {
                    "id": 59,
                    "name": "list_sub_login_log",
                    "page": "登录日志",
                    "route": 41,
                    "info": "查看下级用户的登录日志",
                    "api": null,
                    "datetime": "2023-03-23 10:26:20"
                },
                {
                    "id": 61,
                    "name": "list_sub_role_log",
                    "page": "角色日志",
                    "route": 42,
                    "info": "查看下级用户的角色操作日志",
                    "api": null,
                    "datetime": "2023-03-23 16:02:31"
                },
                {
                    "id": 63,
                    "name": "list_sub_organ_log",
                    "page": "操作日志",
                    "route": 43,
                    "info": "查看下级用户的组织架构操作日志",
                    "api": null,
                    "datetime": "2023-03-23 16:03:20"
                },
                {
                    "id": 64,
                    "name": "custom_sub_detail",
                    "page": "添加客户",
                    "route": 25,
                    "info": "查看下级组织用户的客户详情",
                    "api": null,
                    "datetime": "2023-03-23 22:53:06"
                },
                {
                    "id": 65,
                    "name": "add_sub_customer",
                    "page": "添加客户",
                    "route": 25,
                    "info": "为下级用户新增客户",
                    "api": null,
                    "datetime": "2023-03-23 23:18:48"
                },
                {
                    "id": 72,
                    "name": "list_sub_logs",
                    "page": "客户日志",
                    "route": 26,
                    "info": "查看下级员工的操作日志",
                    "api": null,
                    "datetime": "2023-05-02 15:24:51"
                },
                {
                    "id": 73,
                    "name": "list_sub_staffs_logs",
                    "page": "员工日志",
                    "route": 44,
                    "info": "查看下级员工的员工日志",
                    "api": null,
                    "datetime": "2023-05-02 15:25:32"
                },
                {
                    "id": 77,
                    "name": "list_sub_dial",
                    "page": "通话记录",
                    "route": 48,
                    "info": "查看下级员工的通话记录",
                    "api": null,
                    "datetime": "2023-05-03 13:46:17"
                },
                {
                    "id": 78,
                    "name": "modify_step",
                    "page": "添加客户",
                    "route": 25,
                    "info": "修改客户状态",
                    "api": null,
                    "datetime": "2023-05-11 23:45:24"
                },
                {
                    "id": 79,
                    "name": "use_dial_app",
                    "page": "系统入口",
                    "route": 1,
                    "info": "是否能够使用拨号APP",
                    "api": null,
                    "datetime": "2023-05-16 09:19:20"
                },
                {
                    "id": 81,
                    "name": "list_sub_comed",
                    "page": "上门记录",
                    "route": 57,
                    "info": "查看下级客户上门记录",
                    "api": null,
                    "datetime": "2023-06-11 22:59:56"
                },
                {
                    "id": 89,
                    "name": "list_sub_loaned",
                    "page": "签约记录",
                    "route": 58,
                    "info": "查看下级的签约记录列表",
                    "api": null,
                    "datetime": "2023-06-11 23:18:06"
                }
            ]
        }
    };
});

Mock.mock(new RegExp(`.*${api.sys.authority.role.role_log}.*`), /.*/, (request) => {

    /* 返回值 */
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": {
            "per_page": 30,
            "current_page": 1,
            "last_page": 895,
            "data": (new Array(30)).fill(1).map((item, index) => {

                return {
                    "id": index + 1,
                    "nickname": Mock.mock('@cname()'),
                    "datetime": Mock.mock('@datetime()'),
                    "info": `【${Mock.mock('@cname()')}】新增了角色【${Mock.mock('@cname()')}】`,
                    "device": "Mozilla\/5.0 (Windows NT 6.1; WOW64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/86.0.4240.198 Safari\/537.36",
                    "ip": Mock.mock('@ip'),
                    "addr": Mock.mock('@city(true)') + " 联通",
                    "type": 1
                };

            })
        }
    };
});

/* 全局响应的方法 */
Mock.mock(new RegExp(`.*`), /.*/, (request) => {
    return {
        "code": 1,
        "errMsg": "查询成功！",
        "data": {
            "total": 0,
            "per_page": 0,
            "current_page": 1,
            "last_page": 1,
            "data": []
        }
    }
});

