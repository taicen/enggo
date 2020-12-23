export const state = () => ({
  isLoader: false
})

export const mutations = {
  setLoader(state, value){
    state.isLoader = value
  }
}

export const actions = {
  show({commit}){
    commit('setLoader', true)
  },
  hide({commit}){
    commit('setLoader', false)
  }
}

export const getters = {
  loader: s => s.isLoader
}