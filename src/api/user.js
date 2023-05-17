import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/perm/user/login/',
    method: 'post',
    form_data: true,
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/perm/user/logout/',
    method: 'post',
    form_data: true,
  })
}
export function injectorOssGetToken(query) {
  return request({
    url: '/injector/oss/get_token/',
    method: 'get',
    params: query

  })
}
