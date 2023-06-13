<template>
  <v-error :image="e404" title="404" desc="抱歉，你访问的页面不存在或仍在开发中"/>
</template>
<script setup name="404">
import e404 from '@/assets/error/404.svg'
</script>