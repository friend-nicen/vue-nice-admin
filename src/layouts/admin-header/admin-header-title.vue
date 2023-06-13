<template>
  <div :style="{width:collapsed?collapsedWidth+'px':(expandWidth-10)+'px'}" class="admin-title"
       @click="$router.push(user().index)">
    <div class="logo">
      <img :src="config.logo"/>
    </div>
    <div :style="{width:collapsed?'0':'110px'}" class="title">
      <h1>
        {{ config.title }}
      </h1>
    </div>
  </div>
</template>

<script setup>
import user from '@/stores/user';
import setting from "@/stores/setting";
import config from "@/config";
import {storeToRefs} from "pinia";

/*是否收缩*/
let {
  collapsed,
  collapsedWidth,
  expandWidth
} = storeToRefs(setting());

</script>

<style lang="scss" scoped>

.admin-title {

  @include flex-center;
  flex-shrink: 0;

  height: 100%;
  transition: width 0.2s ease;

  cursor: pointer;

  .logo {
    height: 100%;
    flex-shrink: 0;
    @include flex-center;
    justify-content: flex-start;
    padding: 0 12px 0 25px;

    img {
      height: 50%;
      width: 32px;
    }
  }

  .title {

    width: 110px;
    transition: all 0.2s ease;
    overflow: hidden;
    font-family: Mini, PingFang SC, -apple-system, BlinkMacSystemFont, Segoe UI, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol !important;
    letter-spacing: 1px;

    h1 {
      font-size: 18px;
      font-family: Mini;
      font-weight: bold;
      white-space: nowrap;
      margin: 0;
    }
  }

}

</style>