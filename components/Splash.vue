<template>
  <div class="b-container container" :class="{'right-panel-active': isToggle}">
	<Loader v-if="loader"/>
	<section class="form-container sign-up-container">
		<div class="form">
			<UiTitle type="h1" :classes="['title']">Регистрация</UiTitle>
      <UiText :classes="['text--second-color text--small']">используйте свой email для регистрации</UiText>
      <div class="form-group">
				<UiField v-model="name" placeholder="Имя"/>
				<UiField 
					type="email"
					v-model="email"
					placeholder="Email"
					:is-error="$v.email.$error"
					:is-success="!$v.email.$error"
				>
					<UiErrorText v-if="$v.email.$error">Обязательно к заполнению</UiErrorText>
				</UiField>
				<UiField
					type="password"
					v-model="password"
					placeholder="Пароль"
					:is-error="$v.password.$error"
					:is-success="!$v.password.$error"
				>
					<UiErrorText v-if="$v.password.$error">Обязательно к заполнению</UiErrorText>
				</UiField>
      </div>
			<button class="btn" @click="register">Отправить</button>
		</div>
	</section>
	<section class="form-container sign-in-container">
		<div class="form">
			<UiTitle type="h1" :classes="['title']">Войти</UiTitle>
			<UiText :classes="['text--second-color text--small']">используйте свой аккаунт</UiText>
      <div class="form-group">
        <UiField 
					type="email" 
					v-model="email" 
					placeholder="Email" 
					:is-error="$v.email.$error" 
					:is-success="!$v.email.$error"
				>
					<UiErrorText v-if="$v.email.$error">Обязательно к заполнению</UiErrorText>
				</UiField>
        <UiField 
					type="password" 
					v-model="password" 
					placeholder="Пароль" 
					:is-error="$v.password.$error" 
					:is-success="!$v.password.$error"
				>
					<UiErrorText v-if="$v.password.$error">Обязательно к заполнению</UiErrorText>
				</UiField>
      </div>
			<a href="#">Забыли пароль?</a>
      <div class="form-group form-group--btn">
			  <button class="btn" @click="login">Войти</button>
      </div>
		</div>
	</section>
	<section class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<UiTitle>Добро пожаловать!</UiTitle>
				<UiText inverse>Чтобы оставаться на связи с нами, войдите, указав свою личную информацию</UiText>
        <div class="form-group form-group--btn">
          <button class="btn btn--ghost-inverse" @click="toggleForm">Авторизация</button>
        </div>
			</div>
			<div class="overlay-panel overlay-right">
				<UiTitle>Приветсвую, Вас!</UiTitle>
				<UiText inverse>Введите свои личные данные и начните путешествие с нами</UiText>
        <div class="form-group form-group--btn">
          <button class="btn btn--ghost-inverse" @click="toggleForm">Регистрация</button>
        </div>
			</div>
		</div>
	</section>
</div>
</template>

<script>
import UiText from '~/components/atoms/Text'
import UiTitle from '~/components/atoms/Title'
import UiErrorText from '~/components/atoms/ErrorText'
import Loader from '~/components/atoms/Loader'
import UiField from '~/components/moleculus/Field'

import { required } from 'vuelidate/lib/validators';

export default {
  components:{
    UiText,
    UiTitle,
		UiField,
		UiErrorText,
		Loader
  },
  data: () => ({
		isToggle: false,
		loader: false,
		email: '',
		name: '',
		password: ''
	}),
	validations:{
		email: { required },
		password: { required },
	},
  methods: {
    toggleForm(){
      this.isToggle = !this.isToggle
    },
    async login(){
			this.$v.$touch();

			if(!this.$v.$invalid){
				this.loader = true;
				const data = {
					email: this.email,
					password: this.password
				}
				await this.$store.dispatch('auth/login', data);
				this.loader = false;
				if (this.$store.getters['auth/isAuth']){
					this.$router.push('/admin');
				}
			}
		},
		register(){
			this.$v.$touch();
			if(!this.$v.$invalid){
				// this.loader = true;
				const data = {
					name: this.name,
					email: this.email,
					password: this.password
				}
			}
		}
	},
	mounted(){
		const {message} = this.$route.query
		switch(message){
			case 'login':
				this.$toast.info('Необходимо войти в систему')
				break
			case 'logout':
				this.$toast.success('Вы успешно вышли')
				break
		}
	}
}
</script>

<style lang="scss">

.container {
	/* background-color: #fff; */
	/* border-radius: 10px; */
  /* box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22); */
	position: relative;
	overflow: hidden;
	/* width: 768px; */
	max-width: 100%;
	// min-height: 480px;
  border: 10px solid #fff;

  &.right-panel-active {

    .overlay-container {
	    transform: translateX(-100%);
    }

    .sign-in-container {
      transform: translateX(100%);
    }

    .sign-up-container {
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
      animation: show 0.6s;
    }

    .overlay {
      transform: translateX(50%);
    }

    .overlay-left {
      transform: translateX(0);
    }

    .overlay-right {
      transform: translateX(20%);
    }
  }
}

.form-container {
	position: absolute;
	top: 0;
	height: 100%;
	transition: all 0.6s ease-in-out;
}

.sign-in-container {
	left: 0;
	width: 50%;
	z-index: 2;
}

.sign-up-container {
	left: 0;
	width: 50%;
	opacity: 0;
	z-index: 1;
}

@keyframes show {
	0%, 49.99% {
		opacity: 0;
		z-index: 1;
	}
	
	50%, 100% {
		opacity: 1;
		z-index: 5;
	}
}

.overlay-container {
	position: absolute;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
	transition: transform 0.6s ease-in-out;
	z-index: 100;
}

.overlay {
	background: $color-accent;
	background: -webkit-linear-gradient(to right, $color-accent, $color-accent-light);
	background: linear-gradient(to right, $color-accent, $color-accent-light);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 0 0;
	color: $color-light;
	position: relative;
	left: -100%;
	height: 100%;
	width: 200%;
  transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.overlay-panel {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 40px;
	text-align: center;
	top: 0;
	height: 100%;
	width: 50%;
	transform: translateX(0);
	transition: transform 0.6s ease-in-out;
}

.overlay-left {
	transform: translateX(-20%);
}

.overlay-right {
	right: 0;
	transform: translateX(0);
}

</style>
