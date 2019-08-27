import request from '@/utils/request'

// 登录调用权限接口
export function getUserInfo(data) {
  return request({
    url: '/auth-web/access/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
