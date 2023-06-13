<template>
  <div class="empty">
    <a-empty :description="description" :imageStyle="{height:height}" :image="empty"/>
  </div>
</template>

<script setup>

import empty from '@/assets/image/empty.svg'

defineProps({
  description: {
    required: false,
    default: "暂无数据"
  },
  height: {
    required: false,
    default: false
  }
}); //属性
</script>

<style lang="scss" scoped>
.empty {
  @include flex-center;
  justify-content: center;
  width: 100%;
  height: 100%;

  :deep(.ant-empty) {
    .ant-empty-description {
      color: $sub_sub-text;
    }
  }
}
</style>