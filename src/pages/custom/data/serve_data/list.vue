<template>
  <div class="card">

    <a-card title="通话记录" :bordered="false">

      <template #extra>
        <div class="search">
          <a-space>
            <v-pop/><!--表格设置-->
          </a-space>
        </div>
      </template>

      <!-- 输出筛选条件 -->
      <v-batch label="fixed" layout="horizontal" :showReset="true" :form="form" :data="condition.data"/>

      <div style="margin: 10px 0 25px 0;">
        <a-row justify="space-between">

          <a-col :span="6">
            <v-data title="总通话次数" :type="0" :number="statistic.total" unit="次"/>
          </a-col>
          <a-col :span="6">
            <v-data title="接通次数" :type="1" :number="statistic.ok_total" unit="次"/>
          </a-col>
          <a-col :span="6">
            <v-data title="未接通次数" :type="2" :number="statistic.no_total" unit="次"/>
          </a-col>
          <a-col :span="6">
            <v-data title="总通话时长" :type="3" :number="statistic.total_time" unit="秒"/>
          </a-col>

        </a-row>
      </div>

      <v-table :init="face">
        <template #bodyCell="{ column,index,record }">
          <template v-if="column.title === '序号'">
            <div>{{ index + 1 }}</div>
          </template>
          <template v-else-if="column.title === '通话状态'">
            <a-tag color="pink">{{ !record.duration ? "未接" : record.status }}</a-tag>
          </template>
          <template v-else-if="column.title === '通话时长'">
            {{ getTime(record.duration, true) }}
          </template>
        </template>
      </v-table>
    </a-card>
  </div>

</template>
<script setup>

import init from './list';
import {getTime} from '@/common'
import VData from './v-data.vue'


/*
* 初始化表单和表格
* */
let {
  condition,
  //reset,
  face,
  form,
  statistic
} = init();


</script>


<style lang="scss" scoped>

@include card;

</style>
