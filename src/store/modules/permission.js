import { constantRoutes } from '@/router'
import Layout from '@/layout'
import sysMenuApi from '@/api/sys-menu'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.component) {
    // Layout组件特殊处理
      if (tmp.component === 'Layout') {
        tmp.component = Layout
      } else {
        tmp.component = loadView(route.component)
      }
    }
    if (tmp.children && tmp.children[0]) {
      tmp.children = filterAsyncRoutes(tmp.children)
    }
    res.push(tmp)
  })

  return res
}

export const loadView = (view) => { // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve)
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }) {
    return new Promise(resolve => {
      sysMenuApi.getRouters().then(res => {
        // console.log(asyncRoutes, res.data)
        const accessedRoutes = filterAsyncRoutes(res.data)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
