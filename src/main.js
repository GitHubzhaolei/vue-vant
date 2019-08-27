import Vue from 'vue'
import App from './App'
import { router } from './router'
import Router from 'vue-router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

/**
  * 目前作用不明
  * @author 头脑风暴_赵雷
  * @since 2019年8月26日10:34:50
 */
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
