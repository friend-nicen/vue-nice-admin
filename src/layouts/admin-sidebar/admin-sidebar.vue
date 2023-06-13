<template>
  <!-- 侧边栏 -->
  <a-layout-sider v-model:collapsed="collapsed" :collapsedWidth="collapsedWidth" :trigger="null"
                  :width="expandWidth" class="admin-layout-sider" collapsible>

    <!-- 侧边栏菜单 -->
    <slot-menu #menu="menu">
      <div class="admin-sider-menu">
        <side-menu :menu="menu"/>
      </div>
    </slot-menu>

    <!--点解展开、收缩菜单-->
    <div class="collapsed" @click="toggleCollapsed">
      <v-icon v-if="collapsed" icon="MenuUnfoldOutlined"/>
      <v-icon v-else icon="MenuFoldOutlined"/>
    </div>

  </a-layout-sider>
</template>

<script setup>
/*
* @author 友人a丶
* 侧边栏菜单组件
* */


import initialize from "./initialize";

let {
  collapsed,
  collapsedWidth,
  expandWidth,
  toggleCollapsed
} = initialize();


</script>
<style lang="scss" scoped>

.admin-layout-sider {
  position: fixed;
  top: $admin-header-height;
  left: 0;
  z-index: 9;
  height: 100%;


  :deep(.ant-layout-sider-children) {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;

    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;

    height: calc(100vh - $admin-header-height);

    background: $admin-sider-bg;
    box-shadow: $admin-sider-shadow;


    .admin-sider-menu {

      width: 100%;
      height: 100%;
      overflow: auto;
      padding-top: 15px;

      /*预留滚动条位置，防止发生抖动*/
      overflow-y: scroll;
      overflow-x: hidden;

      /*导入公共的滚动条样式*/
      @include scroll-bar(3px, 3px);


      .ant-menu {
        background: transparent;
        color: $admin-menu-color;
        //margin-top: 15px;

        /* GPU加速动画 */
        -webkit-transform: translateZ(0);
        -moz-transform: translateZ(0);
        -ms-transform: translateZ(0);
        -o-transform: translateZ(0);
        transform: translateZ(0);

        .ant-menu-item {
          a {
            color: $admin-menu-color;
            font-size: $sidebar-menu-size;

            &:hover {
              color: $primary;
            }
          }
        }

        .ant-menu-inline .ant-menu-item:not(:last-child) {
          margin-bottom: 4px;
        }

        .ant-menu-item-selected {
          a {
            color: $primary;
          }
        }
      }

      .ant-menu-inline, .ant-menu-vertical {
        border-right: none;
      }
    }


    .collapsed {

      flex-shrink: 0;
      padding: 8px 16px;
      margin: 4px 0;
      border-top: 1px solid #f0f0f0;

      background: $admin-sider-bg;
      box-shadow: $admin-sider-shadow;

      cursor: pointer;

      &:hover {
        color: $primary-color;
      }
    }
  }
}
</style>
