<template>
  <div class="card">

    <a-card title="客户列表" :bordered="false">

      <template #extra>
        <div class="search">
          <a-space>

            <a-button v-if="$auth('add_sell_shop')" type="primary" @click="visible_add=true">
              添加客户
              <v-icon icon="PlusOutlined"/>
            </a-button>

            <a-button @click="condition.reset">
              重置筛选
            </a-button>

            <v-pop/> <!--自定义表格-->

          </a-space>
        </div>
      </template>

      <!-- 输出筛选条件 -->
      <v-batch :check="check" layout="horizontal" label="fixed" :form="form" :data="condition.data"/>


      <v-table :init="face.list">
        <template #bodyCell="{ record,column,text }">
          <template v-if="column.title === '序号'">
            <div>{{ record.id }}</div>
          </template>

          <template v-else-if="column.title === '店铺名称'">
            <a style="white-space: nowrap;" @click.prevent="showRecord(record)">{{ record.name }}</a>
          </template>

          <template v-else-if="column.title === '备注'">
            <v-excerpt title="备注" :content="record.remarks"/>
          </template>
          <template v-else-if="column.title === '额外的备注'">
            <v-excerpt title="额外的备注" :content="record.extra"/>
          </template>

          <template v-else-if="column.title == '子账号'">
            <a @click.prevent="showSubAccount(record.id)">
              {{ (!record.sub_account ? 0 : record.sub_account.split("\n").length) }}个
            </a>
          </template>


          <template v-else-if="column.title == '相关文档'">
            <a @click.prevent="showDoc(record.id)">
              {{ record.doc }}个
            </a>
          </template>

          <template
              v-else-if="column.title.indexOf('账号和密码') > -1">
            <v-excerpt :title="column.title" :nextline="true" :content="text"/>
          </template>

          <template v-else-if="column.title === '客户状态'">
            <v-status :status="record.status" :id="record.id"/>
          </template>

          <template v-else-if="column.title === '关联客服'">
            <a @click.prevent="showServers(record.id)">{{
                (!record.servers ? "0人" : record.servers.split(",").length + "人")
              }}</a>
          </template>
          <template v-else-if="column.title === '合作类型'">
            <a-tag color="orange">{{ record.cooperation }}</a-tag>
          </template>
          <template v-else-if="column.title === '操作'">
            <v-op :source="{ column, record }"/> <!--操作-->
          </template>
        </template>
      </v-table>
    </a-card>
  </div>

  <!-- 客户录入 -->
  <v-drawer
      v-model:visible="visible_add"
      :dataSource="need_add"
      :form="form_add"
      :labelSpan="6"
      :width="800"
      :init="face.add"
      add_class="adjust"
      layout="vertical"
      :centered="true"
      :grid="{xxl: 12, xl: 12, lg: 12, md: 12, sm: 12, xs: 12}"
      message="添加成功！"
      :showBorder="false"
      name="custom_add"
      title="客户添加">
  </v-drawer>

  <!-- 客户录入 -->
  <v-drawer
      v-model:visible="visible_modify"
      :dataSource="need_modify"
      :form="form_modify"
      :labelSpan="6"
      :width="800"
      :check="check"
      :init="face.modify"
      add_class="adjust"
      layout="vertical"
      :centered="true"
      :grid="{xxl: 12, xl: 12, lg: 12, md: 12, sm: 12, xs: 12}"
      message="修改成功！"
      :showBorder="false"
      name="custom_add"
      title="客户信息修改">
  </v-drawer>


  <!-- 客户信息查询 -->
  <v-drawer
      v-model:visible="visible_see"
      :dataSource="need_see"
      :form="form_see"
      :labelSpan="6"
      :width="800"
      add_class="adjust"
      layout="vertical"
      :centered="true"
      :footer="false"
      :check="check"
      :grid="{xxl: 12, xl: 12, lg: 12, md: 12, sm: 12, xs: 12}"
      :showBorder="false"
      name="custom_see"
      title="客户查看">
  </v-drawer>

  <!--分配给客服-->
  <v-form
      v-model:visible="visible_assign"
      :dataSource="need_assign"
      :form="form_assign"
      :init="assign_api"
      message="分配成功！"
      name="shop_assign"
      title="分配给客服">
  </v-form>

  <!--分配给客服-->
  <v-form
      v-model:visible="visible_move"
      :dataSource="need_move"
      :form="form_move"
      :init="move_api"
      message="转移成功！"
      name="shop_move"
      title="转移客户给其他销售">
  </v-form>


  <!--分配给财务-->
  <v-form
      v-model:visible="visible_finance"
      :dataSource="need_finance"
      :form="form_finance"
      :init="finance_api"
      message="分配成功！"
      name="shop_finance"
      title="分配给财务">
  </v-form>


  <!-- 弹出客服选择 -->
  <server-list v-model:visible="visible_server"/>
  <sub-account v-model:visible="visible_sub"/>
  <doc-list v-model:visible="visible_doc"/>


</template>
<script setup>
import ServerList from './server.vue'
import SubAccount from './a-sub'
import DocList from './a-doc'
import init from './sell';
import initServer from './server'
import initEdit from './edit'
import initShow from './show'
import initShowSub from './sub_account'
import initDoc from './doc'
import initMove from './move'
import initModify from './modify'
import initAssign from './assign'
import initFinance from './finance'
import VOp from "./v-op.vue";
import VStatus from "./v-status.vue";


/*
* 初始化表单和表格
* */
let {
  condition,
  face,
  form,
  check
} = init();


/*
* 查看客服
* */
const {
  visible_server,
  showServers
} = initServer();

const {
  visible_sub,
  showSubAccount
} = initShowSub();


const {
  visible_doc,
  showDoc
} = initDoc();

let {
  visible_add,
  form_add,
  need_add,
} = initEdit(); //初始化编辑表单

let {
  form_see,
  need_see,
  visible_see,
  showRecord
} = initShow();

let {
  visible_modify,
  form_modify,
  need_modify
} = initModify();


let {
  form_assign,
  need_assign,
  visible_assign,
  assign_api
} = initAssign();


let {
  form_move,
  need_move,
  visible_move,
  move_api
} = initMove();

let {
  form_finance,
  need_finance,
  visible_finance,
  finance_api
} = initFinance();
</script>


<style lang="scss">
.adjust {
  .ant-form-item {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>


<style lang="scss" scoped>

@include card;

</style>
