<template>
  <div class="userlist">

    <div class="operate">

      <div class="left">
        <a-space>

          <span class="info">
            <a-tag color="green">提示</a-tag>
           当前查看 {{
              !department ? `` : `【${(department && department.title) ? department.title : userInfo.depart.name}】，`
            }}
           {{ !watchSelfDepart ? "点击右侧查看指定部门的用户" : "您无法操作修改自己和自己部门的信息，只能进行查看" }}
          </span>
        </a-space>
      </div>


      <div class="right">
        <a-space>
          <a-button type="primary" @click="visible_add=true">
            添加员工
          </a-button>

          <v-pop/>
        </a-space>
      </div>

    </div>

    <a-divider style="margin: 12px 0 20px;"/>


    <template v-if="department">


      <!-- 输出筛选条件 -->
      <div style="margin-bottom: 5px;">
        <v-batch layout="horizontal" :grid="{  xxl: 6, xl: 8, lg: 12,md: 12, sm: 12,xs: 24}" label="fixed"
                 :form="filter" :data="table.condition.data"/>
      </div>


      <!-- 员工列表 -->
      <v-table :init="face.list" :sticky="{offsetHeader: 0}">
        <template #bodyCell="{ column, record }">
          <template v-if="column.title === '操作'">
            <v-op :name="['mod','password']" :source="{ column, record }"/> <!--操作-->
          </template>
          <template v-else-if="column.title === '账号状态'">
            <v-status :status="record.status"/>
          </template>
          <template v-else-if="column.title === '权限'">

            <template v-if="record.role == 2">
              <a-tag color="red">管理</a-tag>
            </template>

            <template v-else>
              <a-tag color="pink">员工</a-tag>
            </template>

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

    <!--用户信息修改-->
    <v-form
        v-model:visible="visible_mod"
        :dataSource="need_mod"
        :form="form_mod"
        :init="face.modify"
        message="修改成功"
        :after="depart_init.init"
        name="user_mod" title="修改用户信息"/>

    <!--登录密码修改-->
    <v-form
        v-model:visible="visible_password"
        :dataSource="need_password"
        :form="form_password"
        :init="face.password"
        message="修改成功"
        name="user_password_mod"
        title="修改登录密码"/>

    <v-form
        v-model:visible="visible_add"
        :dataSource="need_add"
        :form="form_add"
        :init="face.add"
        message="添加成功！"
        :after="depart_init.init"
        name="user_add"
        title="用户添加">
    </v-form>


  </div>

</template>

<script setup>
import init from './staff'
import initEdit from './edit'
import VOp from "./v-op.vue";


let {
  face,
  table,
  department,
  userInfo,
  watchSelfDepart,
  depart_init
} = init();


let {
  visible_add,
  visible_mod,
  visible_password,
  form_password,
  need_password,
  form_add,
  need_add,
  form_mod,
  need_mod,
  filter
} = initEdit(); //初始化编辑表单


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


    .left {

    }

    .right {


    }
  }
}
</style>