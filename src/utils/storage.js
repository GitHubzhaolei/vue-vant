/**
  * 本地存取token/用户等相关信息
  * @author 头脑风暴_赵雷
  * @since 2019年8月26日11:17:48
  */
const storage = {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (err) {
      return null
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (err) {
      return false
    }
  },
  del(key) {
    localStorage.removeItem(key)
  }
}

export default storage
