<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" alt="" @click="getPic">
        </div>
        <div class="form-item">
          <input v-model="smsCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getcode">
            {{totalSeconds === seconds ? '获取验证码' : seconds + 's 重新获取'}}
            </button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { getMsgCode, getPicCode, codeLogin } from '@/api/login'
export default {
  data () {
    return {
      picUrl: '',
      picCode: '',
      picKey: '',
      totalSeconds: 5,
      seconds: 5,
      timer: null,
      mobile: '',
      msgCode: '',
      smsCode: ''
    }
  },
  name: 'LoginPage',
  created () {
    this.getPic()
  },
  methods: {
    async getPic () {
      const res = await getPicCode()
      this.picUrl = res.data.base64
      this.picKey = res.data.key
    },

    async getcode () {
      if (!this.validFn()) { return }
      if (!this.timer && this.totalSeconds === this.seconds) {
        await getMsgCode(this.picCode, this.picKey, this.mobile)
        this.$toast('验证码已发送')
        this.timer = setInterval(() => {
          if (this.seconds > 0) {
            this.seconds--
          } else {
            clearInterval(this.timer)
            this.seconds = this.totalSeconds
          }
        }, 1000)
      }
    },

    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号码')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    async login () {
      const url = this.$route.query.backUrl || '/'

      if (!this.validFn()) { return }
      if (!/^\d{6}$/.test(this.smsCode)) {
        this.$toast('请输入正确的短信验证码')
      }
      const res = await codeLogin(this.mobile, this.smsCode)
      this.$store.commit('user/setUserInfo', res.data)
      this.$router.replace(url)
      this.$toast('登录成功')
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;

  }
}
</style>
