/* eslint-disable */
// import Layout from "@/layout";
import store from '@/store'
import router, { resetRouter } from "@/router";
// import { asyncRouter } from '@/router/asyncRouter'

// function filterAsyncRouter(asyncRouterMap) {
//   const assessedRouters = asyncRouterMap.filter(route => {
//     route.title = route.name
//     route.path = route.url;
//     route.name = route.url.slice(1).split('/').slice(-1)[0];
//     route.meta = {
//       title: route.title,
//       icon: route.ico_url,
//       menu_id: route.id
//     }
//     if (!route.parent) {
//       route.component = Layout;
//       route.alwaysShow = true;
//     } else {
//       route.component = asyncRouter[route.url] || asyncRouter['404'];
//     }
//     delete route.create_time
//     delete route.ico_url
//     delete route.title
//     delete route.seq_num
//     delete route.url
//     delete route.parent
//     delete route.id
//     if (route.second_menu_list && route.second_menu_list.length) {
//       route.redirect = route.second_menu_list[0].url
//       route.children = filterAsyncRouter(route.second_menu_list)
//       delete route.second_menu_list
//     }
//     return true
//   })
//   return assessedRouters
// }

export async function menuGetList() {
  const routes = [];
  resetRouter();
  const accessRoutes = await store.dispatch('permission/generateRoutes', routes.concat([{ path: '*', redirect: '/404', hidden: true }]), { root: true });
  router.addRoutes(accessRoutes);
}
// export function menuGetList() {
//   let routes = [];
//   return new Promise((resolve, reject) => {
//     (async () => {
//       const res = await store.dispatch("role/menuGetList", {})
//       const { code, data = [] } = res || {}
//       if (code === 0) {
//         routes = filterAsyncRouter(data)
//         resetRouter();
//         const accessRoutes = await store.dispatch('permission/generateRoutes', routes.concat([{ path: '*', redirect: '/404', hidden: true }]), { root: true })
//         router.addRoutes(accessRoutes);
//         resolve(routes)
//       } else {
//         reject()
//       }
//     })()
//   })
// }