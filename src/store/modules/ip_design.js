import { ip_design_projects, ip_design_project_config, ip_design_projects_changes, ip_design_projects_post, ip_design_projects_changes_post, ip_design_projects_key_changes, ip_design_ip, ip_design_ip_post, ip_design_ways, ip_design_entity_conf, ip_design_purchase_post, ip_design_property_conf_ways, ip_design_sales_post } from '@/api/ip_design'
const state = {
  auth_type: {},
  property_conf_purchase: {},
  property_conf_sales: {},
}
const mutations = {
  AUTH_CATEGORY: (state, data) => {
    state.auth_type = data
  },
  PROPERTY_CONF_PURCHASE: (state, data) => {
    state.property_conf_purchase = data
  },
  PROPERTY_CONF_SALES: (state, data) => {
    state.property_conf_sales = data
  },
}
const actions = {
  ip_design_projects(context, body) {
    return new Promise((resolve, reject) => {
      ip_design_projects(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ip_design_sales_post(context, body) {
    return new Promise((resolve, reject) => {
      ip_design_sales_post(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ip_design_property_conf_ways(context, body) {
    return new Promise((resolve, reject) => {
      ip_design_property_conf_ways(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ip_design_purchase_post(context, body) {
    return new Promise((resolve, reject) => {
      ip_design_purchase_post(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ip_design_ways(context, body) {
    return new Promise((resolve, reject) => {
      ip_design_ways(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ip_design_project_config(context, body) {
    return new Promise((resolve, reject) => {
      ip_design_project_config(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ip_design_projects_changes(context, body) {
    return new Promise((resolve, reject) => {
      ip_design_projects_changes(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ip_design_projects_post(context, body) {
    return new Promise((resolve, reject) => {
      ip_design_projects_post(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ip_design_projects_changes_post(context, body) {
    return new Promise((resolve, reject) => {
      ip_design_projects_changes_post(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ip_design_projects_key_changes(context, body) {
    return new Promise((resolve, reject) => {
      ip_design_projects_key_changes(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ip_design_ip(context, body) {
    return new Promise((resolve, reject) => {
      ip_design_ip(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ip_design_ip_post(context, body) {
    return new Promise((resolve, reject) => {
      ip_design_ip_post(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ip_design_entity_conf(context, body) {
    return new Promise((resolve, reject) => {
      ip_design_entity_conf(body).then(res => {
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