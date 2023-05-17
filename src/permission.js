import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, getStorage } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { menuGetList } from '@/utils/getMenuList'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
if (!getStorage('userInfo')) {
  store.dispatch('user/resetToken')
}
if (getToken()) {
  menuGetList()
}
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  if (!getStorage('userInfo')) {
    store.dispatch('user/resetToken')
  }
  const hasToken = getToken()

  if (hasToken) {
    store.dispatch('user/getInfo')
    if (to.meta.menu_id) {
      const res = await store.dispatch('role/roleGetPerm', {
        menu_id: to.meta.menu_id,
      })
      if (res.code === 0) {
        store.commit('user/SET_ROLES', res.data || [])
      } else {
        store.commit('user/SET_ROLES', [])
      }
    } else {
      store.commit('user/SET_ROLES', ["add", "edit", "view", "delete"])
    }

    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      next()
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

