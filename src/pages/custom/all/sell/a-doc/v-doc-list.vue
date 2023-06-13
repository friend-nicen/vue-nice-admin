<template>

  <div class="container">
    <!-- 输出筛选条件 -->
    <div class="operation">
      <v-batch layout="horizontal" label="fixed" :form="form" :data="table.condition.data"/>
      <a-button v-if="$auth('upload_shop_doc')"  type="primary" @click="showUpload">上传新文档</a-button>
    </div>

    <v-table :sticky="{offsetHeader: 0}" :init="list_api">
      <template #bodyCell="{ record,column }">
        <template v-if="column.title === '操作'">
          <a-space>

            <a style="white-space: nowrap;" @click="openLink(record.id)">预览</a>

            <a v-if="$auth('del_shop_doc')" style="white-space: nowrap;"
               @click.prevent="del_file(record.id)">删除</a>


          </a-space>

        </template>
      </template>
    </v-table>

  </div>


  <!--分配给客服-->
  <v-form
      v-model:visible="visible_upload"
      :dataSource="need_upload"
      :form="form_upload"
      :init="submit_api"
      :submit="submit"
      message="上传成功！"
      :union="true"
      :showBorder="false"
      name="doc_upload"
      title="文档上传">

    <template #extra>
      <a-row>
        <a-col :span="5"><span style="color: red">*</span>上传文档</a-col>
        <a-col :span="19">
          <v-upload accept=".doc,.xls,.xlsx,.docx" v-if="visible_upload" v-model:files="files" :size="3072"/>
        </a-col>
      </a-row>
    </template>

  </v-form>


</template>

<script setup>

//自定义事件
import api from "@/service/api";
import initUpload from './upload'

const list_api = api.custom.all.sell.doc_list;


let {
  form_upload,
  need_upload,
  visible_upload,
  submit_api,
  showUpload,
  files,
  submit,
  del_file,
  openLink,
  form,
  table
} = initUpload();


</script>


<style scoped lang="scss">

.container {

  height: 60vh;
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px 20px 20px;
  overflow: hidden;
  overflow-y: auto;
  @include scroll-bar();

  .operation {
    @include flex-center;
    justify-content: space-between;
    width: 100%;
    margin: 20px 0;
  }

  :deep(.ant-form) {
    width: 45%;

    .ant-form-item {
      margin-bottom: 0 !important;
    }
  }

}


</style>