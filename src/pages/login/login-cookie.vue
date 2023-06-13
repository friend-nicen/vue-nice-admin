<template>
  <div class="login" @keydown.enter="login">
    <div class="left">
      <img :src="banner"/>
    </div>
    <div class="right">
      <div class="main">
        <div class="header">
          用户登录
        </div>
        <div class="form">
          <a-form layout="vertical">
            <a-form-item>
              <template #label>
                <i class="iconfont icon-yonghu"></i>用户名
              </template>
              <a-input v-model:value="username" autofocus placeholder="请输入用户名"/>
            </a-form-item>

            <a-form-item>
              <template #label>
                <i class="iconfont icon-mima-4-copy"></i>密码
              </template>
              <a-input-password v-model:value="password" placeholder="请输入密码"/>
            </a-form-item>

          </a-form>
        </div>
        <div class="footer">
          <a-button :loading="loading" type="primary" @click="login" block>{{ loading?"正在登陆..":"登录" }}</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="login">

import banner from "@/assets/login/banner.png"
import form from "./login";

let {
  username,
  password,
  login,
  loading
}=form();
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  * {
    box-sizing: border-box;
  }


  .left {
    max-width: 1156px;
    width: inherit;
    background-color: white;
    display: flex;

    img {
      flex-shrink: 0;
      max-width: 100%;
      height: 100%;
    }

  }

  .right {
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;

    .main {
      width: 520px;

      .header {
        font-size: 36px;
        font-weight: bold;
        margin-bottom: 36px;
      }

      :deep(.ant-form-item) {

        margin-bottom: 30px;

        .iconfont{
          font-size: 16px;
          margin-right: 8px;
          color: #296BEF;
        }

        .ant-form-item-label{
          padding-bottom: 20px;

          label{
            font-size: 16px;
            color: #313233;
          }
        }

        .ant-input,.ant-input-password{
          height: 60px;
          background-color: white;
          border-radius: 8px;
          padding: 4px 11px;
          font-size: 18px;

          .ant-input{
            height: unset;
            padding: 0;
            font-size: 18px;
          }

          &:hover,&:focus{
            border-color: #296BEF;
          }

          &::placeholder {
            font-size: 14px;
            color: #939599;
          }
        }

      }

      .footer {
        margin-top: 60px;

        :deep(.ant-btn-primary) {
          height: 60px;
          border-radius: 8px;
          background-color: #296BEF;
          font-size: 16px;
        }
      }
    }
  }


}
</style>