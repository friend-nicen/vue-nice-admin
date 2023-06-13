<template>
  <a-config-provider :locale="zhCN">

    <template v-if="['/login','/403','/404'].indexOf($route.path) > -1">
      <router-view/>
    </template>

    <template v-else>
      <router-view :include=" ['Admin-View']" v-slot="{ Component }">
        <keep-alive>
          <component :is="Component"/>
        </keep-alive>
      </router-view>
    </template>
  </a-config-provider>
</template>

<script setup>
/*引入全局中文语言包*/
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';


dayjs.locale('zh');


</script>

<style lang="scss">

@font-face {
  font-family: DINPro;
  src: url('@/assets/font/DINPro-Medium.otf'),
}


body {
  margin: 0;
  padding: 0;
  width: 100% !important;
  background-color: #f6f9f9 !important;

  /* 顶部滚动条 */
  #nprogress .bar {
    background: $primary-color !important;
  }

  /*
    保持滚动条显示
    处理滚动条导致的抖动问题
  */
  @include scroll-bar;
  overflow-y: scroll !important;

  &::-webkit-scrollbar-thumb {
    display: block;
  }

  /*
    防止弹窗导致滚动条抖动
  */
  .ant-modal-centered {
    @include scroll-bar;
    overflow-y: scroll !important;

    &::-webkit-scrollbar-thumb {
      display: block;
    }
  }

  #app {
    width: 100%;
    height: 100%;
  }

  /*
    全局表格字体替换
  */
  table td {
    font-family: DINPro, PingFang SC, -apple-system, BlinkMacSystemFont, Segoe UI, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol !important;
  }
}

/* 全局屏蔽滚动 */
.with_overflow {
  overflow: hidden !important;
}

</style>
