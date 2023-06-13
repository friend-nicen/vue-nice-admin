/*
* @author 友人a丶
* @date 
* 
* */
import initTable from "@/common/init-table";
import api from "@/service/api";
import {computed, inject, watch} from "vue";
import user from "@/stores/user";

export default function () {

    const userInfo = user();//用户信息
    const depart_init = inject("depart_init"); //初始化部门树


    /*
    * 初始化表头
    * */
    const columns = [
        {
            title: "ID",
            width: 50,
            default: true
        },
        {
            title: "用户名",
            dataIndex: 'username',
            width: 150,
            default: true
        },
        {
            title: "姓名",
            dataIndex: 'nickname',
            width: 150,
        },
        {
            title: "所在部门",
            dataIndex: 'depart_name',
            width: 150,
        },
        {
            title: "角色",
            dataIndex: 'role_name',
            width: 100,
        },
        {
            title: "账号状态",
            dataIndex: 'status',
            width: 100,
        },
        {
            title: "注册时间",
            dataIndex: 'register',
            width: 180,
        },
        {
            title: "操作",
            fixed: "right",
            width: 100,
            resizable: true,
            display: true
        }
    ];


    const table = initTable({
            unique: 'Sys-Staffs-Table',
            column: columns,
            condition: {
                nickname: null,
                role: null,
                status: '0',
                depart: null
            }
        }
    ); //初始化表格

    /*
    * 更新被选部门
    * */
    const department = inject("department");

    /*
    * 查看自己的部门
    * */
    const watchSelfDepart = computed(() => {
        return (department.value && department.value.key == userInfo.depart.id) //角色和当前用户的角色一致时，不可操作
    });

    watch(() => department, () => {
        console.log(department)
        table.condition.data.depart = department.value.key;
    }, {
        deep: true
    })

    /*
    * 接口列表
    * */
    const face = {
        list: api.sys.team.staff.list,
        add: api.sys.team.staff.add,
        delete: api.sys.team.staff.del,
        modify: api.sys.team.staff.modify,
        password: api.sys.team.staff.password,
        move: api.sys.team.staff.move
    };


    /*
    * 筛选条件
    * */


    return {
        face,
        table,
        department,
        userInfo,
        watchSelfDepart,
        depart_init
    };

}
