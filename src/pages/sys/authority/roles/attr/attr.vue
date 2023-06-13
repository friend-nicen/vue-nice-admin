<template>
  <div class="userlist">

    <div class="operate">

      <div class="left">
        <a-space>

          <span class="info">
            <a-tag color="green">提示</a-tag>
           当前查看 {{
              !role ? `` : `【${(role && role.title) ? role.title : userInfo.role.name}】，`
            }}
           {{ !watchSelfRole ? "点击右侧查看指定角色可访问的页面" : "您无法操作自己角色的可访问权限，只能进行查看" }}
          </span>
        </a-space>
      </div>


      <div class="right">
        <a-space>
          <a-button :disabled="(!role?true:false)" type="primary" @click="visible=true"
                    v-if="$auth(['access_route_add']) && !watchSelfRole">
            页面设置
          </a-button>
          <a-button v-if="$auth(['role_permiss_list','modify_role_permiss'])"
                    :disabled="(!role?true:false)"
                    type="primary"
                    @click="visible_permiss=true">
            权限设置
          </a-button>
          <a-button type="primary" @click="delBatch.op"
                    v-if="$auth(['access_route_del']) && !watchSelfRole">
            批量删除
          </a-button>

          <v-pop/>
        </a-space>
      </div>

    </div>
    <template v-if="role">
      <!-- 员工列表 -->
      <v-table :init="face.list" :rowSelection="true" :sticky="{offsetHeader: 0}">
        <template #bodyCell="{ column, record }">
          <template v-if="column.title === '操作'">
            <v-op v-if="!watchSelfRole" :source="{ column, record }"/> <!--操作-->
            <a v-else>无权限</a>
          </template>
          <template v-else-if="column.dataIndex === 'icon'">
            <v-icon v-if="record.icon" :icon="record.icon"></v-icon>
          </template>
          <template v-else-if="column.title === 'ID'">
            {{ (record.id) }}
          </template>
        </template>
      </v-table>
    </template>

    <template v-else>
      <v-empty description="暂未选择角色"/>
    </template>
  </div>

  <v-tree v-model:visible="visible" :checked="checked"/>
  <v-permiss v-model:visible="visible_permiss"/>

</template>

<script setup>
import init from './attr'

import VOp from "./v-op.vue";
import {delBatch} from './v-op.js'
import VTree from "./v-tree.vue";
import VPermiss from "./v-permiss.vue";


let {
  face,
  role,
  userInfo,
  visible,
  checked,
  visible_permiss,
  watchSelfRole
} = init();


</script>

<style lang="scss" scoped>
.userlist {
  width: calc(99% - 270px);
  height: 100%;
  padding-left: 1%;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  @include scroll-bar(10px);

  .operate {
    @include flex-center;
    justify-content: space-between;
    margin-bottom: 15px;


    .left {
      .info {
        font-size: $font-size-md;
      }
    }

    .right {


    }
  }
}
</style>