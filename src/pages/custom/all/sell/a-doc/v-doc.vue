<template>

  <a-modal
      :visible="visible"
      :maskClosable="false"
      title="查看客户关联的文档"
      :width="800"
      @cancel="close"
      :footer="null"
      destroy-on-close
      class="assoc-doc">
    <v-doc-list/>
  </a-modal>
</template>

<script setup>

//自定义事件
import VDocList from './v-doc-list.vue'
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
.assoc-doc {
  .ant-modal-body {
    padding: 0;
  }
}
</style>
