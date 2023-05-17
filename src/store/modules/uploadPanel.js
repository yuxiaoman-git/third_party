
const state = {
  uploadPanelShow: false,
  expand: false,
}
const mutations = {
  set_panel_show: (state, data) => {
    state.uploadPanelShow = data
  },
  set_expand: (state, data) => {
    state.expand = data
  },
}
const actions = {

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}