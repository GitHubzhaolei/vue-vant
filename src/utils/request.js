import axios from 'axios'
import { getToken, setCookie } from '@/utils/cookie'
import store from '@/store'
import { router } from '@/router'
import storage from '@/utils/storage'
import { Toast } from 'vant'

const catchQueue = {}

const service = axios.create({
  withCredentials: true, // 跨域请求中,允许传送cookie信息
  timeout: 15000 // 请求时长限制
})

/**
 * 在service外重新包装一层，缓存用户传参，用于401以后的补发请求
 * @param {*} params 用户传入的参数
 */
const request = params => {
  // 赋值请求的URL地址
  catchQueue[params.url] = params
  return service(params)
}

/**
  * request拦截器
  * @author 头脑风暴_赵雷
  * @since 2019年8月26日18:26:29
  */
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.Authorization = getToken()
  }
  return config
}, error => { Promise.reject(error) })

/**
  * response拦截器
  * @author 头脑风暴_赵雷
  * @since 2019年8月26日18:33:53
  */
service.interceptors.response.use(response => {
  // response中的config赋值
  const { config: { url }} = response
  // 删除请求的URL地址
  delete catchQueue[url]
  const res = response.data
  // 临时添加 后台报错提示
  if (res) {
    if (res.code === '1111' && res.message) {
      Toast.fail({
        message: res.message,
        icon: 'https://img.yzcdn.cn/vant/logo.png'
      })
    }
    return res
  }
  return Promise.reject('error')
}, async error => {
  const { status, config: { url }} = error.response
  switch (status) { // 其他情况补充处理
    case 500:
      delete catchQueue[url]
      Toast.fail({
        message: '后台服务报错，操作失败',
        icon: 'https://img.yzcdn.cn/vant/logo.png'
      })
      break
    case 400:
      delete catchQueue[url]
      Toast.fail({
        message: '当前请求出现错误',
        icon: 'https://img.yzcdn.cn/vant/logo.png'
      })
      break
    case 401:
      router.push('login')
      break
    case 403:
      delete catchQueue[url]
      Toast.fail({
        message: '请求的资源不允许访问',
        icon: 'https://img.yzcdn.cn/vant/logo.png'
      })
      logout()
      break
    case 404:
      delete catchQueue[url]
      Toast.fail({
        message: '请求的内容不存在',
        icon: 'https://img.yzcdn.cn/vant/logo.png'
      })
      break
  }
}
)

function logout() {
  storage.del('token')
  setCookie('token', '', -1)
}

export default request
