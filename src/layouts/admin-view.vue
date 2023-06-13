<template>
  <a-layout>
    <admin-sidebar/>
    <!--内容-->
    <admin-page class="admin-page" :style="{paddingLeft:collapsed?collapsedWidth+'px':expandWidth+'px'}">
      <router-view/>
    </admin-page>
  </a-layout>
</template>

<script setup name="Admin-View">
import setting from "@/stores/setting";
import {storeToRefs} from "pinia";

/*是否收缩*/
let {
  collapsed,
  collapsedWidth,
  expandWidth
} = storeToRefs(setting());

</script>

<style lang="scss">
.admin-page {
  transition: padding-left 0.2s ease;
}
</style>