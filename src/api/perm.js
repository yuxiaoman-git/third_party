import request from '@/utils/request'
export function permHierarchyList(params) {
  return request({
    url: '/perm/hierarchy/list',
    method: 'get',
    params: params
  })
}
export function permHierarchyAdd(params) {
  return request({
    url: '/perm/hierarchy/add',
    method: 'get',
    params: params
  })
}
export function permHierarchyEdit(params) {
  return request({
    url: '/perm/hierarchy/edit',
    method: 'get',
    params: params
  })
}
export function permHierarchyRemove(params) {
  return request({
    url: '/perm/hierarchy/remove',
    method: 'get',
    params: params
  })
}
// http://192.168.0.26:8000/perm/hierarchy/add?parent_id=2&user_id=??
// http://192.168.0.26:8000/perm/hierarchy/edit?parent_id=2&node_id&user_id=??  编辑接口
// http://192.168.0.26:8000/perm/hierarchy/remove?parent_id=2&node_id  移除接口