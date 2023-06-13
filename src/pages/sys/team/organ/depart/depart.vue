<template>


  <div class="departlist" :style="{width:width+'px'}" ref="depart_dom">


    <template v-if="loaded">
      <a-tree
          v-if="tree.length > 0"
          v-model:expandedKeys="expanded.data"
          :selectedKeys="selectedKeys"
          @select="(selectedKeys,e)=>{department=e.node}"
          block-node
          :tree-data="tree">

        <template #title="node">

          <div class="node">

            <span>
                <a-tag v-if="node.remarks" color="blue">{{ node.remarks }}</a-tag>
                 <span>{{ node.title }}（{{ !node.count ? 0 : node.count }}人）</span>
            </span>

            <v-op :node="node"/>

          </div>


        </template>

      </a-tree>
    </template>
    <template v-else>
      <a-spin :spinning="!loaded">
        <div class="spin"></div>
      </a-spin>
    </template>

    <!--用户信息修改-->
    <v-form
        v-model:visible="visible_mod"
        :dataSource="need_mod"
        :before="expanded.save"
        :form="form_mod"
        :init="face.modify"
        message="修改成功！"
        name="depart_mod" title="修改部门信息"/>


    <v-form
        v-model:visible="visible_add"
        :dataSource="need_add"
        :before="expanded.save"
        :form="form_add"
        :init="face.add"
        message="添加成功！"
        name="depart_add"
        title="添加子部门">
    </v-form>

  </div>

  <div class="picker" @mousedown="start"></div>

</template>
<script setup>
import initEdit from './edit'
import VOp from './v-op.vue'
import init from './init'
import init_move from "./move"

let {
  expanded,
  tree,
  face,
  department,
  selectedKeys,
  loaded
} = init();

let {
  visible_add,
  visible_mod,
  form_add,
  need_add,
  form_mod,
  need_mod
} = initEdit(tree);


let {
  depart_dom,
  start,
  width
} = init_move();

</script>

<style scoped lang="scss">

.departlist {

  display: flex;
  flex-direction: column;

  padding-right: 1.1rem;
  width: 270px;
  box-sizing: border-box;
  flex-shrink: 1;
  height: 100%;

  overflow-x: auto;
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