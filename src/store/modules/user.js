import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    // 角色
    roles: [],
    // 相应路由
    routes: [],
    // 相应按钮
    buttons: [],
  }
}

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  // 角色
  roles: [],
  // 相应路由
  routes: JSON.parse(sessionStorage.getItem('routes')) || [],
  // 相应按钮
  buttons: [],
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.name = userInfo.name
    state.avatar = userInfo.avatar

    state.routes = userInfo.routes
    sessionStorage.setItem('routes', JSON.stringify(userInfo.routes))

    state.buttons = userInfo.buttons
    sessionStorage.setItem('buttons', JSON.stringify(userInfo.buttons))

    state.roles = userInfo.roles

  },

}

const actions = {
  // user login--token
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    let result = await login({ username: username.trim(), password: password })
    if (result.code === 20000) {
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      return Promise.resolve('ok')
    } else {
      return Promise.reject(result.message)
    }
  },


  // get user info-->存储数据(返回permission.js继续执行)
  async getInfo({ commit, state }) {
    let result = await getInfo(state.token)   // request请求-->api/acl/user.js
    if (result.code == 20000) {
      const { data } = result   // 用户信息
      if (!data) {
        reject('Verification failed, please Login again.')
      }
      // 登录后拿到用户的路由权限 result.data.routes，存储于vuex中
      commit('SET_USERINFO', data)

      return Promise.resolve(data)
    } else {
      return Promise.reject(result.message)
    }
  },


  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        // 重置路由
        // resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

