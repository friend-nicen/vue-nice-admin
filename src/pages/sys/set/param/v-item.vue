<template>
  <div class="item">
    <v-table :scroll="{x: 'max-content',y:'calc(100vh - 225px)'}" :init="face.list" :pagination="false">
      <template #headerCell="{ column }">
        <template v-if="column.title === '删除'">
          <a @click.prevent="visible_add=true">新增</a>
        </template>
        <template v-else-if="column.title === '选项值'">
          {{ title }}
        </template>
      </template>
      <template #bodyCell="{ column,record }">
        <template v-if="column.title === '删除'">
          <a @click.prevent="del(record)">删除</a>
        </template>
      </template>
    </v-table>
  </div>

  <v-form
      v-model:visible="visible_add"
      :dataSource="need_add"
      :form="form_add"
      :init="face.add"
      message="添加成功！"
      name="value_add"
      title="添加选项值">
  </v-form>

</template>

<script setup>

import init from './param';
import initEdit from './edit'

const props = defineProps(['title', 'type'])

import api from "@/service/api";

/*
* 接口列表
* */
const face = {
  list: api.sys.set.get_param + "?type=" + props.type,
  add: api.sys.set.add_param + "?type=" + props.type,
};

let {
  need_add,
  form_add,
  visible_add
} = initEdit();


const del = init();//初始化表格
</script>

<style lang="scss" scoped>
.item {
  width: 19.5%;
}
</style>