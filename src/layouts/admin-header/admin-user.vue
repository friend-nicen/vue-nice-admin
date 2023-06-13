<template>
  <div class="admin-header-right">
    <!-- 系统消息 -->
    <admin-message/>
    <!--个人信息头像 -->
    <admin-avatar/>
  </div>
</template>

<style scoped lang="scss">
.admin-header-right{
  @include flex-center;
  justify-content: center;
}
</style>