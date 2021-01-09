import jwt_decode from "jwt-decode";

export const state = () => ({
  token: null
})

export const mutations = {
  setToken(state, token){
    state.token = token
  }
}

export const actions = {
  async login({commit, dispatch}, data){
    try {
      const result = await this.$axios.post('auth/login', data)
      if(result.data){
        const { accessToken, refreshToken } = result.data;
        const refreshData = jwt_decode(refreshToken)
        $nuxt.$cookie.set('rf-token', refreshToken, { expires: refreshData.exp })
        dispatch('setToken', { token: accessToken })
      }
    } catch (e) {
      if (e.response) {
        commit('setError', e.response.data.message, {root: true})
      }
    }

  },

  async signup({commit, dispatch}, data){
    try { 
      const result = await this.$axios.post('auth/signup', data)
      if(result.data){
        const { message } = result.data;
        return message
      }
    } catch (e) {
      if (e.response) {
        commit('setError', e.response.data.message, {root: true})
      }
    }
  },

  setToken({commit}, data){
    const { token } = data;
    const tokenData = jwt_decode(token)
    this.$axios.setToken(token, 'Bearer')
    $nuxt.$cookie.set('jwt-token', token, { expires: tokenData.exp })    
    commit('setToken', token)
  },

  async logout({commit}){
    this.$axios.setToken(false)
    $nuxt.$cookie.delete('jwt-token');
    $nuxt.$cookie.delete('rf-token');
    commit('setToken', null)
  },

  async refresh({dispatch}, data){
    try{
      const result = await this.$axios.post('auth/refresh', data)
      if(result.data){
        const { accessToken } = result.data;
        dispatch('setToken', { token: accessToken })
      }
    } catch(e) {
      if (e.response) {
        commit('setError', e.response.data.message, {root: true})
      }
    }
  },

  async autoLogin({dispatch}){
    const accessToken = $nuxt.$cookie.get('jwt-token')
    const refreshToken = $nuxt.$cookie.get('rf-token')

    if(!jwtDecode(accessToken)){
      if($nuxt.$cookie.get('rf-token')){
        console.log('AutoLogin REFRESH')
        const result = await this.$axios.post('auth/refresh', {refreshToken})
        dispatch('setToken', { token: result.data.accessToken })
        return result.data.accessToken
      } else {
        dispatch('logout')
      }
    } else {
      return accessToken
    }
  }
}

export const getters = {
  isAuth: s => Boolean(s.token),
  token: s => s.token
}

function jwtDecode(token){
  if(!token){
    return false
  }
  const jwtData = jwt_decode(token) || {}
  // console.log("%c 🍒: jwtDecode -> jwtData ", "font-size:16px;background-color:#d12c31;color:white;", jwtData)
  const expires = jwtData.exp
  return (new Date().getTime() / 1000) < expires
}