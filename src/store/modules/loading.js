const state = {
  loading: false
}
const mutations = {
  SHOW_LOADING(state, data) {
    state.loading = data
  }
}
const actions = {
  setshowloading({ commit }, bool) {
    commit('SHOW_LOADING', bool)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
