<template>
  <template v-if="config.auth.mode == 'token'">
    <login-token/>
  </template>
  <template v-else>
    <login-cookie/>
  </template>
</template>
<script setup name="login">
  import config from "@/config";
  import LoginToken from './login-token.vue'
  import LoginCookie from './login-cookie.vue'
</script>