import request from '@/utils/request'
//  硬盘状态参数配置
export function disk_config(params) {
  return request({
    url: '/origin/disk/config/',
    method: 'get',
    params
  })
}
//  增加硬盘
export function disk_add(data) {
  return request({
    url: '/origin/disk/add/',
    method: 'post',
    form_data: true,
    data
  })
}
//  查询硬盘
export function disk_search(params) {
  return request({
    url: '/origin/disk/search/',
    method: 'get',
    params
  })
}
//  修改硬盘
export function disk_edit(data) {
  return request({
    url: '/origin/disk/edit/',
    method: 'post',
    form_data: true,
    data
  })
}
// 硬盘出库
export function disk_flow_out(data) {
  return request({
    url: '/origin/disk_flow/out/',
    method: 'post',
    form_data: true,
    data
  })
}
// 硬盘入库
export function disk_flow_goin(data) {
  return request({
    url: '/origin/disk_flow/goin/',
    method: 'post',
    form_data: true,
    data
  })
}
// 查询硬盘流程记录
export function disk_history(params) {
  return request({
    url: '/origin/disk/history/',
    method: 'get',
    params
  })
}
//  源视频管理列表
export function metaVideoSearch(params) {
  return request({
    url: '/origin/meta_video/search/',
    method: 'get',
    params
  })
}
//  查询资产媒资库
export function productMediaSearch(params) {
  return request({
    url: '/origin/product_media/search/',
    method: 'get',
    params
  })
}
//  返回上传文件地址
export function metaVideoUrl(params) {
  return request({
    url: '/origin/meta_video/url/',
    method: 'get',
    params
  })
}
//  上传文件后同步数据库
export function metaVideoUpload(data) {
  return request({
    url: '/origin/meta_video/upload/',
    method: 'post',
    data
  })
}
//  修改源视频信息
export function metaVideoUpdate(data) {
  return request({
    url: '/origin/meta_video/update/',
    method: 'post',
    data
  })
}
//  获取视频编码选项
export function meta_video_codec() {
  return request({
    url: '/origin/meta_video/codec/',
    method: 'get',
  })
}
// 删除源视频
export function metaVideo_delete(data) {
  return request({
    url: '/origin/meta_video/delete/',
    method: 'post',
    data
  })
}
