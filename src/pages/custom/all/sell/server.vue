<template>

  <a-modal
      :visible="visible"
      :maskClosable="false"
      title="查看当前客户关联的客服"
      :width="800"

      @cancel="close"
      :footer="null"
      class="picker-servers">


    <div class="container">

      <template v-if="loaded">

        <div v-if="servers.length > 0">
          <ul class="server-list">

            <template v-for="(item,index) of servers" :key="index">


              <li class="item">
                <div class="avatar">
                  <img :src="api.avatar+item.nickname"/>
                </div>
                <div class="info">
                    <span class="nickname">
                         <a-tooltip placement="topLeft">
                          <template #title>
                              {{ item.nickname }}-{{ item.role }}-{{ item.depart }}）
                          </template>
                          {{ item.nickname }}（ {{ item.depart }}）
                        </a-tooltip>
                    </span>
                  <span class="datetime">
                      {{ item.datetime }}
                    </span>
                </div>
              </li>

            </template>

          </ul>
        </div>

        <v-empty v-else description="暂无数据"/>

      </template>
      <template v-else>
        <a-spin :spinning="!loaded">
          <div class="spin"></div>
        </a-spin>
      </template>
    </div>

  </a-modal>
</template>

<script setup>

//自定义事件
import {inject, ref, watch} from "vue";
import load from "@/common/load";
import axios from "axios";
import api from "@/service/api";
import mask from "@/common/mask";

const emit = defineEmits(['update:visible']); //自定义事件
const loaded = ref(false); //页面加载状态
const servers = ref([]); //角色的权限集
const select_shop = inject("select_shop"); //被选的客户

//组件属性
const props = defineProps({
  visible: {
    required: false,
    default: false
  }
});

mask(props); //禁止滚动

//关闭弹窗
const close = () => {
  emit('update:visible', false)
};


/*
* 初始化当前角色的数据
* */
const init = () => {

  /* 显示加载效果 */
  load.loading("加载中...");
  loaded.value = false;

  try {
    /* 开始请求 */
    axios.post(api.custom.all.sell.servers + `?shop=${select_shop.value}`)
        .then((res) => {
          /*
          * 判断请求结果
          * */
          if (res.data.code) {

            servers.value = res.data.data;

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
      loaded.value = true;
    });
  } catch (e) {
    console.log(e)
    load.error(e);
  }
}


/*
* 显示已选项
* */
watch(() => props.visible, () => {
  if (props.visible) {
    servers.value = []; //重置数据
    init(); //初始化数据
  }
})


</script>

<style lang="scss">
.picker-servers {
  .ant-modal-body {
    padding: 0;
  }
}
</style>

<style scoped lang="scss">

.container {

  height: 50vh;
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  overflow: hidden;
  overflow-y: auto;
  @include scroll-bar();


  .server-list {

    width: 100%;
    list-style: none;
    @include flex-center;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0;
    margin: 0;

    li {
      @include flex-center;
      width: 33.3%;
      margin-bottom: 20px;
      padding: 0 10px;

      .avatar {
        width: 25%;
        overflow: hidden;
        border-radius: 50%;

        img {
          width: 100%;
          border-radius: 50%;
          padding: 5%;
        }

      }

      .info {
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: hidden;
        margin-left: 6px;

        *, & {
          font-size: $font-size-xl;
          color: $text;
          white-space: nowrap;
        }

        .nickname {
          display: inline-block;
          width: 100%;
          font-size: $font-size-m;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .datetime {
          font-size: $font-size-sm;
          margin-top: 5px;
          color: $sub-text;
        }
      }


    }

  }
}

.spin {
  @include flex-center;
  height: 50vh;
  width: 100%;
}
</style>