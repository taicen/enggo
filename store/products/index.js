import crudStore from '../generic'

export default {
  ...crudStore({
    url: 'products',
    name: 'Products'
  })
}