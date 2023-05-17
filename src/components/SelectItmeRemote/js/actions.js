import store from '../../../store'
import { Message } from 'element-ui'
export const actions = {
  longhair: async ({ query }) => {
    const res = await store.dispatch("media/imdbSearchCelebrity", {
      wd: query.trim(),
      page: 1,
      page_size: 999,
    });
    if (res.code === 0) {
      // const data = (res.data && res.data.celebrity_list) || [];
      const { celebrity_list: data = [] } = res.data
      const options = data.map((el) => {
        return Object.assign({ value: el.id, label: el.name }, el);
      });
      return {
        options,
      }
    }
  },
  diversity: async ({ query, media_id }) => {
    if (!media_id) {
      return Message.warning("请输入媒体");
    }
    if (!query.trim()) {
      return;
    }
    const res = await store.dispatch("injector/imdbSearchEpisode", {
      serial_num: query.trim(),
      media_id: media_id,
    });
    if (res.code === 0) {
      const data = res.data || [];
      const options = data.map((el) => {
        return Object.assign({ value: el.id, label: el.serial_num }, el);
      });
      return {
        options,
      }
    }
  },
  checkMovie: async ({ query }) => {
    if (!query.trim()) {
      return;
    }
    const res = await store.dispatch("media/imdbSearch", {
      name: query.trim(),
      page: 1,
      page_size: 9999,
    });
    if (res.code === 0) {
      const data = (res.data && res.data.media_list) || [];
      const options = data.map((el) => {
        return Object.assign({ value: el.id, label: el.name }, el);
      });
      return {
        options,
      }
    }
  },
  mediaInfo: async ({ query }) => {
    const id = query.trim();
    if (!id) {
      return;
    }
    const res = await store.dispatch("property/propertyMediaMatch", {
      id,
    });
    if (res.code === 0) {
      const data = res.data || [];
      const options = data.map((el) => {
        return Object.assign(el, {
          value: el.mid,
          label: el.title,
          con_id: id,
        });
      });
      return {
        options,
      }
    }
  },
  ipInfo: async ({ query }) => {
    const keyword = query.trim();
    const res = await store.dispatch("ip_design/ip_design_ip", {
      keyword,
    });
    const { code, data = [] } = res;
    if (code == 0) {
      const options = data.map((el) => {
        return {
          value: el._id,
          label: el.title,
        };
      });
      return {
        options,
      }
    }
  },
  saleMediaInfo: async ({ query }) => {
    const id = query.trim();
    if (!id) {
      return;
    }
    const res = await store.dispatch("property/saleMediaMatch", {
      id: id,
    });
    if (res.code === 0) {
      const data = res.data || [];
      const options = data.map((el) => {
        return Object.assign(el, {
          value: el.mid,
          label: el.title,
          con_id: id,
        });
      });
      return {
        options,
      }
    }
  },
  company: async ({ query, page, limit }) => {
    const res = await store.dispatch("partner/partnerCompany", {
      wd: query.trim(),
      page: page,
      page_size: limit,
    });
    if (res.code === 0) {
      const data = res.data || [];
      const total = res.total_pages * limit;
      const options = data.map((el) => {
        return Object.assign({ value: el.id, label: el.title }, el);
      });
      return {
        options,
        total
      }
    }
  },
  staff: async ({ query, page, limit }) => {
    const res = await store.dispatch("role/userSearch", {
      wd: query.trim(),
      page: page,
      page_size: limit,
    });
    if (res.code === 0) {
      const data = (res.data && res.data.user_list) || [];
      const total = res.data.total_page * limit;
      const options = data.map((el) => {
        return Object.assign({ value: el.id, label: el.name }, el);
      });
      return {
        options,
        total
      }
    }
  },
  buyer: async ({ query, page, limit }) => {
    const res = await store.dispatch("role/userSearch", {
      wd: query.trim(),
      page: page,
      page_size: limit,
    });
    if (res.code === 0) {
      const data = (res.data && res.data.user_list) || [];
      const total = res.data.total_page * limit;
      const options = data.map((el) => {
        return { value: el.real_name, label: el.real_name };
      });
      return {
        options,
        total
      }
    }
  },
  productMedia: async ({ query }) => {
    if (!query.trim()) {
      return;
    }
    const res = await store.dispatch("origin/productMediaSearch", {
      wd: query.trim(),
      page: 1,
      page_size: 9999,
    });
    if (res.code === 0) {
      const data = (res && res.data) || [];
      const options = data.map((el) => {
        return Object.assign({ value: el.id, label: el.name }, el);
      });
      return {
        options,
      }
    }
  },
  searchMedia: async ({ query }) => {
    if (!query.trim()) {
      return;
    }
    const res = await store.dispatch("media/search_media", {
      wd: query.trim(),
      // page: 1,
      // page_size: 9999,
    });
    if (res.code === 0) {
      const data = (res && res.data) || [];
      const options = data.map((el) => {
        return Object.assign({ value: el.id, label: '(' + el.id + ')' + el.name }, el);
      });
      return {
        options,
      }
    }
  },
  search_id_name: async ({ query }) => {
    if (!query.trim()) {
      return;
    }
    const res = await store.dispatch("property/search_id_name", {
      name: query.trim(),
      // page: 1,
      // page_size: 9999,
    });
    if (res.code === 0) {
      const data = (res && res.data) || [];
      const options = data.map((el) => {
        return Object.assign({ value: el.id, label: el.id + ' - ' + el.name }, el);
      });
      return {
        options,
      }
    }
  },
  partner_search_name: async ({ query }) => {
    if (!query.trim()) {
      return;
    }
    const res = await store.dispatch("property/partner_search_name", {
      name: query.trim(),
      // page: 1,
      // page_size: 9999,
    });
    if (res.code === 0) {
      const data = (res && res.data) || [];
      const options = data.map((el) => {
        return Object.assign({ value: el.id, label: el.name }, el);
      });
      return {
        options,
      }
    }
  },
}
