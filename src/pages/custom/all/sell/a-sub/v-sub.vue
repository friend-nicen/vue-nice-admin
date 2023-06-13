<template>

  <a-modal
      :visible="visible"
      :maskClosable="false"
      title="查看子账号分配状态"
      :width="800"
      @cancel="close"
      :footer="null"
      destroy-on-close
      class="Sub-account">
    <v-sub-list/>
  </a-modal>
</template>

<script setup>

//自定义事件
import VSubList from './v-sub-list.vue'
import mask from "@/common/mask";


//组件属性
const props = defineProps({
  visible: {
    required: false,
    default: false
  }
});

mask(props); //禁止滚动‘

const emit = defineEmits(['update:visible']); //自定义事件


//关闭弹窗
const close = () => {
  emit('update:visible', false)
};


</script>

<style lang="scss">
.Sub-account {
  .ant-modal-body {
    padding: 0;
  }
}
</style>
