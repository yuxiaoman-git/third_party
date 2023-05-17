import request from '@/utils/request'
export function onlinePrograms(params) {
  return request({
    url: '/cooprate_plat/online_programs',
    method: 'get',
    params
  })
}
export function onlineProgramsConfig(params) {
  return request({
    url: '/cooprate_plat/online_programs_config',
    method: 'get',
    params
  })
}

