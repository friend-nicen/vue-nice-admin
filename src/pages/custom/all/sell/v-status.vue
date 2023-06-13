<template>

  <a-switch checked-children="合作" un-checked-children="暂停" v-if="$auth('modify_shop_status')" :checked="status == 1"
            @click="toggleStatus(id)"/>
  <a-switch checked-children="合作" un-checked-children="暂停" v-else :checked="status == 1"/>
</template>

<script setup>

import load from "@/common/load";
import axios from "axios";
import {inject} from "vue";
import api from "@/service/api";

const props = defineProps(['status', 'id']);
const table = inject("table");

/*
* 切换状态
* */
const toggleStatus = () => {
  load.confirm("您确定要修改该客户的状态？", () => {
    /* 显示加载效果 */
    load.loading("加载中...");

    try {
      /* 开始请求 */
      axios.post(api.custom.all.sell.toggle_status, {
        shop: props.id
      }).then((res) => {

        /*
        * 判断请求结果
        * */
        if (res.data.code) {
          load.success("修改成功");
          table.loadData(); //刷新表格
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
  });
}
</script>
