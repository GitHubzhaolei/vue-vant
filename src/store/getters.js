const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  user: state => state.user,
  roles: state => state.user.roles
}
export default getters
