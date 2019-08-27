<template>
  <div class="login">
    <form @submit.prevent="handleLogin">
      <img
        class="login-poster"
        src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"
      >
      <van-cell-group class="login-info">
        <van-field
          v-model.trim="user.userCode"
          required
          clearable
          label="用户名"
          placeholder="请输入用户名"
        />

        <van-field
          v-model.trim="user.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          right-icon="question-o"
          required
          clearable
          autocomplete
          @click-right-icon="$toast('忘记密码')"
        />
      </van-cell-group>
      <van-button
        type="primary"
        size="large"
      >
        登录
      </van-button>
    </form>
  </div>
</template>

<script>
import storage from '@/utils/storage'
export default {
  data() {
    return {
      user: { userCode: '', password: '' }
    }
  },
  created() {
    if (storage.get('UserInfo')) {
      this.user = storage.get('UserInfo')
    }
  },
  methods: {
    // 登录功能
    handleLogin() {
      if (this.user.userCode === '') {
        this.$toast({ message: '请您输入用户名', duration: 1000 })
        return false
      }
      if (this.user.password === '') {
        this.$toast({ message: '请您输入密码', duration: 1000 })
        return false
      }
      this.$store.dispatch('Login', this.user).then(() => {
        // 判断路由是否代餐,带参就去到重定向参数地址,否则就去首页
        if (this.$router.query.redirect) {
          this.$router.replace({ path: this.$router.query.redirect }) // 阻止返回上一页直接到了首页
        } else {
          this.$router.replace({ path: '/user' })
        }
      }).catch((error) => {
        // 错误提示消息,组件提示
        this.$toast({ message: error, duration: 1000 })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background-color: #fff;
    &-poster {
      width: 100%;
      height: 53vw;
      display: block;
    }
    &-info {
      margin-top: 15vw;
    }
    &-btn {
      margin-top: 10vw;
      width: 90%;
      margin-left: 5%;
    }
    .van-button--primary {
        color: #fff;
        background-color: #FF595F;
        border-color: #FF595F;
    }
    .van-button--large {
      width: 90%;
      margin-top: 10vw;
      margin-left: 5%;
      height: 5%;
      line-height: 245%;
    }
}

</style>
