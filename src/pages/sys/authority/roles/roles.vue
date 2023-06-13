<template>

  <div class="card">
    <a-card title="角色管理" :bordered="false">

      <!--  角色树  -->
      <role-tree/>
      <!--  属性列表  -->
      <attr-list/>
    </a-card>
  </div>

</template>

<script setup>
import RoleTree from './role'
import AttrList from './attr'
import {provide, ref} from "vue";

provide("role", ref(null));
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