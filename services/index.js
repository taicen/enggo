// import axios from '@nuxtjs/axios'
import axios from './request'

export default class GenericService {
  constructor({url, name}){
    this.url = url
    this.name = name
  }

  async fetchOne(id){
    try{
      const { data } = await axios.get(`${this.url}/${id}`)
      return data
    }catch(error){
      throw{
        error,
        error: true,
        message: `${this.name} on fetch failed fetchOne`
      }
    }
  }
  async fetchAll(){
    try{
      const {data} = await axios.get(`${this.url}/`)
      return data
    }catch(error){
      throw{
        error,
        error: true,
        message: `${this.name} on fetch failed fetchAll`
      }
    }
  }
  async create(payload){
    try{
      const {data} = await axios.post(`${this.url}/`, payload)
      return data
    }catch(error){
      throw{
        error,
        error: true,
        message: `${this.name} on fetch failed create`
      }
    }
  }
  async update(id,payload){
    try{
      const {data} = await axios.put(`${this.url}/${id}`, payload)
      return data
    }catch(error){
      throw{
        error,
        error: true,
        message: `${this.name} on fetch failed update`
      }
    }
  }
  async delete(id){
    try{
      await axios.delete(`${this.url}/${id}`)
    }catch(error){
      throw{
        error,
        error: true,
        message: `${this.name} on fetch failed delete`
      }
    }
  }
}