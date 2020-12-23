export const state = () => ({
  users: []
})

export const mutations = {
  
}

export const actions = {

  async createUser({commit}, data){
    try {
      await new Promise(resolve => {
        setTimeout(()=>resolve('mock-token'), 2000)
      })
    } catch (e) {}
  }

}

export const getters = {
  users: s => s.users
}