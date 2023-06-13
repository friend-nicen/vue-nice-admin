<template>
  <div class="dashborad">
    <a-row class="detail">
      <a-col :span="24">
        <a-card :title="'欢迎回来，'+user.nickname" :bordered="false">
          <a-row justify="space-between">

            <a-col :span="6">
              <v-card title="客户总数" :type="0" :number="data.data.count" unit="人"/>
            </a-col>
            <a-col :span="6">
              <v-card title="今日新增" :type="1" :number="data.data.week" unit="个"/>
            </a-col>
            <a-col :span="6">
              <v-card title="昨日总数" :type="2" :number="data.data.half" unit="个"/>
            </a-col>
            <a-col :span="6">
              <v-card title="七日新增" :type="3" :number="data.data.month" unit="个"/>
            </a-col>

          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-row class="full">
      <a-col :span="24" style="margin-top: 12px;">
        <a-card title="数据总览" :bordered="false">
          <template #extra>
            <a-range-picker size="large" v-model:value="range" :disabled-date="disabledDate"
                            :allowClear="false"/>
          </template>

          <v-chart title="新增客户数量" :api="api.dash.chart"/>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import api from '@/service/api';
import initialize from "./initialize";
import statistic from "./detail"
import userInfo from '@/stores/user'

let {range, disabledDate} = initialize();
let user = userInfo();
let data = statistic();


</script>

<style lang="scss" scoped>
/*
  占满屏幕不超出
*/
.dashborad {

  height: calc(100vh - 94px);
  padding-left: 1.5rem;
  @include full;


  .detail {
    :deep(.ant-card) {

      .ant-card-head {
        padding: 25px 1.25rem 16px 0 !important;
      }

      .ant-card-body {
        padding: 1.6rem;
      }
    }
  }

  .full {

    height: 100%;

    :deep(.ant-card) {

      @include full;
      height: 100%;


      .ant-card-head {
        padding: 25px 1.25rem 16px 0 !important;
      }


      .ant-card-body {
        height: 100%;
      }
    }
  }

}

</style>