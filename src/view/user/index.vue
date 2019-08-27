<template>
  <div>
    <img
      class="user-poster"
      src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"
    >
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" />
        待付
      </van-col>
      <van-col span="6">
        <van-icon name="records" />
        待接单
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" />
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        已发货
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell
        icon="records"
        title="全部订单"
        is-link
      />
    </van-cell-group>

    <van-cell-group>
      <router-link to="/cart">
        <van-cell
          icon="points"
          title="我的购物车"
          is-link
        />
      </router-link>
      <router-link to="/login">
        <van-cell
          icon="gold-coin-o"
          title="退出并跳转到登录"
          is-link
          @click="logout"
        />
      </router-link>

      <router-link to="/goods">
        <van-cell
          icon="gift-o"
          title="我的物品界面"
          is-link
        />
      </router-link>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.replace({ path: '/user' })
      }).catch((error) => {
        // 错误提示消息,组件提示
        this.$toast({ message: error, duration: 1000 })
      })
    }
  }
}
</script>

<style lang="less">
.user {
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }

  &-group {
    margin-bottom: 15px;
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>
