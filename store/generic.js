import GenericService from '@/services'

const crudStore = ({name, url}) => {
  const genericService = new GenericService({
    name,
    url
  })

  return {
    state: ()=>({
      item: {},
      items: [],
      itemError: ''
    }),
    actions: {
      async fetchAll({commit}){
        try{
          const items = await genericService.fetchAll()
          commit('fetchItems', items)
        }catch(error){
          commit('fetchItemsFail', {
            errType: `${name} fetchAll failed`
          })
        }
      },
      async fetchOne({commit}, id){
        try{
          const item = await genericService.fetchOne(id)
          commit('fetchItem', item)
        }catch(error){
          commit('fetchItemFail', {
            errType: `${name} fetchOne failed`
          })
        }
      },
      async create({commit}, payload){
        try{
          const item = await genericService.create(payload)
          commit('create', item)
        }catch(error){
          commit('createFail', {
            errType: `${name} create failed`
          })
        }
      },
      async update({commit}, {data, id}){
        try{
          const item = await genericService.update(id, data)
          commit('update', item)
        }catch(error){
          commit('updateFail', {
            errType: `${name} update failed`
          })
        }
      },
      async delete({commit}, id){
        try{
          const item = await genericService.delete(id)
          commit('delete', item)
        }catch(error){
          commit('deleteFail', {
            errType: `${name} delete failed`
          })
        }
      }
    },
    mutations: {
      update(state, item){
        state.item = item
      },
      updateFail(state, error){
        state.itemError = error
      },

      create(state){
        state.item = item
      },
      createFail(state, error){
        state.itemError = error
      },

      fetchItem(state, item){
        state.item = item
      },
      fetchItemFail(state, error){
        state.itemError = error
      },

      fetchItems(state, items){
        state.items = items
      },
      fetchItemsFail(state, error){
        state.itemError = error
      },

      deleteItem(state){},
      deleteItemFail(state, error){
        state.itemError = error
      }
    },
    getters: {
      item: s => s.item,
      items: s => s.items,
      itemError: s => s.itemError,
    }
  }
}

export default crudStore