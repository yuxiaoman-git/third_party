import request from '@/utils/request'
export function injectorMediaUploadVideoInfo(data) {
  return request({
    url: '/injector/storage/upload_info/',
    method: 'post',
    data
  })
}
export function injectorStorageList(params) {
  return request({
    url: '/injector/storage/get_list/',
    method: 'get',
    params
  })
}
export function injectorStorageEdit(data) {
  return request({
    url: '/injector/storage/edit/',
    method: 'post',
    form_data: true,
    data
  })
}
export function injectorMediaExtField(data) {
  return request({
    url: '/injector/media_ext/media_ext_field/',
    method: 'post',
    form_data: true,
    data
  })
}
export function injectorMediaEditMediaExtField(data) {
  return request({
    url: '/injector/media_ext/edit_media_ext_field/',
    method: 'post',
    form_data: true,
    data
  })
}
export function injectorMediaExtList(params) {
  return request({
    url: '/injector/media_ext/media_ext_list/',
    method: 'get',
    params
  })
}
export function injectorMediaExtDetail(params) {
  return request({
    url: '/injector/media_ext/media_ext_detail/',
    method: 'get',
    params
  })
}
export function injectorStorageDetail(params) {
  return request({
    url: '/injector/storage/detail/',
    method: 'get',
    params
  })
}
export function injectorStorageRelatedMedia(data) {
  return request({
    url: '/injector/storage/related_media/',
    method: 'post',
    form_data: true,
    data
  })
}
export function injectorMediaEpisode(data) {
  return request({
    url: '/injector/media_ext/episode/',
    method: 'post',
    form_data: true,
    data
  })
}
//分集列表
export function imdbEpisodeList(params) {
  return request({
    url: '/imdb/episode_list/',
    method: 'get',
    params
  })
}
//分集详情
export function imdbEpisodeDetail(params) {
  return request({
    url: '/imdb/episode_detail/',
    method: 'get',
    params
  })
}
//添加分集/imdb/add_episode/
export function imdbAddEpisode(data) {
  return request({
    url: '/imdb/add_episode/',
    method: 'post',
    form_data: true,
    data
  })
}
//编辑分集
export function imdbEditEpisode(data) {
  return request({
    url: '/imdb/edit_episode/ ',
    method: 'post',
    form_data: true,
    data
  })
}
//搜索分集
export function imdbSearchEpisode(params) {
  return request({
    url: '/imdb/search_episode/',
    method: 'get',
    params
  })
}
export function injectorMediaSearchExt(params) {
  return request({
    url: '/injector/storage/search/',
    method: 'get',
    params
  })
}
//生成分集
export function imdbGenerateEpisode(data) {
  return request({
    url: '/imdb/generate_episode/',
    method: 'post',
    form_data: true,
    data
  })
}
export function injectorTaskAdd(data) {
  return request({
    url: '/injector/task/add/',
    method: 'post',
    filterErrMesg: true,
    data
  })
}
export function injectorTaskCanAdd(params) {
  return request({
    url: '/injector/task/can_add/',
    method: 'get',
    params
  })
}
export function injectorSeriesPost(data) {
  return request({
    url: '/injector/series/',
    method: 'post',
    data
  })
}
export function injectorSeries(params) {
  return request({
    url: '/injector/series/',
    method: 'get',
    params
  })
}
//批量注入
export function injectorTaskBulkAdd(data) {
  return request({
    url: '/injector/task/bulk_add/',
    method: 'post',
    form_data: true,
    data
  })
}
export function partnerGetAllList(params) {
  return request({
    url: '/injector/lsp/get_all_list/',
    method: 'get',
    params
  })
}
//任务列表
export function injectorTaskList(params) {
  return request({
    url: '/injector/task/get_list/',
    method: 'get',
    params
  })
}
export function injectorTaskSearch(params) {
  return request({
    url: '/injector/task/search/',
    method: 'get',
    params
  })
}
export function injectorHistory(params) {
  return request({
    url: '/injector/history/',
    method: 'get',
    params
  })
}
export function injected(params) {
  return request({
    url: '/injector/injected/',
    method: 'get',
    params
  })
}
export function injectorTaskReAdd(data) {
  return request({
    url: '/injector/task/re_add/',
    method: 'post',
    form_data: true,
    data
  })
}
//修改文件名称
export function injectorStorageEditName(data) {
  return request({
    url: '/injector/storage/edit_name/',
    method: 'post',
    form_data: true,
    data
  })
}
export function imdbGetEpisodeEffectiveTime(params) {
  return request({
    url: '/imdb/get_episode_effective_time/',
    method: 'get',
    params
  })
}
export function imdbSetEpisodeEffectiveTime(data) {
  return request({
    url: '/imdb/set_episode_effective_time/',
    method: 'post',
    data
  })
}
export function injected_post(data) {
  return request({
    url: '/injector/injected/',
    method: 'post',
    data
  })
}

export function imdb_bulk_episode(data) {
  return request({
    url: '/imdb/bulk_episode/character/',
    method: 'post',
    data,
  })
}
export function imdb_bulk_episode_picture(data) {
  return request({
    url: '/imdb/bulk_episode/picture/',
    method: 'post',
    data,
  })
}
//  查看cdn媒体信息
export function work_order_list(params) {
  return request({
    url: '/injector/cdn/work_order/',
    method: 'get',
    params
  })
}
//  修改 | 创建cdn媒体信息
export function work_order_change(data) {
  return request({
    url: '/injector/cdn/work_order/',
    method: 'post',
    data
  })
}
//  cdn配置查询
export function cdnConfig(params) {
  return request({
    url: '/injector/cdn/config/',
    method: 'get',
    params
  })
}
//  LSP类型查询
export function lspCategory(params) {
  return request({
    url: '/injector/lsp/category/',
    method: 'get',
    params
  })
}
//  获取CDN媒体信息
export function cdnMedia(params) {
  return request({
    url: '/injector/cdn/media/',
    method: 'get',
    params
  })
}
//  检索CDN工单是否已经被创建
export function cdnExists(params) {
  return request({
    url: '/injector/cdn/exists/',
    method: 'get',
    params
  })
}
// 删除影片
export function storage_delete(data) {
  return request({
    url: '/injector/storage/delete/',
    method: 'post',
    data
  })
}
// 媒资注入更新
export function media_update(params) {
  return request({
    url: 'injector/task/media_update/' + params.task_id,
    method: 'get',
    // params
  })
}
// 媒资注入删除
export function media_remove(params) {
  return request({
    url: 'injector/task/media_remove/' + params.task_id,
    method: 'get',
    // params
  })
}
// 剧头注入更新
export function series_update(params) {
  return request({
    url: 'injector/series/update/' + params.task_id,
    method: 'get',
    // params
  })
}
// 剧头注入删除
export function series_remove(params) {
  return request({
    url: 'injector/series/remove/' + params.task_id,
    method: 'get',
    // params
  })
}
// 批量编辑
export function multiEdit(data) {
  return request({
    url: '/injector/cdn/wk_bulk_update/',
    method: 'post',
    data
  })
}
// 批量更新
export function multiUpdate(data) {
  return request({
    url: '/injector/task/bulk_update/',
    method: 'post',
    data
  })
}
//批量下架
export function soldOut(data) {
  return request({
    url: 'injector/offline/',
    method: 'post',
    data
  })
}
//查询下架结果
export function getSoldOutResult(params) {
  return request({
    url: 'injector/offline/',
    method: 'get',
    params
  })
}
//  剧头重新注入
export function seriesReAdd(data) {
  return request({
    url: 'injector/series/re_add/',
    method: 'post',
    data
  })
}
// 定时任务列表
export function cronList(params) {
  return request({
    url: 'injector/task/cron_view/',
    method: 'get',
    params
  })
}
//  删除定时任务
export function deleteCronTask(params) {
  return request({
    url: `injector/task/cron_view/`,
    method: "delete",
    params
  });
}
//  修改定时任务
export function editCronTask(data) {
  const { body, params } = data
  return request({
    url: `injector/task/cron_view/`,
    method: "put",
    data: body,
    params
  });
}
