import {
  disk_config,
  disk_add,
  disk_search,
  disk_flow_goin,
  disk_flow_out,
  disk_edit,
  disk_history,
  metaVideoSearch,
  productMediaSearch,
  metaVideoUrl,
  metaVideoUpload,
  metaVideoUpdate,
  meta_video_codec,
  metaVideo_delete,
} from '@/api/origin'
const state = {
}
const mutations = {
}
const actions = {
  disk_config(context, body) {
    return new Promise((resolve, reject) => {
      disk_config(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  disk_add(context, body) {
    return new Promise((resolve, reject) => {
      disk_add(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  disk_search(context, body) {
    return new Promise((resolve, reject) => {
      disk_search(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  disk_flow_goin(context, body) {
    return new Promise((resolve, reject) => {
      disk_flow_goin(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  disk_flow_out(context, body) {
    return new Promise((resolve, reject) => {
      disk_flow_out(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  disk_edit(context, body) {
    return new Promise((resolve, reject) => {
      disk_edit(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  disk_history(context, body) {
    return new Promise((resolve, reject) => {
      disk_history(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  metaVideoSearch(context, body) {
      return new Promise((resolve, reject) => {
        metaVideoSearch(body).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
  },
  productMediaSearch(context, body) {
    return new Promise((resolve, reject) => {
      productMediaSearch(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  metaVideoUrl(context, body) {
    return new Promise((resolve, reject) => {
      metaVideoUrl(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  metaVideoUpload(context, body) {
    return new Promise((resolve, reject) => {
      metaVideoUpload(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  metaVideoUpdate(context, body) {
    return new Promise((resolve, reject) => {
      metaVideoUpdate(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  meta_video_codec(context, body) {
    return new Promise((resolve, reject) => {
      meta_video_codec(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  metaVideo_delete(context, body) {
    return new Promise((resolve, reject) => {
      metaVideo_delete(body).then(res => {
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
