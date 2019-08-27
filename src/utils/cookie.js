/**
  * cookie中存取token/用户等相关信息
  * @author 头脑风暴_赵雷
  * @since 2019年8月26日11:17:48
  */
function setCookie(name, value) {
  var Days = 30
  var exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 30)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
}

function getCookie(name) {
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  var arr = document.cookie.match(reg)

  if (arr) { return unescape(arr[2]) } else { return null }
}

function getToken() {
  return getCookie('Authorization')
}

export { setCookie, getCookie, getToken }
