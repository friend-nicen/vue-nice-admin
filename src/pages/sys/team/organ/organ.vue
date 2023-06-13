<template>

  <div class="card">
    <a-card title="组织架构" :bordered="false">

      <!--  部门树  -->
      <depart-tree/>
      <!--  用户列表  -->
      <staff-list/>
    </a-card>
  </div>

</template>

<script setup>
import DepartTree from './depart'
import StaffList from './staff'
import {provide, ref} from "vue";

provide("department", ref(null));
provide("tree", ref([]));
provide("depart_init", {init: null}); //部门树刷新
</script>

<style lang="scss" scoped>

@include card;

.card {
  height: calc(100vh - 95px);
  overflow: hidden;
  /*修改卡片的样式*/
  :deep(.ant-card) {
    height: 100%;
    @include full;

    .ant-card-body {
      padding: 15px 10px 0 10px;
      @include flex-center;
      align-items: flex-start;
      height: 100%;
      overflow: hidden;
    }
  }
}

</style>