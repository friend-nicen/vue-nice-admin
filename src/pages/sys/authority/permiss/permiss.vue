<template>
  <a-card :bordered="false" class="card" title="系统权限">
    <template #extra>
      <a-space>

        <a-input v-model:value="table.condition.data.api" allow-clear placeholder="输入接口名称搜索"
                 style="width: 200px;"/>

        <a-input v-model:value="table.condition.data.name" allow-clear placeholder="输入权限名称搜索"
                 style="width: 200px;"/>

        <a-tree-select v-model:value="table.condition.data.route"
                       :treeData="tree"
                       :fieldNames="{label: 'title', value: 'key', children: 'children'}"
                       allow-clear
                       tree-default-expand-all
                       placeholder="选择查看指定页面的权限"
                       style="width: 200px;"/>

        <a-button v-if="$auth(['add_permiss'])" type="primary" @click="visible_add=true">
          添加权限
          <v-icon icon="PlusOutlined"/>
        </a-button>

        <a-button v-if="$auth(['del_permiss'])" type="primary" @click="delBatch.op">
          批量删除
          <v-icon icon="DeleteOutlined"/>
        </a-button>

        <v-pop/> <!--自定义表格-->

      </a-space>
    </template>
    <!-- 权限列表 -->
    <v-table :init="face.list" :rowSelection="true">
      <template #bodyCell="{ column, record }">
        <template v-if="column.title === '操作'">
          <v-op :source="{ column, record }"/> <!--操作-->
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
      message="修改成功"
      :showBorder="false"
      name="route_mod" title="修改权限信息"/>

  <v-form
      v-model:visible="visible_add"
      :dataSource="need_add"
      :form="form_add"
      :showBorder="false"
      :init="face.add"
      message="添加成功！"
      name="route_add"
      title="权限添加">
  </v-form>

</template>

<script setup>
import init from './permiss'
import initEdit from './edit'
import VOp from "./v-op.vue";
import {delBatch} from './v-op.js'

let {
  face,
  table,
  tree
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
</style>