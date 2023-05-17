import request from "@/utils/request";
// const mockApi = 'https://mock.apifox.cn/m1/963203-0-default/'
// const mockApi = 'http://192.168.252.149:8000/'
// const mockApi = '/'
export function propertyEntityList(query) {
  return request({
    url: "/ip_media/china_entity/",
    method: "get",
    params: query
  });
}
//版权列表
export function propertyList(query) {
  return request({
    url: `/copyright/draft_brief`,
    method: "get",
    params: query
  });
}
//  搜索配置
export function search_config(query) {
  return request({
    url: `/copyright/search_config`,
    method: "get",
    params: query
  });
}
//  基本配置
export function base_config(query) {
  return request({
    url: `/copyright/base_config`,
    method: "get",
    params: query
  });
}
//  删除版权
export function base_delete(query) {
  return request({
    url: `/copyright/draft_brief/${query.id}`,
    method: "delete"
  });
}
//  获取版权数据（更新按钮)
export function base_entity_detail(query) {
  return request({
    url: `/copyright/draft_brief/${query.id}`,
    method: "get"
  });
}
//获取产品版权数据（更新按钮）
export function copyright_product_base(query) {
  return request({
    url: `/copyright/product/brief/${query.id}`,
    method: "get"
  });
}
//  更新版权
export function baseUpdate(data) {
  return request({
    url: `/copyright/draft/update`,
    method: "post",
    data
  });
}
//  获取节目名称
export function search_id_name(query) {
  return request({
    url: `/imdb/search_id_name`,
    method: "get",
    params: query
  });
}

//  获取上下游合作伙伴
export function partner_search_name(query) {
  return request({
    url: `/partner/search_name`,
    method: "get",
    params: query
  });
}
// 根据实体类型获取实体
export function entity_config(query) {
  return request({
    url: `/copyright/entity_config`,
    method: "get",
    params: query
  });
}
//流程中版权明细列表
export function detailsList(query) {
  return request({
    url: `/copyright/draft_details`,
    method: "get",
    params: query
  });
}
//版权明细列表
export function productDetailsList(query) {
  return request({
    url: `/copyright/details`,
    method: "get",
    params: query
  });
}

//  删除组
export function details_delete(query) {
  return request({
    url: `/copyright/details/${query.id}`,
    method: "delete"
  });
}

//  删除组（流程中）
export function draftDetails_delete(query) {
  return request({
    url: `/copyright/draft_details/${query.id}`,
    method: "delete"
  });
}
//  获取权利详情（更新按钮)
export function copyright_detail(query) {
  return request({
    url: `/copyright/details/${query.id}`,
    method: "get",
    params: query
  });
}

//  获取权利详情（更新按钮)(流程中)
export function draftCopyright_detail(query) {
  return request({
    url: `/copyright/draft_details/${query.id}`,
    method: "get",
    params: query
  });
}

//  更新组权利
export function detailsUpdate(data) {
  return request({
    url: `/copyright/details/update`,
    method: "post",
    data
  });
}

//  更新组权利（流程中）
export function draftDetailsUpdate(data) {
  return request({
    url: `/copyright/draft_details/update`,
    method: "post",
    data
  });
}
// 新增版权
export function insert(data) {
  return request({
    url: `/copyright/draft/insert`,
    method: "post",
    data
  });
}
// 根据实体类型获取实体
export function entitySearch(query) {
  return request({
    url: `/copyright/entity/search`,
    method: "get",
    params: query
  });
}
// 根据产品ID获取媒资信息
export function searchById(query) {
  return request({
    url: `/copyright/product/search_by_id`,
    method: "get",
    params: query
  });
}
// 权利明细导出
export function exportDetail(query) {
  return request({
    url: `/copyright/details/export`,
    method: "get",
    params: query,
    timeout: 200000
  });
}
// 绑定产品ID
export function bindProduct(data) {
  return request({
    url: `/copyright/draft/bind_product`,
    method: "post",
    params: data
  });
}
//  获取实体列表
export function getEntityList(query) {
  return request({
    url: "/copyright/entity",
    method: "get",
    params: query
  });
}
//  新增实体
export function addEntityList(data) {
  return request({
    url: "/copyright/entity",
    method: "post",
    data
  });
}
//  更新实体
export function updateEntityList(data) {
  return request({
    url: "/copyright/entity/update",
    method: "post",
    data
  });
}
//  获取实体详情
export function entityDetail(data) {
  return request({
    url: `/copyright/entity/${data.id}`,
    method: "post",
  });
}
//  删除实体
export function delEntity(data) {
  return request({
    url: `/copyright/entity/${data.id}`,
    method: "delete",
  });
}
//  刷黑名单转白名单数据
export function refresh(query) {
  return request({
    url: "/copyright/refresh_entity",
    method: "get",
    params: query
  });
}
//   批量导入产品版权
export function importCopyright(data) {
  return request({
    url: "/copyright/import_copyright",
    method: "post",
    form_data: true,
    data,
  });
}
//   批量导入流程中版权
export function importDraftCopyright(data) {
  return request({
    url: "/copyright/import_draft_copyright",
    method: "post",
    form_data: true,
    data,
  });
}
export function saleListPost(data) {
  const { body, params } = data;
  return request({
    url: `/ip_media/sale/list/${params.page}/`,
    method: "post",
    data: body,
    params
  });
}
export function saleList(query) {
  return request({
    url: `/ip_media/sale/list/${query.page}/`,
    method: "get",
    params: query
  });
}
export function saleDetail(query) {
  return request({
    url: `/ip_media/sale/detail/${query.id}/`,
    method: "get",
    params: query
  });
}
export function property_conf(query) {
  return request({
    url: `/ip_media/property_conf/`,
    method: "get",
    params: query
  });
}

export function propertyEdit(data) {
  return request({
    url: `/ip_media/purchase/edit/property/${data._id}/`,
    method: "post",
    data
  });
}
export function saleEdit(data) {
  return request({
    url: `/ip_media/sale/edit/property/${data._id}/`,
    method: "post",
    data
  });
}
export function property_add(data) {
  return request({
    url: `/ip_media/purchase/add/`,
    method: "post",
    data
  });
}
export function sale_add(data) {
  return request({
    url: `/ip_media/sale/add/`,
    method: "post",
    data
  });
}
export function propertyMainEdit(data) {
  return request({
    url: `/ip_media/purchase/edit/main/${data._id}/`,
    method: "post",
    data
  });
}
export function saleMainEdit(data) {
  return request({
    url: `/ip_media/sale/edit/main/${data._id}/`,
    method: "post",
    data
  });
}
export function propertyMediaMatch(query) {
  return request({
    url: `/ip_media/purchase/media_match/${query.id}/`,
    method: "get",
    params: query
  });
}
export function saleMediaMatch(query) {
  return request({
    url: `/ip_media/sale/media_match/${query.id}/`,
    method: "get",
    params: query
  });
}
export function propertyTemplateList(query) {
  return request({
    url: `/ip_media/template_list/`,
    method: "get",
    params: query
  });
}
export function copyright_product_list(query) {
  return request({
    url: `/copyright/product/list`,
    method: "get",
    params: query
  });
}
export function copyright_product_list_config(query) {
  return request({
    url: `/copyright/product/list/config`,
    method: "get",
    params: query
  });
}
export function copyright_product_list_details(query) {
  return request({
    url: `/copyright/product/list/${query.id}`,
    method: "get",
    params: query
  });
}
export function copyright_product_insert(data) {
  return request({
    url: `/copyright/product/insert`,
    method: "post",
    data
  });
}
export function copyright_product_update(data) {
  return request({
    url: `/copyright/product/update`,
    method: "post",
    data
  });
}
