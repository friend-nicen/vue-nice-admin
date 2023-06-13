import api from "@/service/api"
import initTable from "@/common/init-table";
import {disabledDate} from '@/common'


/*表格列配置*/
const columns = [
    {
        title: '序号',
        default: true,
        width: 50,
        maxWidth: 50
    },
    {
        title: '操作人',
        dataIndex: 'nickname',
        default: true,
        width: 100,
        maxWidth: 100
    },
    {
        title: '操作类型',
        dataIndex: 'type',
        default: true,
        width: 100,
        maxWidth: 100
    },
    {
        title: '操作内容',
        dataIndex: 'info',
        default: true,
        width: 100,
        maxWidth: 100
    },
    {
        title: '登录IP',
        dataIndex: 'ip',
        width: 60,
        maxWidth: 60
    },
    {
        title: '登录地址',
        dataIndex: 'addr',
        width: 100,
        maxWidth: 100
    },
    {
        title: '登录设备',
        dataIndex: 'device',
        width: 200,
        maxWidth: 200
    },
    {
        title: '操作时间',
        dataIndex: 'datetime',
    },
];


/*
* 用户信息初始化
* */
export default function () {


    /* */
    let form = [
        {
            key: 'nickname',
            type: "input",
            label: "员工姓名",
            attr: {
                placeholder: "输入员工姓名"
            }
        },
        {
            key: 'info',
            type: "input",
            label: "关键字",
            attr: {
                placeholder: "输入关键字搜索"
            }
        },
        {
            key: 'type',
            type: "select",
            label: "操作类型",
            attr: {
                options: [
                    {
                        label: "新增客户",
                        value: 1
                    },
                    {
                        label: "删除客户",
                        value: 2
                    },
                    {
                        label: "修改客户",
                        value: 3
                    },
                    {
                        label: "分配客户",
                        value: 4
                    },
                    {
                        label: "转移客户",
                        value: 5
                    }
                ],
                placeholder: "请选择操作类型"
            }
        },
        {
            key: 'ip',
            type: "input",
            label: "IP地址",
            attr: {
                placeholder: "输入IP地址"
            }
        },
        {
            key: 'addr',
            type: "input",
            label: "登录地址",
            attr: {
                placeholder: "输入登录地址"
            }
        },
        {
            key: 'datetime',
            type: "range-picker",
            label: "时间范围",
            attr: {
                disabledDate: disabledDate
            }
        },
    ];


    let table = initTable({
        unique: 'Login-log-Table',
        column: columns,
        condition: {
            nickname: null,
            ip: null,
            addr: null,
            type: null,
            info: null,
            datetime: [null, null]
        }
    })

    return {
        condition: table.condition,
        face: api.custom.all.log.list,
        form
    }


}


