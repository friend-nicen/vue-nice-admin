<template>

  <a-modal
      :visible="visible"
      :maskClosable="false"
      :title="title"
      :width="width"
      class="form_modal"
      destroy-on-close
      @cancel="close"
      :centered="centered"
      @ok="modify">


    <template #footer>

      <template v-if="!footer"></template>
      <template v-else>
        <div class="footer">
          <span class="info">
              <slot name="info"></slot>
          </span>
          <a-space>
            <a-button @click="close">取消</a-button>
            <a-button type="primary" @click="modify">确定</a-button>
          </a-space>
        </div>
      </template>


    </template>

    <div class="container" :class="add_class" @scroll="e=>{e.stopPropagation()}">
      <v-batch
          :check="check"
          ref="formDom"
          :offset="false"
          :label-span="labelSpan"
          :data="dataSource.data"
          :union="union"
          :form="form"
          :showBorder="showBorder"
          :layout="layout"
          :grid="grid"
          :name="name"
          label="fixed"/>

      <slot name="extra"/>
    </div>

  </a-modal>

</template>

<script setup>
/*
* visible弹出的
* */
import load from "@/common/load";
import axios from "axios";
import {inject, ref} from "vue";
import {switchForm} from "@/common";
import mask from '@/common/mask'


const props = defineProps(
    {
      "name": {
        required: false,
        default: "form"
      },
      "title": {
        required: true
      }, //居中
      "add_class": {
        required: false
      }, //样式
      "centered": {
        required: false,
        default: false
      },
      layout: {
        required: false,
        default: "horizontal"
      },
      grid: {
        required: false,
        default: {xxl: 24, xl: 24, lg: 24, md: 24, sm: 24, xs: 24}
      },
      footer: {
        default: true,
        required: false
      },
      "message": {
        required: false,
        default: "操作成功！"
      }, //标题
      "init": {
        required: false
      }, //接口
      "visible": {
        required: true
      }, //显示
      "form": {
        required: true
      }, //表单配置
      "dataSource": {
        required: true
      }, //数据源
      "showBorder": {
        default: true
      },
      "union": {
        default: false
      },
      /*
      * 提交后的回调
      * */
      "after": {
        required: false,
        default: null
      },
      /*
      * 提交前的回调
      * */
      "before": {
        required: false,
        default: null
      },
      check: {
        required: false,
        default: null
      },
      /*
      * 自定义表单提交
      * */
      "submit": {
        required: false,
        default: null
      },
      "width": {
        required: false,
        default: "520px"
      },
      "labelSpan": {
        required: false,
        default: false
      }
    });

mask(props); //初始化滚动屏蔽

//自定义事件
const emit = defineEmits(['update:visible']); //自定义事件
//关闭弹窗
const close = () => {
  emit('update:visible', false)
};


const table = inject("table"); //注入表格对象
const formDom = ref(null); //表单dom

/*
* 添加用户
* */
const modify = async () => {

  /* 没有接口直接终止 */
  if (!props.init) return;

  /*触发前的回调*/
  if (props.before) {
    if (!await props.before()) {
      return false;
    } //触发钩子
  }

  /*
  * 表单验证
  * */
  formDom.value.$refs.formDom.validate().then(async () => {

    /*
    * 自定义上传
    * */
    if (props.submit) {
      if (await props.submit(switchForm(props.dataSource.data))) {
        close(); //关闭弹窗
        table.loadData(); //重新加载表格数据
      }
      return;
    }


    /* 显示加载效果 */
    load.loading("请求中...");

    /* 开始请求 */
    axios.post(props.init, switchForm(props.dataSource.data))
        .then((res) => {
          /*
          * 判断请求结果
          * */
          if (res.data.code) {
            load.success(props.message + '！');

            close(); //关闭弹窗

            table.loadData(); //重新加载表格数据


            /*提交后的回调*/
            if (props.after) {
              props.after(); //触发钩子
            }


          } else {
            /* 弹出错误原因 */
            load.error(res.data.errMsg);
          }
        }).catch((e) => {
      /* 弹出错误原因 */
      load.error(e.message);
    }).finally(() => {
      /* 关闭加载效果 */
      load.loaded();
    });

  }).catch((e) => {
    console.log(e);
    load.error("请按照要求填写数据！")
    return
  })

}

</script>

<style lang="scss">
.form_modal {
  .ant-modal-body {
    padding: 0;

    .ant-tree .ant-tree-treenode {
      padding: 0 0 6px 0;
      gap: 6px;
    }
  }
}
</style>

<style scoped lang="scss">

.container {
  max-height: 65vh;
  box-sizing: border-box;
  width: 100%;
  padding: 20px 20px 20px 25px;
  overflow: hidden;
  overflow-y: auto;
  @include scroll-bar();
}

.footer {
  @include flex-center;
  justify-content: space-between;

  .info {
    font-size: $font-size-sm;
  }
}

</style>
