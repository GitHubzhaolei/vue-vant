import storage from '@/utils/storage'
import { setCookie } from '@/utils/cookie'
import { getUserInfo, logout } from '@/api/user.js'

const user = {
  state: {
    token: storage.get('Authorization'),
    user: {},
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      storage.set('Authorization', token)
      // cookie里面存储token,以防过后刷新把localstorage信息丢失
      setCookie('Authorization', token)
    },
    SET_USER_INFO: (state, user) => {
      state.user = user
      storage.set('UserInfo', user)
    },
    SET_ROLE(state, obj) {
      state.roleMenu = obj
    }
  },

  actions: {
    // 登录判断
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        getUserInfo(userInfo).then(response => {
          if (response.code === '0000' && response.data) {
            commit('SET_TOKEN', response.data.token)
            commit('SET_USER_INFO', response.data)
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 正常退出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
    /* // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
 */
    /*
    // token错误退出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        auth.clearToken()
        resolve()
      })
    } */

  }
}

export default user
