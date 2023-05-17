import request from '@/utils/request'
export function partnerEmsRecord(params) {
    return request({
        url: '/partner/ems_record/',
        method: 'get',
        params
    })
}
export function partnerEmsRecordPost(data) {
    return request({
        url: '/partner/ems_record/',
        method: 'post',
        data,
    })
}
//部门
export function partnerDepartment(params) {
    return request({
        url: '/partner/sy_department/',
        method: 'get',
        params
    })
}
//合同类型
export function partnerGroupCategory(params) {
    return request({
        url: '/partner/group_category/',
        method: 'get',
        params
    })
}
//公司
export function partnerCompany(params) {
    return request({
        url: '/partner/company/',
        method: 'get',
        params
    })
}
//公司
export function partnerCompanyPost(data) {
    return request({
        url: '/partner/company/',
        method: 'post',
        data,
    })
}
//公司标签
export function partnerTags(params) {
    return request({
        url: '/partner/tags/',
        method: 'get',
        params
    })
}
//联系人列表
export function partnerContact(params) {
    return request({
        url: '/partner/contact/',
        method: 'get',
        params
    })
}
export function partnerContactPost(data) {
    return request({
        url: '/partner/contact/',
        method: 'post',
        data,
    })
}
export function partnerEmsDetail(params) {
    return request({
        url: `/partner/ems_detail/${params.ems_company}/${params.ems_no}/`,
        method: 'get',
        params
    })
}

// http://127.0.0.1:8000/partner/company/?wd=%E4%B8%8A%E6%B5%B7&page=1&page_size=10