<template>

  <!-- 后台容器 -->
  <a-layout class="admin-layout">
    <!--顶部导航栏 -->
    <admin-header/>
    <router-view/>
  </a-layout>

</template>


<style lang="scss" scoped>

/*
  全局样式
*/
.admin-layout {

  display: flex;
  width: 100%;
  height: 100%;
  padding-top: $admin-header-height;

}

</style>