<template>
  <a-dropdown trigger="click">
    <a class="ant-dropdown-link" @click.prevent>
      操作
      <v-icon icon="DownOutlined" size="8px"/>
    </a>
    <template #overlay v-if="$auth(['del_route','modify_route'],true)">
      <a-menu>
        <a-menu-item v-if="$auth(['modify_route'])">
          <a class="ant-dropdown-link" @click.prevent="modify()">
            修改信息
          </a>
        </a-menu-item>
        <a-menu-item v-if="$auth(['del_route'])">
          <a class="ant-dropdown-link" @click.prevent="del(props.id)">
            删除页面
          </a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup>
import init from "./v-op"

let props = defineProps(['source']);
let {modify, del} = init(props);
</script>

<style lang="scss" scoped>
.ant-dropdown-link {
  white-space: nowrap;
}
</style>