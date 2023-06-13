<template>
  <a-dropdown trigger="click">
    <a class="ant-dropdown-link" @click.prevent>
      操作
      <v-icon icon="DownOutlined" size="8px"/>
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a class="ant-dropdown-link" @click.prevent="modify()">
            修改信息
          </a>
        </a-menu-item>
        <a-menu-item>
          <a class="ant-dropdown-link" @click.prevent="modify_pass()">
            修改密码
          </a>
        </a-menu-item>
        <a-menu-item>
          <a class="ant-dropdown-link" @click.prevent="del()">
            删除用户
          </a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup>
import init from "./v-op"

let props = defineProps(['source']);
let {modify, del, modify_pass} = init(props);
</script>

<style lang="scss" scoped>
.ant-dropdown-link {
  white-space: nowrap;
}
</style>