import { permHierarchyList, permHierarchyAdd, permHierarchyEdit, permHierarchyRemove } from '@/api/perm'
const state = {

}
const mutations = {

}
const actions = {
  permHierarchyAdd(context, body) {
    return new Promise((resolve, reject) => {
      permHierarchyAdd(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  permHierarchyList(context, body) {
    return new Promise((resolve, reject) => {
      permHierarchyList(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  permHierarchyEdit(context, body) {
    return new Promise((resolve, reject) => {
      permHierarchyEdit(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  permHierarchyRemove(context, body) {
    return new Promise((resolve, reject) => {
      permHierarchyRemove(body).then(res => {
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