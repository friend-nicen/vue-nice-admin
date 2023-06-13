<template>

  <!--顶部导航栏 -->
  <a-layout-header class="admin-header">

    <!--logo -->
    <admin-header-title/>
    <!--导航栏菜单 -->
    <admin-header-menu v-if="config.layout.showHeadermenu"/>
    <!--用户相关 -->
    <admin-user/>

  </a-layout-header>

</template>
<script setup>
import config from '@/config'
</script>
<style scoped lang="scss">

/*
  顶部当导航栏
*/
.admin-header {

  @include flex-center; //flex上下居中
  justify-content: space-between;

  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  overflow: hidden;

  width: 100%;
  height: $admin-header-height;


  padding: 0;

  background-color: $bg-color;
  box-shadow: $shadow;

}


</style>