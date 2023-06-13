<template>
  <span class="operate">
      <a-space>
        <v-icon icon="PlusOutlined" size="13px" @click="add"/>
        <v-icon icon="EditOutlined" v-if="(userInfo.depart.id != node.key)" size="13px" @click="modify"/>
        <v-icon icon="DeleteOutlined" v-if="(userInfo.depart.id != node.key)" size="13px" @click="del"/>
      </a-space>
  </span>
</template>

<script setup>

import init from './v-op'
import user from "@/stores/user";

const props = defineProps(['node']);
const userInfo = user(); //用户信息


let {
  add,
  modify,
  del
} = init(props)
</script>