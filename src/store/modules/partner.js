import { partnerEmsRecord, partnerDepartment, partnerGroupCategory, partnerEmsRecordPost, partnerCompany, partnerTags, partnerCompanyPost, partnerContact, partnerContactPost, partnerEmsDetail } from '@/api/partner'
const state = {

}
const mutations = {

}
const actions = {
  partnerEmsDetail(context, body) {
    return new Promise((resolve, reject) => {
      partnerEmsDetail(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  partnerContactPost(context, body) {
    return new Promise((resolve, reject) => {
      partnerContactPost(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  partnerContact(context, body) {
    return new Promise((resolve, reject) => {
      partnerContact(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  partnerCompanyPost(context, body) {
    return new Promise((resolve, reject) => {
      partnerCompanyPost(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  partnerTags(context, body) {
    return new Promise((resolve, reject) => {
      partnerTags(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  partnerCompany(context, body) {
    return new Promise((resolve, reject) => {
      partnerCompany(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  partnerEmsRecordPost(context, body) {
    return new Promise((resolve, reject) => {
      partnerEmsRecordPost(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  partnerEmsRecord(context, body) {
    return new Promise((resolve, reject) => {
      partnerEmsRecord(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  partnerDepartment(context, body) {
    return new Promise((resolve, reject) => {
      partnerDepartment(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  partnerGroupCategory(context, body) {
    return new Promise((resolve, reject) => {
      partnerGroupCategory(body).then(res => {
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