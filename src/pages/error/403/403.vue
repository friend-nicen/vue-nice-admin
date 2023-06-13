<template>
  <v-error :image="e403" title="403" desc="抱歉，你无权访问该页面" />
</template>
<script setup name="403">
import e403 from '@/assets/error/403.svg'
</script>