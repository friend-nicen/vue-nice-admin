<template>

  <a-dropdown autoAdjustOverflow placement="bottomRight">
    <template #overlay>

      <a-menu @click="quitSystem">
        <a-menu-item-group>
          <template #title>
            <div class="menu-title">
              <span class="menu-title-up">{{ username }}</span>
              <span class="menu-title-bottom">所在组织：{{ depart.name }}</span>
            </div>
          </template>
          <a-menu-divider/>
          <a-menu-item key="4">
            <template #icon>
              <v-icon icon="LogoutOutlined" :size="false"/>
            </template>
            退出登录
          </a-menu-item>
        </a-menu-item-group>
      </a-menu>
    </template>
    <div class="userInfo">
      <a-avatar :size="28" :src="`${config.logo}`"/>
      <span class="nickname">{{ nickname }}</span>
      <span class="version">{{ role.name }}</span>
    </div>
  </a-dropdown>


</template>

<script setup>
/*
* 顶部导航用户信息组件
* */
import user from "@/stores/user";
import {storeToRefs} from 'pinia';
import quitSystem from "@/service/quit-system";
import config from "@/config";

let userInfo = user();

let {
  nickname,
  username,
  depart,
  role
  //phone,
} = storeToRefs(userInfo)

</script>

<style lang="scss" scoped>

.userInfo {
  height: 60px;
  display: flex;
  align-items: center;
  margin-right: 36px;
  cursor: pointer;
  position: relative;

  .nickname {
    margin: 0 12px;
    font-size: 14px;
    white-space: nowrap;
    color: $text;
  }


  .version {
    display: inline;
    padding: 0 3px;
    border: 1px solid $border-2;

    line-height: normal;
    white-space: nowrap;
    font-size: 12px;
    color: $sub-sub-text;
    border-radius: 4px;
  }

}


:deep(.ant-dropdown-menu-item) {
  margin: $margin-menu 0;
}


.menu-title {
  display: flex;
  flex-direction: column;
  margin: 0 $margin-menu;
  min-width: 180px;

  .menu-title-up {
    font-weight: bold;
    color: $sub-text;
  }

  .menu-title-bottom {
    margin-top: $margin-menu;
    font-size: $font-size-sm-sm;
  }

  .red {
    font-weight: bold;
    color: red;
  }
}

</style>