import store from '../../../store'
import {
  options,
  pro_type,
  MediaRating,
  MediaCodingFormat,
  contentType,
  definition,
  TaskStatus,
  category,
  location,
  priority,
  whether
} from "@/utils/getOptions";
import { entity, entity_exclude_area } from "@/views/ip_media/js/entity";
async function property_conf({ type, platform }) {
  const res = await store.dispatch("property/property_conf", {
    type,
  });
  if (res.code === 0) {
    const data = res.data || {};
    const list = data[type] || [];
    const options = []
    for (const item of list) {
      const obj = {};
      for (const k in item) {
        obj.value = item[k];
        obj.label = k;
        if (type === 'subs') {
          if (obj.value == '10') {
            obj.hint = '我们可以授权给下游使用，但要求下游不可再去授权给它的下游'
          } else if (obj.value == '11') {
            obj.hint = '我们可以授权给下游使用，也允许下游再去授权给其他平台'
          }
        }
      }
      options.push(obj)
    }
    if (type === 'term' && !platform) {
      return options.map((el) => {
        if (el.label !== "电视") {
          el.disabled = true
        }
        return el;
      });
    }
    return options
  }
}
async function partnerTags({ type }) {
  const res = await store.dispatch("partner/partnerTags", {
    type: type,
  });
  if (res.code === 0) {
    const data = res.data || [];
    return data
      .filter((el) => el.category === type)
      .map((item) => {
        return Object.assign({ value: item.id, label: item.tag }, item);
      });
  }
}
async function ip_design_project_config({ type }) {
  const res = await store.dispatch(
    "ip_design/ip_design_project_config",
    { type }
  );
  const type_ = type.toLocaleLowerCase()
  if (res.code === 0) {
    const data = res.data || {};
    const options = [];
    if (['rating', 'sale'].includes(type)) {
      for (const item of data[type_]) {
        options.push({
          value: item,
          label: item,
        });
      }
    } else {
      for (const item of data[type_]) {
        options.push({
          value: Object.keys(item)[0] * 1,
          label: Object.values(item)[0],
        });
      }
    }
    return options
  }
}
async function ip_design_property_conf_purchase({ type }) {
  const data = store.state.ip_design.property_conf_purchase
  const list = data[type.replace('ip_purchase_', '')] || [];
  const options = []
  for (const item of list) {
    const obj = {};
    for (const k in item) {
      obj.value = item[k];
      obj.label = k;
    }
    options.push(obj)
  }
  return options
}
async function ip_design_property_conf_sales({ type }) {
  const data = store.state.ip_design.property_conf_sales
  const list = data[type.replace('ip_sales_', '')] || [];
  const options = []
  for (const item of list) {
    const obj = {};
    for (const k in item) {
      obj.value = item[k];
      obj.label = k;
    }
    options.push(obj)
  }
  return options
}
async function cdnConfig({ type }) {
  const res = await store.dispatch("injector/cdnConfig", {
    type,
  });
  if (res.code === 0) {
    const data = res.data || {};
    const list = data.cdn_work_order[type] || [];
    const options = []
    for (const i in list) {
      options.push({
        label: list[i],
        value: i,
      })
    }
    return options
  }
}
async function search_config({ type }) {
  const res = await store.dispatch(
    "property/search_config",
    { type }
  );
  if (res.code === 0) {
    const data = res.data || {};
    const options = [];
    if (type == 'base_commonly_use' || type == 'base_less_use' || type == 'details_commonly_use' || type == 'details_less_use') {
      const parent = type.indexOf('base_') > -1 ? 'base_show_others' : 'details_show_others'
      const type_ = type.replace('base_' , '').replace('details_' , '')
      for (const i in data[parent][type_]) {
        options.push({
          value: i,
          label: data[parent][type_][i],
        });
      }
    } else {
      type = type.split('rightP_')[1]
      for (const i in data[type]) {
        options.push({
          value: data[type][i].id,
          label: data[type][i].name,
        });
      }
    }
    return options
  }
}

async function onlineProgramsConfig({ type }) {
  const res = await store.dispatch(
    "platform/onlineProgramsConfig",
    { type }
  );
  if (res.code === 0) {
    const data = res.data || {};
    const options = [];
    type = type.split('platform_')[1]
    for (const i in data[type]) {
      options.push({
        value: i,
        label: data[type][i],
      });
    }
    return options
  }
}

// async function base_config({ type }) {
//   const res = await store.dispatch(
//     "property/base_config",
//     { type }
//   );
//   if (res.code === 0) {
//     const data = res.data || {};
//     const options = [];
//     for (const i in data[type]) {
//       options.push({
//         value: i,
//         label: data[type][i],
//       });
//     }
//     return options
//   }
// }

export const actions = {
  userStatus: () => [
    {
      value: 1,
      label: "正常",
    },
    {
      value: 0,
      label: "停用",
    },
  ],
  charge: () => [
    {
      value: 1,
      label: "付费",
    },
    {
      value: 0,
      label: "免费",
    },
  ],
  userRole: async () => {
    const res = await store.dispatch("role/roleGetList", {
      page: 1,
      page_size: 9999,
    });
    if (res.code === 0) {
      const { data = [] } = res || {};
      return data.role_list.map((el) => {
        return Object.assign(el, { value: el.id, label: el.name });
      });
    }
  },
  levelOneMenu: async () => {
    const res = await store.dispatch("role/menuGetFirstList", {});
    if (res.code === 0) {
      const { data = [] } = res || {};
      return data.map((el) => {
        return Object.assign({ value: el.id, label: el.name }, el);
      });
    }
  },
  classify: () => options,
  genre: async () => {
    const res = await store.dispatch("media/imdbGenreAllList", {});
    if (res.code === 0) {
      const { data = [] } = res || {}
      return data.map((el) => {
        return Object.assign({ value: el.id, label: el.name }, el);
      });
    }
  },
  region: async () => {
    const res = await store.dispatch("media/imdbRegionAllList", {});
    if (res.code === 0) {
      const { data = [] } = res || {}
      return data.map((el) => {
        return Object.assign({ value: el.id, label: el.name }, el);
      });
    }
  },
  years: () => {
    const list = [
      { value: "2000-2009", label: "2000年代", leaf: true },
      { value: "1990-1999", label: "1990年代", leaf: true },
      { value: "1980-1989", label: "1980年代", leaf: true },
      { value: "1970-1979", label: "1970年代", leaf: true },
      { value: "1960-1969", label: "1960年代", leaf: true },
      { value: "1950-1959", label: "1950年代", leaf: true },
      { value: "1940-1949", label: "1940年代", leaf: true },
    ];
    var start = 2009;
    for (let i = 0; i <= 20; i++) {
      ++start;
      list.unshift({
        value: `${start}-${start}`,
        label: start,
      });
    }
    return list
  },
  job: () => [
    {
      value: "演员",
      label: "演员",
    },
    {
      value: "歌手",
      label: "歌手",
    },
    {
      value: "导演",
      label: "导演",
    },
    {
      value: "编剧",
      label: "编剧",
    },
    {
      value: "制片人",
      label: "制片人",
    },
    {
      value: "配音",
      label: "配音",
    },
    {
      value: "动作特技",
      label: "动作特技",
    },
  ],
  gender: () => [
    {
      value: "woman",
      label: "女",
    },
    {
      value: "man",
      label: "男",
    },
  ],
  MD: () => [
    {
      value: 1,
      label: "白名单",
    },
    {
      value: 0,
      label: "黑名单",
    },
  ],
  power: property_conf,
  adds: property_conf,
  solo: property_conf,
  subs: property_conf,
  gard: property_conf,
  term: property_conf,
  opes: property_conf,
  usge: property_conf,
  vip: property_conf,
  mod: property_conf,
  ip_purchase_solo: ip_design_property_conf_purchase,
  ip_purchase_subs: ip_design_property_conf_purchase,
  ip_purchase_gard: ip_design_property_conf_purchase,
  ip_sales_solo: ip_design_property_conf_sales,
  ip_sales_subs: ip_design_property_conf_sales,
  ip_sales_gard: ip_design_property_conf_sales,
  radio: () => [
    {
      value: true,
      label: "是",
    },
    {
      value: false,
      label: "否",
    },
  ],
  REGION: async () => {
    const res = await store.dispatch(
      "property/propertyEntityList",
      {}
    );
    if (res.code === 0) {
      const { data = [] } = res || {}
      return data.filter((e) => {
        e.value = e.id;
        e.label = e.abbr;
        return e.type === "REGION" || e.is_all;
      });
    }
  },
  auth_type: async () => {
    return store.state.ip_design.auth_type
  },
  entity: () => entity,
  entity_exclude_area: () => entity_exclude_area,
  pro_type: () => pro_type,
  MediaRating: () => MediaRating,
  MediaCodingFormat: () => MediaCodingFormat,
  contentType: () => contentType,
  definition: () => definition,
  TaskStatus: () => TaskStatus,
  priority: () => priority,
  category: () => category,
  location: () => location,
  archivedType: () => {
    return [
      {
        value: 1,
        label: '归档'
      }
    ]
  },
  licenseType: () => {
    return [
      {
        value: 1,
        label: '授权书'
      },
      {
        value: 2,
        label: '发行许可证'
      },
      {
        value: 3,
        label: '上线通知'
      },
    ]
  },
  diskStatus: async () => {
    const res = await store.dispatch(
      "origin/disk_config",
      {}
    );
    if (res.code === 0) {
      const arr = [];
      for (const i in res.data.add) {
        arr.push({
          disabled: !res.data.add[i].flag,
          value: res.data.add[i].value,
          label: i,
        })
      }
      return arr
    }
  },
  diskStatusAll: async () => {
    const res = await store.dispatch(
      "origin/disk_config",
      {}
    );
    if (res.code === 0) {
      const arr = [];
      for (const i in res.data.all) {
        arr.push({
          disabled: !res.data.all[i].flag,
          value: res.data.all[i].value,
          label: i,
        })
      }
      return arr
    }
  },
  diskStatusEdit: async () => {
    const res = await store.dispatch(
      "origin/disk_config",
      {}
    );
    if (res.code === 0) {
      const arr = [];
      for (const i in res.data.edit) {
        arr.push({
          disabled: !res.data.edit[i].flag,
          value: res.data.edit[i].value,
          label: i,
        })
      }
      return arr
    }
  },
  out_time: () => {
    return [
      {
        value: 7,
        label: '超过7天'
      }, {
        value: 14,
        label: '超过14天'
      }, {
        value: 30,
        label: '超过30天'
      }
    ]
  },
  // diskStatusEdit1: () => {
  //   return actions.diskStatus().filter(e => e.value == 3 || e.value == 4)
  // },
  taskLevel: () => [
    {
      value: 1,
      label: "普通",
    },
    {
      value: 2,
      label: "优先",
    },
    {
      value: 3,
      label: "抢片",
    },
    {
      value: 7,
      label: "定时",
    },
  ],
  batchTaskLevel: () => {
    return actions.taskLevel().filter(e => e.value !== 3 && e.value !== 7)
  },
  onlineOffline: () => [
    {
      value: 1,
      label: "上片",
    },
    {
      value: 0,
      label: "下片",
    },
  ],
  sort: () => [
    {
      value: "asc",
      label: "正序",
    },
    {
      value: "desc",
      label: "倒序",
    },
  ],
  cooperative: async () => {
    const res = await store.dispatch(
      "injector/partnerGetAllList",
      {
        page: 1,
        page_size: 100
      }
    );
    if (res.code === 0) {
      const data = res.data || [];
      return data.map((item) => {
        return Object.assign({ value: item.id, label: item.name }, item);
      });
    }
  },
  cooperative_cdn: async () => {
    const res = await store.dispatch(
      "injector/partnerGetAllList",
      {
        is_cdn: 1
      }
    )
    if (res.code === 0) {
      const data = res.data || [];
      return data.map((item) => {
        return Object.assign({ value: item.id, label: item.name }, item);
      });
    }
  },
  department: async () => {
    const res = await store.dispatch("partner/partnerDepartment", {});
    if (res.code === 0) {
      const data = res.data || [];
      return data.map((item) => {
        return Object.assign({ value: item.id, label: item.title }, item);
      });
    }
  },
  company: async () => {
    const res = await store.dispatch("partner/partnerCompany", {});
    if (res.code === 0) {
      const data = res.data || [];
      return data.map((item) => {
        return Object.assign({ value: item.id, label: item.title }, item);
      });
    }
  },
  PROD: partnerTags,
  BIZ: partnerTags,
  CHAN: partnerTags,
  state: ip_design_project_config,
  tags: ip_design_project_config,
  age_group: ip_design_project_config,
  gender_group: ip_design_project_config,
  GENRE: ip_design_project_config,
  property: ip_design_project_config,
  exclusive: ip_design_project_config,
  biz_mode: ip_design_project_config,
  rating: ip_design_project_config,
  sale: ip_design_project_config,
  ems_company: async () => {
    const res = await store.dispatch("partner/partnerEmsRecord", {
      start: "2020-12-01",
      end: "2020-12-31",
      page: 1,
      page_size: 1,
    });
    if (res && res.code === 0) {
      const options = [];
      const express = res.express || {};
      for (const k in express) {
        options.push({
          value: k,
          label: express[k],
        });
      }
      return options
    }
  },
  storage_type: cdnConfig,
  cdnStatus: () => [
    {
      value: "1",
      label: "上线",
    },
    {
      value: "0",
      label: "下线",
    },
  ],
  seriesStatus: () => [
    {
      value: "0",
      label: "待处理",
    },
    {
      value: "1",
      label: "同步中",
    },
    {
      value: "2",
      label: "失败",
    },
    {
      value: "3",
      label: "完成",
    },
  ],
  mediaExportDays: () => [
    {
      value: 7,
      label: '7天'
    }, {
      value: 30,
      label: '30天'
    }, {
      value: 180,
      label: '180天'
    }, {
      value: 365,
      label: '一年'
    }, {
      value: 0,
      label: '全部'
    }
  ],
  mediaSyncStatus: () => [
    {
      value: 0,
      label: '未同步'
    }, {
      value: 1,
      label: '已同步'
    }
  ],
  vCode: async () => {
    const res = await store.dispatch(
      "origin/meta_video_codec",
    );
    if (res.code === 0) {
      const data = res.data || {};
      return data.map((item) => {
        return Object.assign({ value: item.v_codec, label: item.v_codec }, item);
      });
    }
  },
  rightP_type: search_config,
  rightP_status_label: search_config,
  rightP_authorized_area: search_config,
  rightP_authorized_way: search_config,
  rightP_copyright_chain: search_config,
  rightP_entity_category: search_config,
  rightP_entity: search_config,
  rightP_with_granted: search_config,
  rightP_extra: search_config,
  rightP_terminals: search_config,
  rightP_item_status: search_config,
  base_commonly_use: search_config,
  base_less_use: search_config,
  details_commonly_use: search_config,
  details_less_use: search_config,
  rightP_buyer_company: search_config,
  rightP_item_level: search_config,
  rightP_definition: search_config,
  rightP_editing_program: search_config,
  rightP_vip_pay: search_config,
  whether: () => whether,

  platform_type: onlineProgramsConfig,
  platform_cooperation_type: onlineProgramsConfig,
  platform_plan_type: onlineProgramsConfig,
  platform_service_operator: onlineProgramsConfig,
  platform_onOffline_status: () => [
    {
      value: 1,
      label: '已上线'
    }, {
      value: 2,
      label: '已下线'
    }
  ],

  default: () => []
};

