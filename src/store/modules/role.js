import { menuGetList, menuAdd, menuDetail, menuEdit, menuOperaAdd, menuOperaDetail, menuOperaEdit, menuOperaDelete, roleAdd, roleDetail, roleEdit, roleGetList, roleModifyStatus, userAdd, userGetList, userDetail, userEdit, userModifyPassword, roleGetPerm, menuGetAllList, menuDelete, menuGetFirstList, roleDelete, userSearch, operaGetAllList, roleGetMenuList, roleEditMenu, userEditRole } from '@/api/role'

const state = {

}
const mutations = {

}
const actions = {
  menuGetList(context, body) {
    return new Promise((resolve, reject) => {
      menuGetList(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  menuGetFirstList(context, body) {
    return new Promise((resolve, reject) => {
      menuGetFirstList(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  menuAdd(context, body) {
    return new Promise((resolve, reject) => {
      menuAdd(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  menuDetail(context, body) {
    return new Promise((resolve, reject) => {
      menuDetail(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  menuDelete(context, body) {
    return new Promise((resolve, reject) => {
      menuDelete(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  menuEdit(context, body) {
    return new Promise((resolve, reject) => {
      menuEdit(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  menuOperaAdd(context, body) {
    return new Promise((resolve, reject) => {
      menuOperaAdd(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  menuOperaDetail(context, body) {
    return new Promise((resolve, reject) => {
      menuOperaDetail(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  menuOperaEdit(context, body) {
    return new Promise((resolve, reject) => {
      menuOperaEdit(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  menuOperaDelete(context, body) {
    return new Promise((resolve, reject) => {
      menuOperaDelete(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  roleAdd(context, body) {
    return new Promise((resolve, reject) => {
      roleAdd(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  roleDetail(context, body) {
    return new Promise((resolve, reject) => {
      roleDetail(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  roleEdit(context, body) {
    return new Promise((resolve, reject) => {
      roleEdit(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  roleGetList(context, body) {
    return new Promise((resolve, reject) => {
      roleGetList(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  roleDelete(context, body) {
    return new Promise((resolve, reject) => {
      roleDelete(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  roleModifyStatus(context, body) {
    return new Promise((resolve, reject) => {
      roleModifyStatus(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  userAdd(context, body) {
    return new Promise((resolve, reject) => {
      userAdd(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  userGetList(context, body) {
    return new Promise((resolve, reject) => {
      userGetList(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  userDetail(context, body) {
    return new Promise((resolve, reject) => {
      userDetail(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  userEdit(context, body) {
    return new Promise((resolve, reject) => {
      userEdit(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  userModifyPassword(context, body) {
    return new Promise((resolve, reject) => {
      userModifyPassword(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  roleGetPerm(context, body) {
    return new Promise((resolve, reject) => {
      roleGetPerm(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  menuGetAllList(context, body) {
    return new Promise((resolve, reject) => {
      menuGetAllList(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  userSearch(context, body) {
    return new Promise((resolve, reject) => {
      userSearch(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  operaGetAllList(context, body) {
    return new Promise((resolve, reject) => {
      operaGetAllList(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  roleGetMenuList(context, body) {
    return new Promise((resolve, reject) => {
      roleGetMenuList(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  roleEditMenu(context, body) {
    return new Promise((resolve, reject) => {
      roleEditMenu(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  userEditRole(context, body) {
    return new Promise((resolve, reject) => {
      userEditRole(body).then(res => {
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