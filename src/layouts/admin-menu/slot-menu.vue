<template>
  <slot name="menu" :selectedKeys="selectedKeys" :items="items"></slot>
</template>

<script setup>

/*
* @author 友人a丶
* @items 所属的所有路由项
* @selectedKeys 选中的菜单
* 根据路由自动生成菜单的架子
* */

import {getChildren} from "@/router/common";
import {computed} from "vue";
import {useRoute, useRouter} from 'vue-router';

/*路由对象*/
const router = useRouter();

/*当前路由*/
const route = useRoute();

/* 显示哪个路由下面的菜单 */
const props = defineProps({
  route: {
    default: ''
  }
});

/*获取路由项*/
const items = computed(() => {

  /*
  * 如果传递了route参数
  *
  * 如果没传递值，默认获取当前路由
  * */
  if (props.route !== "") {
    const childs = getChildren(props.route);
    return !childs ? [] : childs
  } else {
    /*
      * 获取当前路由匹配的所有路由
      * 最后一个为最终匹配
      * */
    const matched = router.currentRoute.value.matched;

    /*
    * 循环获取顶级父路由
    * 排除掉 “/” 路由
    * 从第一个非 “/” 的路由开始
    * */
    for (let i = 0; i < matched.length; i++) {
      if (matched[i].path != '/') {
        return getChildren(matched[i].path);
      }
    }

  }

  return [];

});


/* 获取当前菜单的索引 */
const selectedKeys = computed({
      get() {
        return route.matched.map(item => {
          return item.path;
        });
      },
      set() {
        return;
      }
    }
);
</script>
