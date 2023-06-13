/*
* @author 友人a丶
* @date 
* 
* */
import {switchForm} from "@/common";
import {computed, inject, reactive, ref, watch} from "vue";
import axios from "axios";
import load from "@/common/load";
import {debounce} from 'lodash';
import {getNode} from "@/common/tree";

export default function (props) {

    const table = inject("table");
    const expandedRowKeys = ref([]); //展开的行


    /**
     * 返回表格行key值
     * @param record
     * @returns {*}
     */
    function key(record) {
        return record[props.rowsKey];
    }

    /*
   * 表数据
   * */
    const dataSource = reactive({
        data: {
            data: []
        }
    })

    /* 注入 */
    table.dataSource = dataSource; //挂载到标对象

    /*
    * 如果指定了数据源
    * */
    if (!!props.dataSource) {
        dataSource.data.data = computed(() => {

            let data = []; //最终输出的数据
            /*
            * 筛选条件
            * */
            // eslint-disable-next-line no-prototype-builtins
            let condition = switchForm(table.condition.hasOwnProperty('data') ? table.condition.data : {});

            /*
            * 筛选遍历
            * */
            props.dataSource.forEach(item => {

                let result = true; //筛选结果

                /* 条件过滤 */
                for (let i in condition) {
                    if (item[i].indexOf(condition[i]) == -1) {
                        result = false;
                    }
                }

                if (result) data.push(item);
            })

            return data;

        })
    }


    /*
    * 分页
    * */
    const pagination = reactive(Object.assign({
        current: 1,
        pageSize: 30,
        pageSizeOptions: ['30', '50', '100'],
        showSizeChanger: true,
        showQuickJumper: true,
        total: 0
    }, props.pagination))


    /*
    * 初始化表头
    * */
    const column = inject("columns");//表头
    const loadingTable = ref(false);


    /**
     * 初始化数据
     * @param paginate
     * @param filters
     * @param sorter
     */
    const loadData = (paginate = null) => {

        /*
        * 翻页的页号
        * */
        let page = pagination.current;


        if (paginate) {
            if (!!paginate.current) {
                page = paginate.current;
                pagination.current = paginate.current;
                pagination.pageSize = paginate.pageSize;
            }
        }

        if (!!props.dataSource) return; //如果传递了静态数据
        loadingTable.value = true; //加载效果
        /*
        开始请求
        合并请求条件
        */
        axios.post(props.init, Object.assign({
            pageSize: pagination.pageSize,
            page: page
            // eslint-disable-next-line no-prototype-builtins
        }, switchForm(table.condition.hasOwnProperty('data') ? table.condition.data : {})))
            .then((res) => {
                /*
                * 判断请求结果
                * */
                if (res.data.code) {

                    /*
                    * 是否需要过滤数据
                    * */
                    if (!!table.filter) {
                        dataSource.data = table.filter(res.data.data.data);
                    } else {
                        dataSource.data = res.data.data;
                    }


                    /*
                     * 是否需要展开行
                     * */
                    if (!!table.defaultExpandAllRows) {
                        expandedRowKeys.value = getNode(dataSource.data.data, 'id');
                    }


                    /*更新分页信息*/
                    pagination.current = res.data.data.current_page;
                    pagination.total = res.data.data.total;
                    pagination.pageSize = res.data.data.per_page;

                    if (!!table.callback) {
                        table.callback(res.data, pagination);
                    }

                } else {
                    /* 弹出错误原因 */
                    load.error(res.data.errMsg);
                }
            }).catch((e) => {
            /* 弹出错误原因 */
            load.error(e.message);
        }).finally(() => {
            /* 关闭加载效果 */
            loadingTable.value = false;
        });
    }


    /*
    * 列宽调整
    * */
    const handleResizeColumn = (w, col) => {
        col.width = w;
    };


    loadData(); //直接开始初始化数据
    table.loadData = debounce(loadData, 500); //注入方法
    /*
    * 表格是否具有条件
    * 监控条件变化
    * */

    if (!!table.condition.data) {
        watch(table.condition.data, () => {
            table.loadData()
        }, {
            deep: true
        })
    }

    /*
    * 列选择触发
    * */
    if (props.rowSelection) {

        let rowsAll = []; //所有被选中的列

        var selectConfig = {
            onChange(keys, rows) {
                table.selectRows.keys = keys;
                rowsAll = rows;
            },
            selectedRowKeys: computed(() => {
                return table.selectRows.keys;
            })
        }

        /*
        * keys被删除时，同步rows的状态
        * */
        table.selectRows.rows = computed(() => {
            let keys = table.selectRows.keys;
            return rowsAll.filter(item => {
                return keys.indexOf(item[props.rowsKey]) > -1
            })
        });
    }


    return {
        column,
        data: dataSource,
        key,
        loadData: table.loadData,
        loadingTable,
        paginate: pagination,
        handleResizeColumn,
        selectConfig,
        expandedRowKeys
    }
}