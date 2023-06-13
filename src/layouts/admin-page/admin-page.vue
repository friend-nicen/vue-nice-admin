<template>
  <a-layout>
    <!-- 主要内容 -->
    <a-layout-content class="admin-layout-content">
      <slot/>
    </a-layout-content>
  </a-layout>
</template>
<style lang="scss" scoped>
/*内容区域*/
.admin-layout-content {
  background-color: white;
  min-height: unset;
  padding: 0;
}
</style>