import api from "@/service/api"
import initTable from "@/common/init-table";
import {disabledDate, filterOptions} from '@/common'
import {computed} from "vue";


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
        width: 100,
        maxWidth: 100
    },
    {
        title: '客户',
        dataIndex: 'customer',
        width: 100,
        maxWidth: 100
    },
    {
        title: '手机号',
        dataIndex: 'mobile',
        width: 100,
        maxWidth: 100
    },
    {
        title: '归属地',
        dataIndex: 'place',
        width: 100,
        maxWidth: 100
    },
    {
        title: '通话状态',
        dataIndex: 'status',
        width: 100,
        maxWidth: 100
    },
    {
        title: '通话时长',
        dataIndex: 'duration',
        default: true,
        width: 100,
        maxWidth: 100
    },
    {
        title: '通话录音',
        dataIndex: 'src',
        width: 100,
        maxWidth: 100
    },
    {
        title: '通话时间',
        dataIndex: 'callTime',
        width: 60,
        maxWidth: 60
    },
    {
        title: '记录时间',
        dataIndex: 'datetime',
        width: 60,
        maxWidth: 60
    }
];


/*
* 用户信息初始化
* */
export default function () {


    /* */
    const form = [
        {
            key: 'staff',
            type: "input",
            label: "员工姓名",
            attr: {
                placeholder: "输入员工姓名搜索"
            }
        },
        {
            key: 'customer',
            type: "input",
            label: "客户姓名",
            attr: {
                placeholder: "输入客户姓名搜索"
            }
        },
        {
            key: 'status',
            type: "select",
            label: "通话状态",
            attr: {
                showSearch: true,
                placeholder: "请选择通话状态",
                filterOption: filterOptions,
                options: [
                    {
                        label: "接通",
                        value: 1
                    },
                    {
                        label: "未接",
                        value: 2
                    }
                ]
            }
        },
        {
            key: 'depart',
            label: "所属团队",
            type: "TreeSelect",
            data: api.custom.all.statistic.depart,
            permiss: 'person_sub_list',
            attr: {
                allowClear: true,
                placeholder: "请选择所属团队",
                "tree-default-expand-all": true,
                fieldNames: {label: 'title', value: 'key', children: 'children'}
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


    const table = initTable({
        unique: 'Dial-List-Table',
        column: columns,
        condition: {
            staff: null,
            customer: null,
            depart: null,
            datetime: [null, null],
            status: null
        }
    });


    /*
    * 统计
    * */
    const statistic = computed(() => {

        if (!!table.dataSource) {
            return {
                total: table.dataSource.data.total,
                ok_total: table.dataSource.data.ok_total,
                no_total: table.dataSource.data.no_total,
                total_time: table.dataSource.data.total_time
            }
        } else {
            return {
                total: 0,
                ok_total: 0,
                no_total: 0,
                total_time: 0
            }
        }

    })

    return {
        condition: table.condition,
        face: api.custom.all.statistic.list,
        form,
        statistic
    }


}


