<template>

  <a-modal
      :visible="visible"
      :maskClosable="false"
      title="图标选择"
      :width="width"
      class="picker-icon"
      @cancel="close">

    <template #footer>

    </template>

    <div class="container">
      <ul class="icon-list">
        <template v-for="(item,index) of icons" :key="index">
          <li class="icon" :class="{active:item == icon}" @click="select(item)">
            <v-icon :icon="item" size="30px"/>
          </li>
        </template>
      </ul>
    </div>
  </a-modal>

  <div class="icon-picker">
    <v-icon :icon="icon" size="25px"/>
    <a-input :required="required" :placeholder="placeholder" :allowClear="allowClear" v-model:value="icon" readOnly/>
    <a-button type="primary" @click="visible=true">选择</a-button>
  </div>

</template>

<script setup>

/* 属性 */
import {ref, watch} from "vue";
import * as $icon from '@ant-design/icons-vue';



const ignore = ['create', 'getTwoToneColor', 'setTwoToneColor', 'default', 'createFromIconfontCN'];

/* 内置图标库 */
const icons = Object.keys($icon).filter(item => {
  return typeof item == 'string' && ignore.indexOf(item) == -1;
});



/* 属性 */
const props = defineProps(
    {
      value: {
        required: true
      },
      width: {
        required: false,
        default: 800
      },
      required: {
        required: false,
        default: true
      },
      placeholder: {
        required: false,
        default: "请选择图标代码"
      },
      allowClear: {
        required: false,
        default: true
      }
    });

/* 被选icon */
const icon = ref(props.value);
const visible = ref(false);

/* 监视属性 */
watch(() => props.value, () => {
      icon.value = props.value;
    },
    {
      deep: true
    });

//自定义事件
const emit = defineEmits(['update:value']); //自定义事件
//关闭弹窗
const close = () => {
  visible.value = false;
};

/*
* 确定提交
*
* */
const select = (icon) => {
  emit("update:value", icon)
  close(); //关闭窗口
}

</script>

<style lang="scss">
.picker-icon {
  .ant-modal-body {
    padding: 0;
  }
}
</style>

<style scoped lang="scss">

.container {

  max-height: 65vh;
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  overflow: hidden;
  overflow-y: auto;
  @include scroll-bar();

  .icon-list {
    display: flex;
    flex-wrap: wrap;

    list-style: none;

    padding: 0;
    margin: 0;

    &, * {
      box-sizing: border-box;
    }

    .icon {
      width: 10%;
      padding: 15px;
      cursor: pointer;
      @include flex-center;
      flex-direction: column;
      border-radius: 12px;

      span {
        font-size: $font-size-xl;
        color: $sub-text;
      }

      &:hover {
        background-color: $hover;
      }
    }

    .active {
      background-color: rgba($primary, 0.45);
    }
  }
}

.icon-picker {
  display: flex;
  gap: 15px;
  width: 100%;
  align-items: center;
}

</style>
