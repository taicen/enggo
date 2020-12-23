<template>
<div>
  <h1>Добавление пользователя</h1>
  <UiField 
    type="email"
    v-model="email"
    placeholder="Email"
    :is-error="$v.email.$error"
    :is-success="!$v.email.$invalid && !$v.email.$required"
  >
    <UiErrorText v-if="$v.email.$error">Обязательно к заполнению</UiErrorText>
  </UiField>
  <UiField 
    type="password"
    v-model="password"
    placeholder="Пароль"
    :is-error="$v.password.$error"
    :is-success="!$v.password.$invalid && !$v.password.$required"
  >
    <UiErrorText v-if="$v.password.$error">Обязательно к заполнению</UiErrorText>
  </UiField>
  <div class="form-group form-group--btn">
    <button class="btn" @click="create">Создать</button>
  </div>
</div>
</template>

<script>
import UiErrorText from '~/components/atoms/ErrorText'
import UiField from '~/components/moleculus/Field'

import { required } from 'vuelidate/lib/validators';

export default {
  components: {
    UiField,
		UiErrorText,
  },
  data: ()=>({
    email: '',
		name: '',
		password: ''
  }),
  validations:{
		email: { required },
		password: { required },
  },
  methods: {
    async create(){
			this.$v.$touch();
      
      const data = {
				email: this.email,
				password: this.password
      }

      if(!this.$v.$invalid){
        this.$store.dispatch('loader/show');
        await this.$store.dispatch('user/createUser', data);
        this.$store.dispatch('loader/hide');
        this.$toast.success('Новый пользователь создан')
        this.email = '';
        this.password = '';
        this.$v.$reset();
      }
		}
	},
}
</script>