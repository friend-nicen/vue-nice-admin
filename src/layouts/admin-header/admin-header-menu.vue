<template>
  <slot-menu #menu="menu" route="/">
    <div class="admin-header-menu">
      <a-menu v-model:selectedKeys="menu.selectedKeys" :style="{ lineHeight: '64px' }" mode="horizontal">

        <a-menu-item v-for="item in menu.items" :key="item.path">
          <!--有子元素的显示下拉-->
          <template v-if="item.children">
            <a-popover overlayClassName="ant-popover-placement-self" placement="top">
              <template #content>
                <admin-menu-list :children="item.children"/>
              </template>
              <router-link :to="item.path"> {{ item.meta.name }}</router-link>
            </a-popover>
          </template>

          <template v-else>
            <router-link :to="item.path"> {{ item.meta.name }}</router-link>
          </template>

        </a-menu-item>

      </a-menu>
    </div>
  </slot-menu>
</template>
<script setup>
/*
* @author 友人a丶
* 顶部菜单组件
* */
</script>

<style lang="scss" scoped>

@mixin after {
  a {
    color: $primary-color;
  }
  &:after {
    visibility: visible;
    border: none !important;
  }
}


.admin-header-menu {
  width: 100%;
  padding-left: 20px;

  :deep(.ant-menu-item) {

    &:after {
      visibility: hidden;
      position: static;
      border: none;
      font-family: "iconfont" !important;
      font-size: 13px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      content: "\e663";
    }

    &:hover {
      @include after;
    }

    a {
      color: $text;
      font-size: $sidebar-menu-size;
    }
  }

  :deep(.ant-menu-item-selected) {
    @include after;
  }

  :deep(.ant-menu-horizontal) {
    border: none;
  }
}

</style>
<style lang="scss">
/*弹出层*/
.ant-popover-placement-self {
  position: fixed;
  top: 60px !important;


  .ant-popover-arrow {
    display: none;
  }
}
</style>