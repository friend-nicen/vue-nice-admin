<template>


  <div class="roles" :style="{width:width+'px'}" ref="role_dom">


    <template v-if="loaded">
      <a-tree
          v-if="tree.length > 0"
          v-model:expandedKeys="expanded.data"
          :selectedKeys="selectedKeys"
          @select="(selectedKeys,e)=>{role=e.node}"
          block-node
          :tree-data="tree">

        <template #title="node">

          <a-tooltip placement="right">
            <template #title>
              {{ node.info }}
            </template>
            <div class="node">
            <span>
              <a-tag color="blue">角色</a-tag>
              <span>{{ node.title }}</span>
            </span>
              <v-op :node="node"/>
            </div>
          </a-tooltip>

        </template>

      </a-tree>
      <v-empty v-else description="暂无数据"/>
    </template>
    <template v-else>
      <a-spin :spinning="!loaded">
        <div class="spin"></div>
      </a-spin>
    </template>
    <!--用户信息修改-->
    <!-- expanded.save 保存刷新前的展开状态   -->
    <v-form
        v-model:visible="visible_mod"
        :dataSource="need_mod"
        :before="expanded.save"
        :form="form_mod"
        :showBorder="false"
        :init="face.modify"
        message="修改成功"
        :union="true"
        name="role_mod" title="修改角色信息"/>


    <v-form
        v-model:visible="visible_add"
        :dataSource="need_add"
        :before="expanded.save"
        :form="form_add"
        :init="face.add"
        :showBorder="false"
        message="添加成功！"
        name="role_add"
        :union="true"
        title="添加下级角色">
    </v-form>

  </div>

  <div class="picker" @mousedown="start"></div>

</template>
<script setup>
import initEdit from './edit'
import VOp from './v-op.vue'
import init_move from "./move"
import init from './init'

let {
  expanded,
  tree,
  face,
  role,
  loaded,
  selectedKeys
} = init();

let {
  visible_add,
  visible_mod,
  form_add,
  need_add,
  form_mod,
  need_mod
} = initEdit();

let {
  role_dom,
  start,
  width
} = init_move();
</script>

<style scoped lang="scss">

.roles {

  display: flex;
  flex-direction: column;

  padding-right: 1.1rem;
  width: 300px;
  box-sizing: border-box;
  flex-shrink: 1;
  height: 100%;

  overflow: auto;
  @include scroll-bar;


  :deep(.ant-tree) {
    .ant-tree-treenode {
      white-space: nowrap;
      padding: 1px 0;

      .ant-tree-node-content-wrapper {
        padding: 2px 4px;
      }

      .operate {
        display: inline-flex;
        margin-left: 8px;
        cursor: pointer;
        color: $black;

        span {
          &:active {
            color: $sub-text;
          }
        }

      }

    }

    .ant-tag {
      line-height: normal;
    }

    .ant-tag-blue {
      color: $primary-color;
      border-color: $primary-color;
      background-color: transparent;
    }


  }

  .node {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.picker {
  width: 1px;
  height: 100%;
  background-color: #e5e5e5;
  cursor: col-resize;
  margin: 0 1.5px;
}

.spin {
  @include flex-center;
  height: 50vh;
  width: 100%;
}
</style>