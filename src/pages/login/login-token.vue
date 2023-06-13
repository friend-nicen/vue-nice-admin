<template>
  <div class="main" @keydown.enter="login">
    <div class="login">
      <div class="header">
        <div class="logo">
          <img :src="config.logo"/>
          <span>{{ mode == 1 ? '用户登录' : '商家登录' }}</span>
        </div>
        <!--<div>
              <a-button @click="mode=!mode" type="link">{{ mode == 1 ? '商家登录' : '用户登录' }}</a-button>
            </div>-->
      </div>
      <div class="form">
        <a-form layout="vertical">
          <a-form-item :rules="[{ required: true}]" label="手机号">
            <a-input v-model:value="username" autofocus placeholder="请输入手机号"/>
          </a-form-item>

          <a-form-item :rules="[{ required: true}]" label="密码">
            <a-input-password v-model:value="password" placeholder="请输入密码"/>
          </a-form-item>

        </a-form>
      </div>
      <div class="footer">
        <a-button :loading="loading" block type="primary" @click="login">{{
            loading ? "正在登陆.." : "登录"
          }}
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import initialize from "./login";
import config from "@/config";

let {
  username,
  password,
  login,
  loading,
  mode
} = initialize();
</script>

<style lang="scss" scoped>
.main {
  @include flex-center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-image: url("@/assets/image/background.svg");


  .login {

    background-color: white;
    width: 30rem;
    padding: 3.2rem 2.6rem;

    box-shadow: $shadow-2;

    .header {
      @include flex-center;
      justify-content: space-between;
      margin-bottom: 1.88rem;

      .logo {
        @include flex-center;
        margin-left: -15px;
        align-items: center;
      }

      img {
        width: 2.8125rem;
      }

      span {
        margin-left: 0.788rem;
        font-size: 1.406rem;
        font-weight: bold;
      }
    }

    :deep(.ant-form-item) {

      margin-bottom: 1.5788rem;

      .iconfont {
        font-size: 0.832rem;
        margin-right: 0.5rem;
        color: $primary-color;
      }

      .ant-form-item-label {
        padding-bottom: 1rem;

        label {
          font-size: 0.832rem;
          color: #313233;
        }
      }

      .ant-input, .ant-input-password {
        height: 3.1rem;
        background-color: white;
        border-radius: 3px;
        padding: 4px 0.572rem;
        font-size: 0.937rem !important;

        .ant-input {
          height: unset;
          padding: 0;
          font-size: 0.937rem !important;
        }

        &:hover, &:focus {
          border-color: $primary-color;
        }

        &::placeholder {
          font-size: 0.832rem !important;
          color: #939599;
        }
      }

    }

    .footer {
      margin-top: 3.125rem;

      :deep(.ant-btn-primary) {
        height: 3.125rem;
        border-radius: 0.416rem;
        background-color: $primary-color;;
        font-size: 0.832rem;
      }
    }

  }
}
</style>