<template>

  <a-card :bordered="false" class="card" title="运行配置">

    <template v-if="loaded">
      <div style="padding: 0 30px;margin-top: 20px;">
        <v-batch :data="data.data" :grid="grid" :offset="false" layout="vertical" :form="filter" :showBorder="false"/>
      </div>

      <div class="submit">
        <a-button type="primary" @click="submit">保存修改</a-button>
      </div>
    </template>


  </a-card>

</template>

<script setup>
import init from "./param"


const {
  submit,
  grid,
  filter,
  data,
  loaded
} = init();

</script>

<style lang="scss" scoped>
@include card;

.card {
  :deep(.ant-form-item) {
    padding: 0 16px 8px;
  }

  .submit {

    @include flex-center;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
  }
}
</style>