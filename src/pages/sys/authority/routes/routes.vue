<template>
  <a-card :bordered="false" class="card" title="系统路由">
    <template #extra>
      <a-space>

        <a-input v-model:value="table.condition.data.name" allow-clear placeholder="输入路由名称搜索"
                 style="width: 240px;"/>

        <a-button type="primary" @click="visible_add=true" v-if="$auth(['add_route'])">
          添加路由
          <v-icon icon="PlusOutlined"/>
        </a-button>

        <a-button type="primary" @click="delBatch.op" v-if="$auth(['del_route'])">
          批量删除
          <v-icon icon="DeleteOutlined"/>
        </a-button>

        <v-pop/> <!--自定义表格-->

      </a-space>
    </template>
    <!-- 路由列表 -->
    <v-table :init="face.list" :rowSelection="true">
      <template #bodyCell="{ column, record }">
        <template v-if="column.title === '操作'">
          <v-op :source="{ column, record }"/> <!--操作-->
        </template>
        <template v-else-if="column.dataIndex === 'permission'">
          <v-excerpt title="权限列表" :content='record.permission'/>
        </template>
        <template v-else-if="column.dataIndex === 'menu'">
          <a-switch @change="change(record.id)" :checked="record.menu == 1"/>
        </template>
        <template v-else-if="column.dataIndex === 'icon'">
          <v-icon v-if="record.icon" :icon="record.icon"></v-icon>
        </template>
      </template>
    </v-table>
  </a-card>

  <!--用户信息修改-->
  <v-form
      v-model:visible="visible_mod"
      :dataSource="need_mod"
      :form="form_mod"
      :init="face.modify"
      :after="loadTree"
      message="修改成功"
      :showBorder="false"
      name="route_mod" title="修改路由信息"/>

  <v-form
      v-model:visible="visible_add"
      :dataSource="need_add"
      :form="form_add"
      :showBorder="false"
      :init="face.add"
      :after="loadTree"
      message="添加成功！"
      name="route_add"
      title="路由添加">
  </v-form>


</template>

<script setup>
import init from './routes'
import initEdit from './edit'
import VOp from "./v-op.vue";
import {delBatch} from './v-op.js'

let {
  face,
  table,
  tree,
  loadTree,
  change
} = init();

let {
  visible_add,
  visible_mod,
  form_add,
  need_add,
  form_mod,
  need_mod
} = initEdit(tree); //初始化编辑表单


</script>

<style lang="scss" scoped>
@include card;
.permiss {
  max-width: 300px;
}
</style>