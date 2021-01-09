<template>
<section>
  <header class="section__head">
    <UiText :classes="['test text--second-color text--bold text--upper']">Раздел управления публикацей</UiText>
    <UiTitle v-if="isAdd" type="h1" :classes="['title']">Добавление публикации</UiTitle>
    <UiTitle v-else type="h1" :classes="['title']">Редактирование публикации</UiTitle>
  </header>

  <UiField 
    v-model="post.title"
    label="Название"
  />

  <UiField
    type="textarea" 
    v-model="post.anons"
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
      <v-date-picker v-model="post.date">
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
      <Dropzone v-if="!isAdd && post.imageUrl" v-model="file" :dataFile="post.imageUrl" ref-name="posterDropzone"/>
      <Dropzone v-else v-model="file" ref-name="posterDropzone"/>
    </label>
  </div>
  <div class="form-group form-group--btn">
    <button class="btn" @click="send">Сохранить</button>
  </div>
</section>
</template>

<script>
import UiText from '~/components/atoms/Text'
import UiTitle from '~/components/atoms/Title'
import UiField from '~/components/moleculus/Field'
import Dropzone from '~/components/moleculus/Dropzone'
import { VueEditor } from "vue2-editor";
// import { VueDatePicker } from '@mathieustan/vue-datepicker';


import { required } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex'

const POST = {
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
    Dropzone,
    UiText,
    UiTitle
    // VueDatePicker
  },
  data:()=>({
    post: { ...POST },
    file: null    
  }),
  validations:{
    post: {
      title: { required },
      // anons: { required }
    }
  },
  async mounted(){
    // this.post = this.$parent.post || { ...post }
    if(!this.isAdd){
      await this.fetchProduct(this.$route.params.add)
      this.post = this.product
    }
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