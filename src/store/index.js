import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user
  },
  getters
})
/* // 监听每次调用mutations的时候,都会进入到这个方法,然后做一些处理,比如vuex中的状态信息持久化
store.subscribe((mutations, state) => {
}) */
export default store
