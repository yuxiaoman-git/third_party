import request from '@/utils/request'
export function imdbSearchDouban(query) {
  return request({
    url: '/imdb/search_douban/',
    method: 'get',
    params: query
  })
}
export function imdbDetailDouban(query) {
  return request({
    url: '/imdb/detail_douban/',
    method: 'get',
    params: query
  })
}
//获取所有的题材列表
export function imdbGenreAllList(query) {
  return request({
    url: '/imdb/genre_all_list/',
    method: 'get',
    params: query
  })
}
//添加
export function imdbAdd(data) {
  return request({
    url: '/imdb/add/',
    method: 'post',
    form_data: true,
    data
  })
}
//编辑详情
export function imdbDetail(query) {
  return request({
    url: '/imdb/detail/',
    method: 'get',
    params: query
  })
}
//地区列表
export function imdbRegionAllList(query) {
  return request({
    url: '/imdb/region_all_list/',
    method: 'get',
    params: query
  })
}
//编辑
export function imdbEdit(data) {
  return request({
    url: '/imdb/edit/',
    method: 'post',
    form_data: true,
    data
  })
}
//列表
export function imdbGetList(query) {
  return request({
    url: '/imdb/get_list/',
    method: 'get',
    params: query
  })
}
//搜索
export function imdbSearch(query) {
  return request({
    url: '/imdb/search/',
    method: 'get',
    params: query
  })
}
//智能搜索
export function imdbSearchNameList(query) {
  return request({
    url: '/imdb/search_name_list/',
    method: 'get',
    params: query
  })
}
//根据名称搜索人物列表
export function imdbSearchCelebrity(query) {
  return request({
    url: '/imdb/search_celebrity/',
    method: 'get',
    params: query
  })
}
//人物列表
export function imdbCelebrityList(query) {
  return request({
    url: '/imdb/celebrity_list/',
    method: 'get',
    params: query
  })
}
//人物详情
export function imdbCelebrityDetail(query) {
  return request({
    url: '/imdb/celebrity_detail/',
    method: 'get',
    params: query
  })
}
export function imdbEpisode_searchByMedia(query) {
  return request({
    url: '/imdb/episode_search_by_media/',
    method: 'get',
    params: query
  })
}
//添加人物
export function imdbAddCelebrity(data) {
  return request({
    url: '/imdb/add_celebrity/',
    method: 'post',
    form_data: true,
    data
  })
}
//编辑人物
export function imdbEditCelebrity(data) {
  return request({
    url: '/imdb/edit_celebrity/',
    method: 'post',
    form_data: true,
    data
  })
}
export function galleryEpisodes(query) {
  return request({
    url: `/imdb/gallery/episodes/${query.id}`,
    method: 'get',
    params: query

  })
}
//根据名称搜索节目
export function search_media(query) {
  return request({
    url: '/imdb/search_media/',
    method: 'get',
    params: query
  })
}
//媒体库管理 列表
export function mediaList() {
  return request({
    url: '/imdb/product_medias/index/',
    method: 'get',
  })
}
//媒体库管理 搜索
export function mediaSearch(query) {
  return request({
    url: '/imdb/product_medias/',
    method: 'get',
    params: query
  })
}
//媒体库管理 同步
export function mediaSync(data) {
  return request({
    url: '/imdb/product_medias/synchronous/',
    method: 'post',
    data
  })
}
