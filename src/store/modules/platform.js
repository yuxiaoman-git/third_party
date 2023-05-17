import {onlinePrograms, onlineProgramsConfig} from '@/api/platform'
const state = {

}
const mutations = {

}
const actions = {
  onlinePrograms(context, body) {
    return new Promise((resolve, reject) => {
      onlinePrograms(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  onlineProgramsConfig(context, body) {
    return new Promise((resolve, reject) => {
      onlineProgramsConfig(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
