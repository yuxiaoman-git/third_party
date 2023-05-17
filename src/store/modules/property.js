import {
  propertyEntityList,
  propertyList,
  propertyEdit,
  property_conf,
  propertyMainEdit,
  propertyMediaMatch,
  property_add,
  propertyTemplateList,
  saleList,
  sale_add,
  saleDetail,
  saleEdit,
  saleMainEdit,
  saleMediaMatch,
  saleListPost,
  search_config,
  base_delete,
  base_entity_detail,
  search_id_name,
  partner_search_name,
  base_config,
  entity_config,
  copyright_product_list,
  detailsList,
  details_delete,
  copyright_detail,
  detailsUpdate,
  insert,
  baseUpdate,
  entitySearch,
  searchById,
  copyright_product_list_config,
  copyright_product_base,
  copyright_product_insert,
  copyright_product_update,
  copyright_product_list_details,
  productDetailsList,
  exportDetail,
  bindProduct,
  getEntityList,
  addEntityList,
  updateEntityList,
  entityDetail,
  delEntity,
  refresh,
  draftDetails_delete,
  draftCopyright_detail,
  draftDetailsUpdate,
  importCopyright, importDraftCopyright
} from "@/api/property";
const state = {
  property_conf: {}
};
const mutations = {
  SET_PROPERTY: (state, data) => {
    state.property_conf = data;
  }
};
const actions = {
  copyright_product_list_details(context, body) {
    return new Promise((resolve, reject) => {
      copyright_product_list_details(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  copyright_product_insert(context, body) {
    return new Promise((resolve, reject) => {
      copyright_product_insert(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  copyright_product_update(context, body) {
    return new Promise((resolve, reject) => {
      copyright_product_update(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  copyright_product_base(context, body) {
    return new Promise((resolve, reject) => {
      copyright_product_base(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  copyright_product_list_config(context, body) {
    return new Promise((resolve, reject) => {
      copyright_product_list_config(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  copyright_product_list(context, body) {
    return new Promise((resolve, reject) => {
      copyright_product_list(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  saleListPost(context, body) {
    return new Promise((resolve, reject) => {
      saleListPost(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  saleMediaMatch(context, body) {
    return new Promise((resolve, reject) => {
      saleMediaMatch(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  saleDetail(context, body) {
    return new Promise((resolve, reject) => {
      saleDetail(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  sale_add(context, body) {
    return new Promise((resolve, reject) => {
      sale_add(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  saleList(context, body) {
    return new Promise((resolve, reject) => {
      saleList(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  saleEdit(context, body) {
    return new Promise((resolve, reject) => {
      saleEdit(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  saleMainEdit(context, body) {
    return new Promise((resolve, reject) => {
      saleMainEdit(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  propertyEntityList(context, body) {
    return new Promise((resolve, reject) => {
      propertyEntityList(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  propertyList(context, body) {
    return new Promise((resolve, reject) => {
      propertyList(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  propertyEdit(context, body) {
    return new Promise((resolve, reject) => {
      propertyEdit(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  property_conf(context, body) {
    return new Promise((resolve, reject) => {
      property_conf(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  propertyMainEdit(context, body) {
    return new Promise((resolve, reject) => {
      propertyMainEdit(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  propertyMediaMatch(context, body) {
    return new Promise((resolve, reject) => {
      propertyMediaMatch(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  property_add(context, body) {
    return new Promise((resolve, reject) => {
      property_add(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  propertyTemplateList(context, body) {
    return new Promise((resolve, reject) => {
      propertyTemplateList(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  search_config(context, body) {
    return new Promise((resolve, reject) => {
      search_config(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  base_delete(context, body) {
    return new Promise((resolve, reject) => {
      base_delete(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  base_entity_detail(context, body) {
    return new Promise((resolve, reject) => {
      base_entity_detail(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  search_id_name(context, body) {
    return new Promise((resolve, reject) => {
      search_id_name(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  partner_search_name(context, body) {
    return new Promise((resolve, reject) => {
      partner_search_name(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  base_config(context, body) {
    return new Promise((resolve, reject) => {
      base_config(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  entity_config(context, body) {
    return new Promise((resolve, reject) => {
      entity_config(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  detailsList(context, body) {
    return new Promise((resolve, reject) => {
      detailsList(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  details_delete(context, body) {
    return new Promise((resolve, reject) => {
      details_delete(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  copyright_detail(context, body) {
    return new Promise((resolve, reject) => {
      copyright_detail(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  detailsUpdate(context, body) {
    return new Promise((resolve, reject) => {
      detailsUpdate(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  insert(context, body) {
    return new Promise((resolve, reject) => {
      insert(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  baseUpdate(context, body) {
    return new Promise((resolve, reject) => {
      baseUpdate(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  entitySearch(context, body) {
    return new Promise((resolve, reject) => {
      entitySearch(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  searchById(context, body) {
    return new Promise((resolve, reject) => {
      searchById(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  productDetailsList(context, body) {
    return new Promise((resolve, reject) => {
      productDetailsList(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  exportDetail(context, body) {
    return new Promise((resolve, reject) => {
      exportDetail(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  bindProduct(context, body) {
    return new Promise((resolve, reject) => {
      bindProduct(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getEntityList(context, body) {
    return new Promise((resolve, reject) => {
      getEntityList(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  addEntityList(context, body) {
    return new Promise((resolve, reject) => {
      addEntityList(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateEntityList(context, body) {
    return new Promise((resolve, reject) => {
      updateEntityList(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  entityDetail(context, body) {
    return new Promise((resolve, reject) => {
      entityDetail(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  delEntity(context, body) {
    return new Promise((resolve, reject) => {
      delEntity(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  refresh(context, body) {
    return new Promise((resolve, reject) => {
      refresh(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  draftDetails_delete(context, body) {
    return new Promise((resolve, reject) => {
      draftDetails_delete(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  draftCopyright_detail(context, body) {
    return new Promise((resolve, reject) => {
      draftCopyright_detail(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  draftDetailsUpdate(context, body) {
    return new Promise((resolve, reject) => {
      draftDetailsUpdate(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  importCopyright(context, body) {
    return new Promise((resolve, reject) => {
      importCopyright(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  importDraftCopyright(context, body) {
    return new Promise((resolve, reject) => {
      importDraftCopyright(body)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
