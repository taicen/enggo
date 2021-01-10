const posts = [
  {
    id: 1,
    title: 'How to Use SVG Sprites with NuxtJS',
    date: '11.11.2012',
    category: 'Блог'
  },
  {
    id: 2,
    title: 'Люди на полном серьёзе обсуждают, куда валить из Америки',
    date: '11.11.2012',
    category: 'Блог'
  },
  {
    id: 3,
    title: 'Банкротство Арабского мира: кто виноват и что делать?',
    date: '11.11.2012',
    category: 'Блог'
  },
  {
    id: 4,
    title: 'Президентская гонка в США подошла к финалу',
    date: '11.11.2012',
    category: 'Блог'
  },
  {
    id: 5,
    title: 'Особенно на руку демократам сыграл провал Трампа в борьбе с COVID-19.',
    date: '11.11.2012',
    category: 'Блог'
  },
];

import {formUrlencodeBuilder, formDataBuilder} from '~/helpers'

export const state = () => ({
  posts: []
})

export const mutations = {}

export const actions = {

  async getPosts({}){
    return await this.$axios.get(`products`)
  },

  async remove({}, id){
    await new Promise(resolve => {
      setTimeout(()=>resolve(), 1000)
    })
  },

  async getPostById({}, id){
    return await new Promise(resolve => {
      setTimeout(()=>resolve(posts.find(p => p.id === parseInt(id))), 1000)
    })
  },

  async update({}, {data, id}){
    console.log("%c 🥌: update -> data ", "font-size:16px;background-color:#ecf31e;color:black;", data)
    // const formData = formUrlencodeBuilder(data)
    const formData = formDataBuilder(data)
    return await this.$axios.put(`products/${id}`, formData)
  },

  async create({}, data){
    console.log("%c 🥌: update -> data ", "font-size:16px;background-color:#ecf31e;color:black;", data)
    const formData = formDataBuilder(data)    
    return await this.$axios.post(`products`, formData)
  }

}

export const getters = {
  posts: s => s.posts
}