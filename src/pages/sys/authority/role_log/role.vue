<template>
  <div class="card">

    <a-card title="角色日志" :bordered="false">

      <template #extra>
        <div class="search">
          <a-space>
            <v-pop/><!--表格设置-->
          </a-space>
        </div>
      </template>

      <!-- 输出筛选条件 -->
      <v-batch layout="horizontal" :showReset="true" :form="form" :data="condition.data"/>

      <v-table :init="face">
        <template #bodyCell="{ column,index }">
          <template v-if="column.title === '序号'">
            <div>{{ index + 1 }}</div>
          </template>
        </template>
      </v-table>
    </a-card>
  </div>

</template>
<script setup>

import init from './role';


/*
* 初始化表单和表格
* */
let {
  condition,
  //reset,
  face,
  form
} = init();


</script>


<style lang="scss" scoped>

@include card;

</style>
