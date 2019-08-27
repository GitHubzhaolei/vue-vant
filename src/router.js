import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import storage from './utils/storage'

Vue.use(Router)

const routes = [
  {
    path: '*',
    redirect: '/login'
  },
  {
    name: 'login',
    component: () => import('./view/login'),
    meta: {
      title: '登录'
    }
  },
  {
    name: 'user',
    component: () => import('./view/user'), // 单页面惰性加载
    meta: {
      title: '会员中心'
    }
  },
  {
    name: 'cart',
    component: () => import('./view/cart'),
    meta: {
      title: '购物车',
      requireAuth: true // 当有这个字段的时候,我们就认为这个路由页面是要有登录权限的
    }
  },
  {
    name: 'goods',
    component: () => import('./view/goods'),
    meta: {
      title: '商品详情'
    }
  }
]

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '')
})

/**
  * 路由安全卫士
  * @author 头脑风暴_赵雷
  * @since 2019年8月26日10:34:12
  */
const router = new Router({ routes })
router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  // 以防在路由跳转过程中,Vuex中的状态会丢失,所以再跳转前进行保存
  store.commit('SET_TOKEN', storage.get('Authorization'))
  if (to.meta.requireAuth) {
    // 不直接通过本地缓存进行判断,而是通过Vuex的属性状态进行判断
    if (store.state.user.token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})
export {
  router
}
