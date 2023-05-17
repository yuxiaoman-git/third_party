import request from '@/utils/request'
export function ip_design_projects(params) {
  return request({
    url: '/ip_design/projects/',
    method: 'get',
    params
  })
}
export function ip_design_projects_post(data) {
  const { body, params } = data
  return request({
    url: '/ip_design/projects/',
    method: 'post',
    data: body,
    params
  })
}
export function ip_design_project_config(params) {
  return request({
    url: '/ip_design/project/config/',
    method: 'get',
    params
  })
}
export function ip_design_projects_changes(params) {
  return request({
    url: '/ip_design/projects/changes/',
    method: 'get',
    params
  })
}
export function ip_design_projects_key_changes(params) {
  return request({
    url: '/ip_design/projects/key_changes/',
    method: 'get',
    params
  })
}
export function ip_design_projects_changes_post(data) {
  return request({
    url: '/ip_design/projects/changes/',
    method: 'post',
    data
  })
}
export function ip_design_ip(params) {
  return request({
    url: '/ip_design/ip/',
    method: 'get',
    params
  })
}
export function ip_design_ip_post(data) {
  return request({
    url: '/ip_design/ip/',
    method: 'post',
    data
  })
}
export function ip_design_ways(params) {
  return request({
    url: '/ip_design/' + params.ways + '/',
    method: 'get',
    params
  })
}
export function ip_design_purchase_post(data) {
  return request({
    url: '/ip_design/purchase/',
    method: 'post',
    data
  })
}
export function ip_design_sales_post(data) {
  return request({
    url: '/ip_design/sales/',
    method: 'post',
    data
  })
}
export function ip_design_entity_conf(params) {
  return request({
    url: '/ip_design/entity_conf/',
    method: 'get',
    params
  })
}
export function ip_design_property_conf_ways(params) {
  return request({
    url: '/ip_design/property_conf/' + params.ways + '/',
    method: 'get',
    params
  })
}