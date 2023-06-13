<template>
  <div class="admin-message">
    <a-popover overlayClassName="ant-popover-placement-self ant-popover-message" placement="top" trigger="click">
      <template #content>
        <div class="message">

          <a-tabs v-model:activeKey="tab" centered>
            <a-tab-pane key="1">
              <template #tab>
                <a-badge dot>
                  通知
                </a-badge>
              </template>
            </a-tab-pane>
            <a-tab-pane key="2">
              <template #tab>
                <a-badge dot>
                  消息
                </a-badge>
              </template>
            </a-tab-pane>
            <a-tab-pane key="3">
              <template #tab>
                <a-badge dot>
                  待办
                </a-badge>
              </template>
            </a-tab-pane>
          </a-tabs>

          <ul class="content">
            <li class="message-item">
              <div class="left">
                <img :src="notice" title="消息"/>
              </div>
              <div class="right">
                <div class="top">
                  您有一条新客资导入
                </div>
                <div class="bottom">
                  2023-03-25 12:66:45
                </div>
              </div>
            </li>
          </ul>
        </div>
      </template>

      <a-badge dot>
        <v-icon style="cursor: pointer;" icon="BellOutlined" size="16px"/>
      </a-badge>

    </a-popover>
  </div>
</template>

<script setup>

import {ref} from 'vue';
import notice from "@/assets/image/notice.svg"

const tab = ref("1"); //激活的tab

</script>


<style lang="scss">
.ant-popover-message {
  width: 270px;

  .ant-popover-inner-content {
    padding-top: 0;
  }

  .message {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 33vh;

    .ant-tabs-nav-list {
      width: 100%;

      .ant-tabs-tab {
        width: 100%;
        justify-content: center;
        padding: 10px 0;
      }
    }


    .content {
      list-style: none;
      padding: 0;
      margin: 0;
      width: 100%;

      .message-item {
        @include flex-center;
        justify-content: flex-start;

        .left {
          width: 15%;
          overflow: hidden;
          border-radius: 50%;


          img {
            width: 100%;
            padding: 5%;
          }

        }

        .right {
          margin-left: 12px;

          .top {
            font-size: $font-size-md;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .bottom {
            font-size: $font-size-md;
            color: $sub-sub-text;
          }
        }

      }
    }


  }
}
</style>

<style scoped lang="scss">
.admin-message {
  @include flex-center;
  justify-content: center;

  width: 30px;
  height: 30px;

  margin-right: 25px;
  padding: 5px;
  border-radius: 50%;

  color: $sub-text;

  border: 1px solid $border;


}
</style>