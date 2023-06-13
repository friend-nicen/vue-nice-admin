<template>
  <span class="operate">
      <a-space style="justify-content: flex-start">

        <v-icon icon="PlusOutlined" size="13px" @click="add" v-if="$auth(['add_role'])"/>

        <v-icon icon="EditOutlined" size="13px" v-if="(userInfo.role.id != node.key) && $auth(['modify_role'])"
                @click="modify"/>

        <v-icon icon="DeleteOutlined" size="13px" v-if="(userInfo.role.id != node.key) && $auth(['del_role'])"
                @click="del"/>
      </a-space>
  </span>
</template>

<script setup>

import init from './v-op'
import user from '@/stores/user'

const props = defineProps(['node']);
const userInfo = user(); //用户信息

const {
  add,
  modify,
  del
} = init(props);

</script>