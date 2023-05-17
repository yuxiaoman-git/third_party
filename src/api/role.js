import request from '@/utils/request'
export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/vue-element-admin/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
// 获取菜单列表（一级菜单、二级菜单）
export function menuGetList(query) {
  return request({
    url: '/perm/menu/get_user_menu_list/',
    method: 'get',
    params: query

  })
}
// 获取所有菜单列表（一级菜单、二级菜单）
export function menuGetAllList(query) {
  return request({
    url: '/perm/menu/get_all_list/',
    method: 'get',
    params: query

  })
}
// 获取菜单列表（一级菜单）
export function menuGetFirstList(query) {
  return request({
    url: '/perm/menu/get_first_list/',
    method: 'get',
    params: query

  })
}

// 添加菜单
export function menuAdd(data) {
  return request({
    url: '/perm/menu/add/',
    method: 'post',
    form_data: true,
    data

  })
}
// 获取某角色的一级二级菜单和权限列表
export function roleGetMenuList(query) {
  return request({
    url: '/perm/role/get_menu_list/',
    method: 'get',
    params: query

  })
}
// 菜单详情
export function menuDetail(query) {
  return request({
    url: '/perm/menu/detail/',
    method: 'get',
    params: query

  })
}
// 编辑角色的菜单
export function roleEditMenu(data) {
  return request({
    url: '/perm/role/edit_menu/',
    method: 'post',
    form_data: true,
    data

  })
}
// 编辑菜单（包括修改状态）
export function menuEdit(data) {
  return request({
    url: '/perm/menu/edit/',
    method: 'post',
    form_data: true,
    data

  })
}
// 删除菜单
export function menuDelete(data) {
  return request({
    url: '/perm/menu/delete/',
    method: 'post',
    form_data: true,
    data

  })
}
// 增加权限操作
export function menuOperaAdd(data) {
  return request({
    url: '/perm/menu/opera/add/',
    method: 'post',
    form_data: true,
    data

  })
}
// 权限详情
export function menuOperaDetail(query) {
  return request({
    url: '/perm/menu/opera/detail/',
    method: 'get',
    params: query

  })
}
// 编辑权限
export function menuOperaEdit(query) {
  return request({
    url: '/perm/menu/opera/edit/',
    method: 'get',
    params: query

  })
}
// 删除权限(硬删除)
export function menuOperaDelete(data) {
  return request({
    url: '/perm/menu/opera/delete/',
    method: 'post',
    form_data: true,
    data

  })
}
// 获取所有的权限列表
export function operaGetAllList(query) {
  return request({
    url: '/perm/opera/get_all_list/',
    method: 'get',
    params: query
  })
}
// 角色添加
export function roleAdd(data) {
  return request({
    url: '/perm/role/add/',
    method: 'post',
    form_data: true,
    data

  })
}
// 角色详情
export function roleDetail(query) {
  return request({
    url: '/perm/role/detail/',
    method: 'get',
    params: query

  })
}
// 角色编辑
export function roleEdit(data) {
  return request({
    url: '/perm/role/edit/',
    method: 'post',
    form_data: true,
    data

  })
}
// 角色列表
export function roleGetList(query) {
  return request({
    url: '/perm/role/get_list/',
    method: 'get',
    params: query

  })
}
// 角色删除
export function roleDelete(data) {
  return request({
    url: '/perm/role/delete/',
    method: 'post',
    form_data: true,
    data

  })
}
// 角色修改状态
export function roleModifyStatus(data) {
  return request({
    url: '/perm/role/modify_status/',
    method: 'post',
    form_data: true,
    data

  })
}
// 添加人员
export function userAdd(data) {
  return request({
    url: '/perm/user/add/',
    method: 'post',
    form_data: true,
    data

  })
}
// 用户列表
export function userGetList(query) {
  return request({
    url: '/perm/user/get_list/',
    method: 'get',
    params: query

  })
}
// 用户详情
export function userDetail(query) {
  return request({
    url: '/perm/user/detail/',
    method: 'get',
    params: query

  })
}
// 用户编辑（包括修改状态）
export function userEdit(data) {
  return request({
    url: '/perm/user/edit/',
    method: 'post',
    form_data: true,
    data

  })
}
//编辑用户的角色
export function userEditRole(data) {
  return request({
    url: '/perm/user/edit_user_roles/',
    method: 'post',
    form_data: true,
    data

  })
}
// 用户修改密码
export function userModifyPassword(data) {
  return request({
    url: '/perm/user/modify_password/',
    method: 'post',
    form_data: true,
    data

  })
}
// 获取权限
export function roleGetPerm(query) {
  return request({
    url: '/perm/role/get_perm/',
    method: 'get',
    // loading:true,
    params: query

  })
}
// 查询
export function userSearch(query) {
  return request({
    url: '/perm/user/search/',
    method: 'get',
    params: query

  })
}