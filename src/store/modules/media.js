import { imdbSearchDouban, imdbDetailDouban, imdbGenreAllList, imdbAdd, imdbDetail, imdbRegionAllList,
  imdbEdit, imdbGetList, imdbSearch, imdbSearchNameList, imdbSearchCelebrity, imdbCelebrityList,
  imdbCelebrityDetail, imdbAddCelebrity, imdbEditCelebrity, imdbEpisode_searchByMedia, galleryEpisodes,
  search_media, mediaList, mediaSearch, mediaSync } from '@/api/media'
const state = {

}
const mutations = {

}
const actions = {
  imdbEpisode_searchByMedia(context, body) {
    return new Promise((resolve, reject) => {
      imdbEpisode_searchByMedia(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbEditCelebrity(context, body) {
    return new Promise((resolve, reject) => {
      imdbEditCelebrity(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbAddCelebrity(context, body) {
    return new Promise((resolve, reject) => {
      imdbAddCelebrity(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbSearchDouban(context, body) {
    return new Promise((resolve, reject) => {
      imdbSearchDouban(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbDetailDouban(context, body) {
    return new Promise((resolve, reject) => {
      imdbDetailDouban(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbGenreAllList(context, body) {
    return new Promise((resolve, reject) => {
      imdbGenreAllList(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbAdd(context, body) {
    return new Promise((resolve, reject) => {
      imdbAdd(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbDetail(context, body) {
    return new Promise((resolve, reject) => {
      imdbDetail(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbRegionAllList(context, body) {
    return new Promise((resolve, reject) => {
      imdbRegionAllList(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbEdit(context, body) {
    return new Promise((resolve, reject) => {
      imdbEdit(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbGetList(context, body) {
    return new Promise((resolve, reject) => {
      imdbGetList(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbSearch(context, body) {
    return new Promise((resolve, reject) => {
      imdbSearch(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbSearchNameList(context, body) {
    return new Promise((resolve, reject) => {
      imdbSearchNameList(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbSearchCelebrity(context, body) {
    return new Promise((resolve, reject) => {
      imdbSearchCelebrity(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbCelebrityList(context, body) {
    return new Promise((resolve, reject) => {
      imdbCelebrityList(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbCelebrityDetail(context, body) {
    return new Promise((resolve, reject) => {
      imdbCelebrityDetail(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  galleryEpisodes(context, body) {
    return new Promise((resolve, reject) => {
      galleryEpisodes(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  search_media(context, body) {
    return new Promise((resolve, reject) => {
      search_media(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  mediaList(context, body) {
    return new Promise((resolve, reject) => {
      mediaList(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  mediaSearch(context, body) {
    return new Promise((resolve, reject) => {
      mediaSearch(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  mediaSync(context, body) {
    return new Promise((resolve, reject) => {
      mediaSync(body).then(res => {
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
