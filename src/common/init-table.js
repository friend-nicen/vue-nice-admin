/*
* @author 友人a丶
* @date
* */

import {useLocalStorage, store} from "@/common";
import {provide, reactive, computed} from "vue";
import {cloneDeep} from "lodash";
import dayjs from "dayjs";

/*
* 组件版本控制
* */
const Version = ['5.2.3', '5.1.0'];


/**
 * 规范表头
 * @param columns
 */
export function Columns(columns) {

    /* 默认列配置对象 */
    const column = {
        fixed: false,
        resizable: true,
        display: true,
        width: 100
    };

    return columns.map((item) => {
        item = Object.assign(cloneDeep(column), item);
        return item;
    })
}

/**
 * 初始化表格
 */
export default function (set) {

    /*
    * 初始化的默认配置
    * */
    const config = {
        unique: null, //区分本地存储的表头
        column: null, //列配置
        condition: null, //查询条件
        callback: null,//数据加载完毕后的回调函数
        filter: null,//数据加载完后是否要过滤
        localize: false, //表头是否本地存储
        defaultExpandAllRows: true,//是否要展开所有行
        check: null //权限校验，过滤无权限查看的列
    };

    Object.assign(config, set); //重载用户的配置

    /* 解构配置 */
    let {
        unique,
        column,
        condition,
        callback,
        localize,
        filter,
        defaultExpandAllRows,
        check
    } = config

    /*
    * 用于自定义排序的列
    * */
    const sort = reactive({
        left: [], plain: [], right: []
    });

    column = Columns(column); //处理表头


    /*
    * 删除旧记录
    * */
    localStorage.removeItem(unique + "-default" + Version[0]);
    localStorage.removeItem(unique + "-used" + Version[0]);

    const defaultColumns = useLocalStorage(unique + "-default" + Version[1], cloneDeep(column), localize);
    const usedColumns = useLocalStorage(unique + "-used" + Version[1], cloneDeep(column), localize);

    /* 表配置 */
    const columns = computed(() => {

        let items = usedColumns.value;


        /*
        * 如果已经请求了表头
        * 这个表头是完整的包括所有数据的表头
        * 初次请求的是默认的表头（用户修改指标之后保存的表头）
        * */
        if (!!items) {

            let left = [];
            let plain = [];
            let right = [];


            /*
            * 如果需要权限判断
            * */
            if (check) {
                items = items.filter(item => {
                    return check(item);
                })
            }


            items.forEach((item) => {
                /*
                * 判断是否需要排序
                * */
                // eslint-disable-next-line no-prototype-builtins
                if (item.hasOwnProperty("sortable")) {


                    if (item.sortable == "number") {
                        item.sorter = {
                            compare: (a, b) => a[item.dataIndex] - b[item.dataIndex], multiple: 2
                        }
                    } else if (item.sortable == "dayjs") {

                        item.sorter = {
                            compare(a, b) {

                                if (dayjs(a[item.dataIndex]).isBefore(dayjs(b[item.dataIndex]))) {
                                    return -1
                                } else if (a[item.dataIndex] == b[item.dataIndex]) {
                                    return 0
                                } else {
                                    return 1
                                }
                            },
                            multiple: 2
                        }
                    }

                }

                /*
                * 判断是否显示
                * */
                if (item.fixed == "left") {
                    left.push(item);
                } else if (item.fixed == "right") {
                    right.push(item);
                } else {
                    item.fixed = false;
                    plain.push(item)
                }

            });

            sort.left = left;
            sort.plain = plain;
            sort.right = right;

            let newColumns = left.concat(plain).concat(right).filter((item) => {
                return item.display;
            }); //合并

            return newColumns;
        }


        return [];
    });


    /*
    * 初始化表头
    * */
    provide("usedColumns", usedColumns); //完整的表头
    provide("defaultColumns", defaultColumns); //默认表头的备份
    provide("sort", sort); //默认表头的备份
    provide("columns", columns); //默认表头的备份


    /*暴露出表格初始化数据的方法*/
    const table = reactive({
        loadData: null,
        selectRows: {
            keys: [],
            rows: []
        },
        condition: !condition ? {} : store(condition),
        callback: callback,
        filter: filter,
        defaultExpandAllRows
    });


    provide("table", table);


    return table;

}