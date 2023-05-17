import {
  injectorMediaUploadVideoInfo, injectorStorageList, injectorStorageEdit, injectorMediaExtField,
  injectorMediaExtList, injectorMediaExtDetail, injectorMediaEditMediaExtField, injectorMediaEpisode,
  imdbEpisodeList, imdbAddEpisode, imdbEpisodeDetail, imdbEditEpisode, injectorStorageDetail,
  injectorStorageRelatedMedia, imdbSearchEpisode, injectorMediaSearchExt, imdbGenerateEpisode,
  injectorTaskAdd, partnerGetAllList, injectorTaskBulkAdd, injectorTaskList, injectorTaskSearch,
  injectorTaskReAdd, injectorStorageEditName, imdbGetEpisodeEffectiveTime, imdbSetEpisodeEffectiveTime,
  injectorTaskCanAdd, injectorSeries, injectorSeriesPost, injectorHistory, injected, injected_post,
  imdb_bulk_episode, imdb_bulk_episode_picture,
  work_order_list, work_order_change, cdnConfig, lspCategory, cdnMedia, cdnExists,
  storage_delete, media_update, media_remove, series_update, series_remove, multiEdit, multiUpdate,
  soldOut, getSoldOutResult, seriesReAdd, cronList, deleteCronTask, editCronTask
} from '@/api/injector'
const state = {

}
const mutations = {

}
const actions = {
  imdb_bulk_episode(context, body) {
    return new Promise((resolve, reject) => {
      imdb_bulk_episode(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdb_bulk_episode_picture(context, body) {
    return new Promise((resolve, reject) => {
      imdb_bulk_episode_picture(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorHistory(context, body) {
    return new Promise((resolve, reject) => {
      injectorHistory(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injected_post(context, body) {
    return new Promise((resolve, reject) => {
      injected_post(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injected(context, body) {
    return new Promise((resolve, reject) => {
      injected(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorTaskCanAdd(context, body) {
    return new Promise((resolve, reject) => {
      injectorTaskCanAdd(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorSeriesPost(context, body) {
    return new Promise((resolve, reject) => {
      injectorSeriesPost(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorSeries(context, body) {
    return new Promise((resolve, reject) => {
      injectorSeries(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbSetEpisodeEffectiveTime(context, body) {
    return new Promise((resolve, reject) => {
      imdbSetEpisodeEffectiveTime(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorStorageEditName(context, body) {
    return new Promise((resolve, reject) => {
      injectorStorageEditName(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorTaskReAdd(context, body) {
    return new Promise((resolve, reject) => {
      injectorTaskReAdd(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorTaskSearch(context, body) {
    return new Promise((resolve, reject) => {
      injectorTaskSearch(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorTaskList(context, body) {
    return new Promise((resolve, reject) => {
      injectorTaskList(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorTaskBulkAdd(context, body) {
    return new Promise((resolve, reject) => {
      injectorTaskBulkAdd(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  partnerGetAllList(context, body) {
    return new Promise((resolve, reject) => {
      partnerGetAllList(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbGenerateEpisode(context, body) {
    return new Promise((resolve, reject) => {
      imdbGenerateEpisode(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorMediaSearchExt(context, body) {
    return new Promise((resolve, reject) => {
      injectorMediaSearchExt(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbSearchEpisode(context, body) {
    return new Promise((resolve, reject) => {
      imdbSearchEpisode(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorStorageDetail(context, body) {
    return new Promise((resolve, reject) => {
      injectorStorageDetail(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorStorageRelatedMedia(context, body) {
    return new Promise((resolve, reject) => {
      injectorStorageRelatedMedia(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorMediaUploadVideoInfo(context, body) {
    return new Promise((resolve, reject) => {
      injectorMediaUploadVideoInfo(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbEditEpisode(context, body) {
    return new Promise((resolve, reject) => {
      imdbEditEpisode(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorStorageList(context, body) {
    return new Promise((resolve, reject) => {
      injectorStorageList(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorStorageEdit(context, body) {
    return new Promise((resolve, reject) => {
      injectorStorageEdit(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorMediaExtField(context, body) {
    return new Promise((resolve, reject) => {
      injectorMediaExtField(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorMediaExtList(context, body) {
    return new Promise((resolve, reject) => {
      injectorMediaExtList(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorMediaExtDetail(context, body) {
    return new Promise((resolve, reject) => {
      injectorMediaExtDetail(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorMediaEditMediaExtField(context, body) {
    return new Promise((resolve, reject) => {
      injectorMediaEditMediaExtField(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorMediaEpisode(context, body) {
    return new Promise((resolve, reject) => {
      injectorMediaEpisode(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbEpisodeList(context, body) {
    return new Promise((resolve, reject) => {
      imdbEpisodeList(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbAddEpisode(context, body) {
    return new Promise((resolve, reject) => {
      imdbAddEpisode(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbEpisodeDetail(context, body) {
    return new Promise((resolve, reject) => {
      imdbEpisodeDetail(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  injectorTaskAdd(context, body) {
    return new Promise((resolve, reject) => {
      injectorTaskAdd(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  imdbGetEpisodeEffectiveTime(context, body) {
    return new Promise((resolve, reject) => {
      imdbGetEpisodeEffectiveTime(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //  cdn媒体信息
  work_order_list(context, body) {
    return new Promise((resolve, reject) => {
      work_order_list(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  work_order_change(context, body) {
    return new Promise((resolve, reject) => {
      work_order_change(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  cdnConfig(context, body) {
    return new Promise((resolve, reject) => {
      cdnConfig(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  lspCategory(context, body) {
    return new Promise((resolve, reject) => {
      lspCategory(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  cdnMedia(context, body) {
    return new Promise((resolve, reject) => {
      cdnMedia(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  cdnExists(context, body) {
    return new Promise((resolve, reject) => {
      cdnExists(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  storage_delete(context, body) {
    return new Promise((resolve, reject) => {
      storage_delete(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  media_update(context, body) {
    return new Promise((resolve, reject) => {
      media_update(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  media_remove(context, body) {
    return new Promise((resolve, reject) => {
      media_remove(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  series_update(context, body) {
    return new Promise((resolve, reject) => {
      series_update(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  series_remove(context, body) {
    return new Promise((resolve, reject) => {
      series_remove(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  multiEdit(context, body) {
    return new Promise((resolve, reject) => {
      multiEdit(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  multiUpdate(context, body) {
    return new Promise((resolve, reject) => {
      multiUpdate(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  soldOut(context, body) {
    return new Promise((resolve, reject) => {
      soldOut(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getSoldOutResult(context, body) {
    return new Promise((resolve, reject) => {
      getSoldOutResult(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  seriesReAdd(context, body) {
    return new Promise((resolve, reject) => {
      seriesReAdd(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  cronList(context, body) {
    return new Promise((resolve, reject) => {
      cronList(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteCronTask(context, body) {
    return new Promise((resolve, reject) => {
      deleteCronTask(body).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  editCronTask(context, body) {
    return new Promise((resolve, reject) => {
      editCronTask(body).then(res => {
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
