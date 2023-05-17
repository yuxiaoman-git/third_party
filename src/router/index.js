import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login-new/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/error',
    component: Layout,
    // name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    hidden: true,
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        // name: 'Page401',
        meta: { title: '401', noCache: true }
      },
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/profile',
    hidden: true
    // children: [
    //   {
    //     path: 'home',
    //     component: () => import('@/views/dashboard/index'),
    //     name: 'Home',
    //     meta: { title: '首页', icon: 'dashboard', affix: true }
    //   }
    // ]
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/home',
  //   children: [
  //     {
  //       path: 'home',
  //       component: () => import('@/views/dashboard/index'),
  //       name: 'Home',
  //       meta: { title: '首页', icon: 'dashboard', affix: true }
  //     }
  //   ]
  // },
  {
    name: "contentManage",
    path: "/contentManage",
    component: Layout,
    redirect: "/contentManage/mediaResource",
    alwaysShow: true,
    meta: {
      icon: "el-icon-s-data",
      title: "媒资管理",
    },
    children: [
      {
        name: "mediaResource",
        path: "/contentManage/mediaResource",
        component: () =>
          import("@/views/contentManage/mediaResource"),
        meta: {
          title: "媒体管理",
        }
      },
      {
        name: "diversityManage",
        path: "/contentStorage/diversityManage",
        component: () =>
          import("@/views/contentStorage/diversityManage"),
        meta: {
          title: "分集管理",
        }
      }
    ]
  },
  {
    name: "contentStorage",
    path: "/contentStorage",
    component: Layout,
    redirect: "/contentStorage/materialManage",
    alwaysShow: true,
    meta: {
      icon: "el-icon-film",
      title: "影片管理",
    },
    children: [
      {
        name: "materialManage",
        path: "/contentStorage/materialManage",
        component: () =>
          import("@/views/contentStorage/materialManage"),
        meta: {
          title: "影片库",
        }
      },
      {
        name: "injectManage",
        path: "/contentStorage/injectManage",
        component: () =>
          import("@/views/contentStorage/injectManage"),
        meta: {
          title: "介质注入",
        }
      },
      {
        name: "injectSeries",
        path: "/contentStorage/injectSeries",
        component: () =>
          import("@/views/contentStorage/injectSeries"),
        meta: {
          title: "剧头注入",
        }
      },
      {
        name: "timingList",
        path: "/contentStorage/timingList",
        component: () =>
          import("@/views/contentStorage/timingList"),
        meta: {
          title: "定时列表",
        }
      },
      {
        name: "media",
        path: "/contentStorage/media",
        component: () =>
          import("@/views/contentStorage/media"),
        meta: {
          title: "平台节目",
        }
      },
    ]
  },
  {
    path: '/change-password',
    component: Layout,
    redirect: '/change-password/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/change-password/index'),
        name: 'ChangePassword',
        meta: { title: '修改密码' }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人信息', icon: 'user', noCache: true }
      },
      {
        path: 'upload',
        component: () => import('@/views/profile/upload'),
        name: 'upload',
        meta: { title: '上传测试', noCache: true }
      },
    ]
  },
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: '权限管理',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: '菜单管理',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: '角色管理',
  //       }
  //     },
  //     {
  //       path: 'user',
  //       component: () => import('@/views/permission/user'),
  //       name: 'User',
  //       meta: {
  //         title: '用户管理',
  //       }
  //     }
  //   ]
  // },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
