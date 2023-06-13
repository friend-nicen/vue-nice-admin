/*
* @author 友人a丶
* @date 2022-07-11
* 全局接口
* */

const BASE_URL = import.meta.env.PROD ? "" : "https://www.example.com";

export default {
    host: `${BASE_URL}`,//全局host
    preview: `${BASE_URL}/api/v1/toLink?doc=`,
    down: `${BASE_URL}/api/v1/toDown?zip=`,
    /*用户登录*/
    login: `${BASE_URL}/entry`,
    /*工作台图表接口*/
    dash: {
        chart: `${BASE_URL}/dash/api/chart`,
        /*统计信息*/
        statistics: `${BASE_URL}/dash/api/dash`,
    },
    /*客户管理*/
    custom: {
        all: {
            log: {
                list: `${BASE_URL}/custom/log/lists`, //操作日志列表
            },
            statistic: {
                list: `${BASE_URL}/custom/statistic/lists`, //操作日志列表
                depart: `${BASE_URL}/custom/statistic/depart`, //操作日志列表
            },
            /* 销售的动作 */
            sell: {
                add: `${BASE_URL}/custom/sell/add`, //店铺添加
                list: `${BASE_URL}/custom/sell/lists`, //店铺列表
                del: `${BASE_URL}/custom/sell/del`, //删除店铺
                modify: `${BASE_URL}/custom/sell/modify`, //修改店铺
                depart: `${BASE_URL}/custom/sell/depart`, //获取所有有权限的部门
                staff: `${BASE_URL}/custom/sell/staffs`,
                assign: `${BASE_URL}/custom/sell/assign`,
                finance: `${BASE_URL}/custom/sell/finance`,
                move: `${BASE_URL}/custom/sell/move`,
                servers: `${BASE_URL}/custom/sell/getInfo`,
                toggle_status: `${BASE_URL}/custom/sell/toggle_status`,
                sub_lists: `${BASE_URL}/custom/sell/sub_lists`,
                sub_staff_lists: `${BASE_URL}/custom/sell/sub_staff_lists`,
                del_sub_account_assign: `${BASE_URL}/custom/sell/del_sub_account_assign`,
                server_list: `${BASE_URL}/custom/sell/server_list`,
                assign_sub: `${BASE_URL}/custom/sell/assign_sub`,
                doc_list: `${BASE_URL}/custom/sell/doc_list`,
                upload_doc: `${BASE_URL}/custom/sell/upload_doc`,
                del_doc: `${BASE_URL}/custom/sell/del_doc`,
            },
        }
    },
    /*获取用户的路由表*/
    sys: {
        authority: {
            routes: {
                list: `${BASE_URL}/sys/route/list`, //路由列表
                add: `${BASE_URL}/sys/route/add`, //路由添加
                modify: `${BASE_URL}/sys/route/modify`, //路由添加
                del: `${BASE_URL}/sys/route/del`, //路由删除
                raw: `${BASE_URL}/sys/route/list_raws`, //路由列表
                set_menu: `${BASE_URL}/sys/route/set_menu`
            },
            permiss: {
                list: `${BASE_URL}/sys/permiss/list`, //权限列表
                add: `${BASE_URL}/sys/permiss/add`, //权限添加
                modify: `${BASE_URL}/sys/permiss/modify`, //权限添加
                del: `${BASE_URL}/sys/permiss/del`, //权限删除
            },
            role: {
                list: `${BASE_URL}/sys/role/list`, //角色列表
                list_raw: `${BASE_URL}/sys/role/list_raw`, //角色列表
                add: `${BASE_URL}/sys/role/add`, //角色添加
                modify: `${BASE_URL}/sys/role/modify`, //角色添加
                del: `${BASE_URL}/sys/role/del`, //角色删除
                permiss: `${BASE_URL}/sys/role/permiss_list`, //查询用户的权限信息
                permiss_set: `${BASE_URL}/sys/role/permiss_set`, //查询用户的权限信息
                role_log: `${BASE_URL}/sys/role/role_log`, //登录日志
                depart: `${BASE_URL}/sys/role/depart`, //获取所有有权限的部门
            },
            access: {
                list: `${BASE_URL}/sys/access/list`, //路由列表
                add: `${BASE_URL}/sys/access/add`, //路由添加
                modify: `${BASE_URL}/sys/access/modify`, //路由添加
                del: `${BASE_URL}/sys/access/del`, //路由删除
                raw: `${BASE_URL}/sys/access/list_raws`, //路由列表,
            },
        },
        team: {
            depart: {
                list: `${BASE_URL}/organ/depart/list`, //部门列表
                add: `${BASE_URL}/organ/depart/add`, //部门添加
                modify: `${BASE_URL}/organ/depart/modify`, //部门修改
                del: `${BASE_URL}/organ/depart/del`, //部门删除
                organ_log: `${BASE_URL}/organ/depart/organ_log`, //登录日志
            },
            staff: {
                list: `${BASE_URL}/organ/staffs/list`, //用户列表
                add: `${BASE_URL}/organ/staffs/add`, //用户添加
                modify: `${BASE_URL}/organ/staffs/modify`, //用户添加
                del: `${BASE_URL}/organ/staffs/del`, //用户删除
                password: `${BASE_URL}/organ/staffs/password`, //用户密码
                roles: `${BASE_URL}/organ/staffs/role_list`, //用户密码
                login_log: `${BASE_URL}/organ/staffs/login_log`, //登录日志
            },
        },
        set: {
            get_param: `${BASE_URL}/sys/set/get_param`, //获取参数
            del_param: `${BASE_URL}/sys/set/del_param`, //删除参数
            add_param: `${BASE_URL}/sys/set/add_param`, //新增参数
            get_configs: `${BASE_URL}/sys/set/configs`, //获取配置
            set_configs: `${BASE_URL}/sys/set/modify_configs`, //修改配置
        },
    }
}