<template>

  <a class="ant-dropdown-link" @click.prevent="del()" v-if="$auth(['access_route_del'])">
    删除
  </a>
  <a v-else>
    无
  </a>

</template>

<script setup>
import init from "./v-op"

let props = defineProps(['source']);

let {del} = init(props);
</script>

<style lang="scss" scoped>
.ant-dropdown-link {
  white-space: nowrap;
}
</style>