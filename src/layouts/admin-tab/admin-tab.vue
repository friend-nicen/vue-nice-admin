<template>
  <div>
    <div class="inline">
      <a-tabs v-model:activeKey="selectedKeys" @tabClick="goto">

        <template v-for="item of items" :key="item.path">
          <a-tab-pane v-show="exclude.indexOf(item.meta.name) == -1" :tab="item.meta.name"/>
        </template>

      </a-tabs>
      <template v-if="showBatch">
        <a-button @click="toLink">
          <template #icon>
            <v-icon icon="SelectOutlined" size="12px"/>
          </template>
          批量投放
        </a-button>
      </template>
      <template v-else>
        <span></span>
      </template>
    </div>
  </div>
</template>

<script setup>

import {useRouter, useRoute} from "vue-router";
import {getChildren} from "@/router/common";
import {computed, inject} from "vue";

let props = defineProps({
  showBatch: {
    required: false
  },
  exclude: {
    required: false,
    default: []
  }
});


let link; //跳转链接
/*是否显示批量投放按钮*/
if (props.showBatch) {
  link = inject("linkToBatch");
}

let router = useRouter();
let route = useRoute();

/* 同级的所有路由 */
let items = computed(() => {
  let routes = getChildren(route.matched[route.matched.length - 2].path, true);
  return routes;
});


//批量投放
let toLink = () => {
  window.open('/#' + link.value, "_blank");
}


/*路由跳转*/
let goto = (path) => {
  router.push(path)
}

/* 获取当前菜单的索引 */
let selectedKeys = computed({
      get() {
        return route.matched[route.matched.length - 1].path;
      },
      set() {
        return;
      }
    }
);

</script>

<style lang="scss" scoped>

.inline {

  @include flex-center;
  position: relative;
  width: 100%;
  justify-content: space-between;

  :deep(.ant-tabs) {

    .ant-tabs-tab {
      padding: 6px 0;
    }

    color: $text;

    .ant-tabs-nav {
      margin-bottom: 12px;

      &:before {
        border: none;
      }
    }

  }
}


</style>