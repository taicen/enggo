export const state = () => ({
  error: null
})

export const mutations = {
  setError(state, error){
    state.error = error
  },
  clearError(state){
    state.error = null
  }
}

export const actions = {
  nuxtServerInit(){
    console.log("%c 🌏: nuxtServerInit -> d ", "font-size:16px;background-color:#a52867;color:white;", 'Init')
  }
}

export const getters = {
  error: s => s.error
}