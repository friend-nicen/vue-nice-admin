<template>
  <a-dropdown trigger="click">
    <a class="ant-dropdown-link" @click.prevent>
      操作
      <v-icon icon="DownOutlined" size="8px"/>
    </a>
    <template #overlay v-if="$auth(['del_sell_shop','modify_sell_shop','assign_server_shop','move_sell_shop'],true)">
      <a-menu>

        <a-menu-item v-if="$auth('del_sell_shop')">

          <a-tooltip placement="leftTop">
            <template #title>
              删除这个客户在系统内的所有记录
            </template>
            <a class="ant-dropdown-link" @click.prevent="del()">
              删除当前客户
            </a>
          </a-tooltip>


        </a-menu-item>


        <a-menu-item v-if="$auth('modify_sell_shop')">

          <a-tooltip placement="leftTop">
            <template #title>
              修改客户的信息
            </template>
            <a class="ant-dropdown-link" @click.prevent="showCanModify(source.record)">
              修改客户信息
            </a>
          </a-tooltip>


        </a-menu-item>

        <a-menu-item v-if="$auth('assign_server_shop')">

          <a-tooltip placement="leftTop">
            <template #title>
              将客户的分配给指定的客服
            </template>
            <a class="ant-dropdown-link" @click.prevent="showCanAssign(source.record.id)">
              分配给指定客服
            </a>
          </a-tooltip>

        </a-menu-item>

        <a-menu-item v-if="$auth('assign_finance_shop')">

          <a-tooltip placement="leftTop">
            <template #title>
              将客户的分配给指定的财务
            </template>
            <a class="ant-dropdown-link" @click.prevent="showCanFinance(source.record.id)">
              分配给指定财务
            </a>
          </a-tooltip>

        </a-menu-item>

        <a-menu-item v-if="$auth('move_sell_shop')">
          <a-tooltip placement="leftTop">
            <template #title>
              将客户的转移给其他销售
            </template>
            <a class="ant-dropdown-link" @click.prevent="showCanMove(source.record.id)">
              分配给其他销售
            </a>
          </a-tooltip>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup>
/* eslint-disable */
import init from "./v-op"

let props = defineProps(['source']);
let {del, showCanAssign, showCanMove, showCanModify, showCanFinance} = init(props);
</script>

<style lang="scss" scoped>
.ant-dropdown-link {
  white-space: nowrap;
}
</style>