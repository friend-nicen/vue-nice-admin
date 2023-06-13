<template>
  <div class="card">
    <a-card title="参数设置" :bordered="false">

      <div class="pannel">
        <v-item title="客户来源" :type="1"/>
        <v-item title="合作平台" :type="2"/>
        <v-item title="合作类型" :type="3"/>
        <v-item title="支付方式" :type="4"/>
        <v-item title="客户评级" :type="5"/>
      </div>
    </a-card>
  </div>


</template>
<script setup>
import VItem from './v-item.vue'

</script>


<style lang="scss" scoped>

@include card;

.pannel {
  display: flex;
  gap: 15px;
  width: 100%;

}

</style>
