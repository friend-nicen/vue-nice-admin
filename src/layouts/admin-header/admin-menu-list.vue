<template>
  <div class="menu-list">
    <!-- 循环所有子路由 -->
    <template v-for="(item,index) of children" :key="index">

      <!-- 如果有子路由 -->
      <template v-if="item.children">
        <ul class="list-item">

          <!-- 大字显示当前路由 -->
          <li>
            <v-icon :icon="item.meta.icon" size="14px"/>
            <span class="first">{{ item.meta.name }}</span>
          </li>

          <!-- 循环所有子路由 -->
          <template v-for="(route,i) of item.children" :key="i">

            <!-- 如果是被访问的路由，着色 -->
            <li :class="{selected:$route.path == route.path}">
              <router-link :to="route.path">{{ route.meta.name }}</router-link>
            </li>

          </template>
        </ul>
      </template>

      <!-- 如果没有子路由，直接显示 -->
      <template v-else>

        <!-- 显示-->
        <ul class="list-item">
            <li :class="{selected:$route.path == item.path}">
              <router-link :to="item.path">{{ item.meta.name }}</router-link>
            </li>
        </ul>

      </template>

    </template>

  </div>
</template>

<script setup>
defineProps(['children'])
</script>

<style scoped lang="scss">

  .menu-list{
    display: flex;

    padding: 10px 15px;

    .list-item{

      display: flex;
      flex-direction: column;

      list-style: none;
      margin: 0 12px 0 12px;
      padding: 0;


      li{
        display: inline;
        padding: 6px 0;

        a{
          color: $text;
          font-size: $sidebar-menu-size;
        }

        &:hover{
          a{
            color: $primary-color;
          }
        }
      }

      .first{
        font-weight: bold;
        color: $black;
        margin-left: 10px;
      }

      .selected{
        a{
          color: $primary-color;
        }
      }

    }

  }
</style>