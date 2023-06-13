<template>

  <div class="container">
    <!-- 输出筛选条件 -->
    <div class="operation">
      <v-batch layout="horizontal" label="fixed" :form="form" :data="table.condition.data"/>
      <a-button type="primary" v-if="$auth('add_server_sub_account')" @click="showAssign">新增子账号分配</a-button>
    </div>

    <v-table :sticky="{offsetHeader: 0}" :init="list_api">
      <template #bodyCell="{ record,column }">
        <template v-if="column.title === '操作'">
          <a v-if="$auth('delete_server_sub_account')" style="white-space: nowrap;"
             @click.prevent="del(record.id)">删除</a>
          <a v-else style="white-space: nowrap;">无权限</a>
        </template>
      </template>
    </v-table>

  </div>


  <!--分配给客服-->
  <v-form
      v-model:visible="visible_assign"
      :dataSource="need_assign"
      :form="form_assign"
      :init="assign_api"
      message="分配成功！"
      :after="sync_sub_lists"
      name="sub_account_assign"
      title="分配子账号给正在服务的客服">
  </v-form>

</template>

<script setup>

//自定义事件
import {inject, ref} from "vue";
import load from "@/common/load";
import axios from "axios";
import api from "@/service/api";
import initAssign from './assign'
import initTable from "@/common/init-table";
import {filterOptions} from "@/common";


const shop = inject("select_shop_sub"); //被选店铺
const list_api = api.custom.all.sell.sub_staff_lists;
const sub_lists = ref([]); //子账号列表

let {
  form_assign,
  need_assign,
  visible_assign,
  assign_api,
  showAssign
} = initAssign(sub_lists);


/*
* 表格列
* */
const columns = [
  {
    "title": "序号",
    "dataIndex": "id",
    "default": true,
    "width": 80,
    "minWidth": 80
  },
  {
    "title": "客服",
    "dataIndex": "nickname",
    "default": true,
    "width": 150
  },
  {
    "title": "子账号",
    "dataIndex": "account",
    "width": 100,
    "minWidth": 100
  },
  {
    "title": "子账号密码",
    "dataIndex": "password",
    "width": 100,
    "minWidth": 100
  },
  {
    "title": "分配时间",
    "dataIndex": "datetime",
    "width": 180,
    "minWidth": 180
  },
  {
    "title": "操作",
    "width": 50,
    "minWidth": 50
  },
];
/*
* 筛选的表单
* */
const form = [
  {
    key: 'subs',
    type: "select",
    label: "选择子账号",
    grid: {
      xxl: 24,
      xl: 24,
      lg: 24,
      md: 24,
      sm: 24,
      xs: 24,
    },
    attr: {
      showSearch: true,
      placeholder: "请选择分配的子账号",
      filterOption: filterOptions,
      options: sub_lists
    }
  },
];

/*
* 同步子账号
* */
const sync_sub_lists = () => {

  /* 显示加载效果 */
  load.loading("加载中...");

  try {


    /* 开始请求 */
    axios.get(api.custom.all.sell.sub_lists + `?shop=${shop.value}`)
        .then((res) => {
          /*
          * 判断请求结果
          * */
          if (res.data.code) {
            sub_lists.value = res.data.data;
          } else {
            /* 弹出错误原因 */
            load.error(res.data.errMsg);
          }
        }).catch((e) => {
      /* 弹出错误原因 */
      load.error(e.message);
    }).finally(() => {
      /* 关闭加载效果 */
      load.loaded();
    });

  } catch (e) {
    console.log(e)
    load.error(e);
  }

};
sync_sub_lists(); //初始化
/* 初始化表格 */
const table = initTable({
  unique: 'Sub-account-Custom-List-Table',
  column: columns,
  condition: {
    account: null,
    shop: shop.value
  }
});


/*
* 删除子账号
* */
const del = (id) => {
  load.confirm("是否从该客服的子账号列表删除这个子账号？", () => {
    /* 显示加载效果 */
    load.loading("加载中...");

    try {
      /* 开始请求 */
      axios.post(api.custom.all.sell.del_sub_account_assign, {
        key: id
      }).then((res) => {
        /*
        * 判断请求结果
        * */
        if (res.data.code) {
          load.success(res.data.errMsg);
          sync_sub_lists(); //重新同步账户
          table.loadData(); //表格刷新
        } else {
          /* 弹出错误原因 */
          load.error(res.data.errMsg);
        }
      }).catch((e) => {
        /* 弹出错误原因 */
        load.error(e.message);
      }).finally(() => {
        /* 关闭加载效果 */
        load.loaded();
      });
    } catch (e) {
      console.log(e)
      load.error(e);
    }

  })
}

</script>


<style scoped lang="scss">

.container {

  height: 60vh;
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px 20px 20px;
  overflow: hidden;
  overflow-y: auto;
  @include scroll-bar();

  .operation {
    @include flex-center;
    justify-content: space-between;
    width: 100%;
    margin: 20px 0;
  }

  :deep(.ant-form) {
    width: 45%;

    .ant-form-item {
      margin-bottom: 0 !important;
    }
  }

}


</style>