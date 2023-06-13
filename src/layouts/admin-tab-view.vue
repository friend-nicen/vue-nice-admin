<template>
  <a-layout >
    <admin-sidebar/>
    <!--内容-->
    <admin-page class="admin-page" :style="{paddingLeft:collapsed?collapsedWidth+'px':expandWidth+'px'}">
      <admin-tab/>
      <router-view/>
    </admin-page>
  </a-layout>
</template>

<script setup>
import setting from "@/stores/setting";
import {storeToRefs} from "pinia";

let {
  collapsed,
  collapsedWidth,
  expandWidth
} = storeToRefs(setting());
</script>

<style scoped lang="scss">
  .admin-page{
    transition: padding-left 0.2s ease;
  }
</style>