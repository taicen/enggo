<template>
<div>
  <h1 v-if="isAdd">Добавление публикации</h1>
  <h1 v-else>Редактирование публикации</h1>

  <UiField 
    v-model="product.title"
    placeholder=""
    label="Название"
  />

  <UiField
    type="textarea" 
    v-model="product.anons"
    placeholder=""
    label="Анонс"
  />
  
  <div class="form-group">
    <label>
      Описание
      <vue-editor v-model="post.text"></vue-editor>
    </label>
  </div>
  <div class="form-group">
    <label for="">
      Дата
      <v-date-picker v-model="product.date">
        <template v-slot="{ inputValue, inputEvents }">
          <input
            class="field bg-white border px-2 py-1 rounded"
            :value="inputValue"
            v-on="inputEvents"
          />
        </template>
      </v-date-picker>
    </label>
  </div>
  <div class="form-group">
    <label for="">
      Постер
      <Dropzone v-model="file" :dataFile="product.imageUrl" ref-name="posterDropzone"/>
    </label>
  </div>
  <div class="form-group form-group--btn">
    <button class="btn" @click="send">Сохранить</button>
  </div>
</div>
</template>

<script>
import UiField from '~/components/moleculus/Field'
import Dropzone from '~/components/moleculus/Dropzone'
import { VueEditor } from "vue2-editor";
// import { VueDatePicker } from '@mathieustan/vue-datepicker';


import { required } from 'vuelidate/lib/validators';
import {mapActions, mapGetters} from 'vuex'

const post = {
  title: '',
  date: new Date(),
  category: '',
  anons: '',
  text: '',
  poster: ''
}

export default {
  components: {
    UiField,
    VueEditor,
    Dropzone
    // VueDatePicker
  },
  data:()=>({
    post: {...post},
    file: null    
  }),
  validations:{
    post: {
      title: { required },
      // anons: { required }
    }
  },
  mounted(){
    console.log("%c 🖊️: mounted -> this.$parent.post ", "font-size:16px;background-color:#686bac;color:white;", this)
    // this.post = this.$parent.post || { ...post }
    this.fetchProduct(this.$route.params.add)
  },
  computed: {
    // ...mapGetters({
    //   product: 'products/item'
    // }),
    product(){
      return this.$store.getters['products/item']
    },
    isAdd(){
      return this.$route.params.add === 'add'
    }
  },
  methods: {
    ...mapActions({
      'fetchProduct': 'products/fetchOne'
    }),
    async send(){
      this.$v.$touch();
      if(!this.$v.$invalid){
        this.$store.dispatch('loader/show')

        const res = this.isAdd ? 
          await this.$store.dispatch('post/create', {...this.post, file: this.file}) :
          await this.$store.dispatch('post/update', {...this.post, file: this.file})

        if(res){
          this.isAdd ? this.$toast.success('Запись добавлена!') : this.$toast.success('Запись обновлена!')
        }

        this.$store.dispatch('loader/hide')
      }
    }
  }
}
</script>