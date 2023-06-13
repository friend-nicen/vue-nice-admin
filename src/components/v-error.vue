<template>
  <div class="exception-page">
    <div class="img">
      <img :src="image"/>
    </div>
    <div class="content">
      <h1>{{ title }}</h1>
      <div class="desc">{{ desc }}</div>
      <div class="action">
        <a-button type="primary" @click="$router.back()">返回上一页</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['image','title','desc']);
</script>

<style lang="scss" scoped>
.exception-page {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  .img {
    padding-right: 52px;
    zoom: 1;

    img {
      max-width: 430px;
    }
  }
  .content {
    h1 {
      color: #434e59;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      margin-bottom: 24px;
    }
    .desc {
      color: rgba(0, 0, 0, .45);
      font-size: 20px;
      line-height: 28px;
      margin-bottom: 16px;
    }
  }
}
</style>
