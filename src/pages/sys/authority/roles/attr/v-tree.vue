<template>
  <a-modal
      :visible="visible"
      :maskClosable="false"
      title="新增角色可访问的页面"
      :width="420"
      class="picker-tree"
      @cancel="close"
      @ok="add">

    <template #footer>
      <div class="footer">
        <span class="info">
          <span style="color: red;">*</span>
          只能选择父角色拥有的页面
        </span>
        <a-space>
          <a-button @click="close">取消</a-button>
          <a-button type="primary" @click="add">确定</a-button>
        </a-space>
      </div>
    </template>

    <div class="container">

      <template v-if="loaded">
        <a-tree
            :show-line="true"
            v-model:expandedKeys="expandedKeys"
            v-model:checkedKeys="checkedKeys"
            checkable
            checkStrictly
            :tree-data="tree"
            v-if="tree.length > 0"
        >
        </a-tree>
        <v-empty v-else description="暂无数据"/>
      </template>
      <template v-else>
        <a-spin :spinning="!loaded">
          <div class="spin"></div>
        </a-spin>
      </template>

    </div>

  </a-modal>
</template>

<script setup>
// 树形数据
import {computed, inject, ref, watch} from "vue";
import load from "@/common/load";
import axios from "axios";
import api from "@/service/api";
import {getNode, getTree} from "@/common/tree";
import {cloneDeep} from "lodash";


//自定义事件
const emit = defineEmits(['update:visible']); //自定义事件
//组件属性
const props = defineProps({
  visible: {
    required: false,
    default: false
  },
  checked: {
    required: false,
    default: []
  }
});

//加载状态
const loaded = ref(false);
//树形数据
const tree = ref([]);
//更新被选角色
const role = inject("role");
//表格对象
const table = inject("table");
//展开的行
const expandedKeys = ref([]);
const checkedKeys = ref([]);


//关闭弹窗
const close = () => {
  emit('update:visible', false)
};
//初始化数据
const init = () => {

  /* 显示加载效果 */
  load.loading("加载中...");
  loaded.value = false;

  try {
    /* 开始请求 */
    axios.post(api.sys.authority.access.raw + `?role=${role.value.key}`)
        .then((res) => {
          /*
          * 判断请求结果
          * */
          if (res.data.code) {

            tree.value = getTree(res.data.data, null, 'key', (item) => {
              if (props.checked.indexOf(item.key) > -1) {
                item.disabled = true;
                return item;
              } else {
                return item;
              }
            });

            expandedKeys.value = getNode(tree.value);
            checkedKeys.value = cloneDeep(props.checked);

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
      loaded.value = true;
    });
  } catch (e) {
    console.log(e)
    load.error(e);
  }
}

/*
* 显示已选项
* */
watch(() => props.visible, () => {
  if (props.visible) {
    /* 清空 */
    expandedKeys.value = [];
    checkedKeys.value = [];

    init(); //初始化数据
  }
})

/*
* 排除已存在的路由之后的已选路由
* */
const routes = computed(() => {
  return (Array.isArray(checkedKeys.value) ? checkedKeys.value : checkedKeys.value.checked).filter((item) => {
    return props.checked.indexOf(item) == -1;
  });
})

/*
* 页面新增
* */
const add = () => {


  try {


    if (routes.value.length == 0) {
      load.error("请选择需要新增的页面！");
      return;
    }

    /* 显示加载效果 */
    load.loading("加载中...");
    /* 开始请求 */
    axios.post(api.sys.authority.access.add, {
      role: role.value.key,
      route: routes.value
    }).then((res) => {
      /*
      * 判断请求结果
      * */
      if (res.data.code) {
        load.success("新增成功！");
        close(); //关闭页面
        table.loadData(); //重载表格数据
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

}
</script>

<style lang="scss">
.picker-tree {
  .ant-modal-body {
    padding: 0;

    .ant-tree .ant-tree-treenode {
      padding: 0 0 6px 0;
      gap: 6px;
    }
  }
}
</style>

<style scoped lang="scss">

.container {

  max-height: 65vh;
  height: 50vh;
  box-sizing: border-box;
  width: 100%;
  padding: 20px 20px 20px 42px;
  overflow: hidden;
  overflow-y: auto;
  @include scroll-bar();
}

.footer {
  @include flex-center;
  justify-content: space-between;

  .info {
    font-size: $font-size-sm;
  }
}

.spin {
  @include flex-center;
  height: 50vh;
  width: 100%;
}
</style>