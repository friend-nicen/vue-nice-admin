/*
* @author 友人a丶
* @date 
* 
* */
import initTable from "@/common/init-table";
import api from "@/service/api";
import {computed, inject, provide, ref, watch} from "vue";
import {getTree} from "@/common/tree";
import user from "@/stores/user";

export default function () {

    /*
    * 初始化表头
    * */
    const columns = [
        {
            title: "路径",
            dataIndex: 'path',
            width: 200,
        },
        {
            title: "名称",
            dataIndex: 'name',
            width: 100,
        },
        {
            title: "菜单图标",
            dataIndex: 'icon',
            width: 100,
        },
        {
            title: "说明",
            dataIndex: 'info',
            width: 240,
        },
        {
            title: "操作",
            fixed: "right",
            width: 100
        }
    ];

    const userInfo = user(); //用户信息
    const visible = ref(false); //可见
    const visible_permiss = ref(false); //可见
    const checked = ref([]); //所有页面的id
    const watchSelfRole = computed(() => {
        return (role.value && role.value.key == userInfo.role.id) //角色和当前用户的角色一致时，不可操作
    });

    provide("watchSelfRole",watchSelfRole); //注入依赖

    /*
    * 接口数据处理
    * */
    const filter = (data) => {

        const temp = [];//被选页面

        data.forEach(item => {
            temp.push(item.id);
        })

        checked.value = temp; //被选页面

        return {
            data: getTree(data, null, "id")
        };
    }


    const table = initTable({
        unique: 'Roles-Routes-Table',
        column: columns,
        condition: {
            role: null,
            name: null
        },
        filter: filter
    }); //初始化表格

    /*
    * 更新被选角色
    * */
    const role = inject("role");

    watch(() => role, () => {
        table.condition.data.role = role.value.key;
    }, {
        deep: true
    })

    /*
    * 接口列表
    * */
    const face = {
        list: api.sys.authority.access.list,
        add: api.sys.authority.access.add,
        delete: api.sys.authority.access.del
    };


    return {
        face,
        table,
        role,
        userInfo,
        visible,
        checked,
        visible_permiss,
        watchSelfRole
    };

}
