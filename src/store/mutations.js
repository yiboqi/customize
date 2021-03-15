export default {
  login (state, data) {
    state.username = data.username
    state.password = data.password
  },
  menus (state,data) {
    state.menus = data
  }
}
