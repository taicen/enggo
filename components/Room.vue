<template>
  <div class="b-container container">
    <div class="enter-form">
      <picture class="logo">
        <img src="/logo.png" alt="enggo" />
      </picture>

      <UiField
        type="phone"
        label="Введите номер телефона"
        mask="+7 (###) ###-##-##"
        @keyup.enter="enterRoom"
      />

      <div class="link-room" v-if="link">
        <p><strong>Ваша ссылка приглашение:</strong></p>
        <p class="txt-wrap">{{ composeLink }}</p>
        <button
          @click="clipboard"
          :data-clipboard-text="composeLink"
          class="btn copy-room"
        >
          Скопировать и перейти
        </button>
      </div>

      <div class="link-room" v-if="link === null">
        <p><strong>Ваш учитель пришлет вам ссылку приглашение</strong></p>
        <!-- <p>{{ link }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
// import UiText from '~/components/atoms/Text'
// import UiTitle from '~/components/atoms/Title'
// import UiErrorText from '~/components/atoms/ErrorText'
// import Loader from '~/components/atoms/Loader'
import UiField from '~/components/moleculus/Field'

// import { required, email, minLength } from 'vuelidate/lib/validators'

import { formUrlencodeBuilder } from '../helpers'

import { jwtDecode } from '../store/auth'
import jwt_decode from 'jwt-decode'
import ClipboardJS from '../plugins/clipboard.min'
// import db from '../data/db.json'

export default {
  components: {
    // UiText,
    // UiTitle,
    UiField,
    // UiErrorText,
    // Loader,
  },
  data: () => ({
    isToggle: false,
    loader: false,
    phone: '',
    link: '',
  }),
  validations: {},
  mounted() {
    // console.log(
    //   '%c 👨‍👦‍👦: mounted -> this ',
    //   'font-size:16px;background-color:#b6446b;color:white;',
    //   this.$attrs.token
    // )
  },
  computed: {
    composeLink() {
      return `${process.env.baseUrl}/${this.link}`
    },
  },
  methods: {
    async generateRoom(phonenumber) {
      const user = await this.$axios.post(
        '/customer/generate',
        formUrlencodeBuilder({
          phone: phonenumber,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )

      if (jwtDecode(user.data.accessToken)) {
        this.link = 'room/' + user.data.accessToken
        this.$cookie.set('teacher', user.data.accessToken, { expires: '2h' })
      } else {
        const jwtData = jwt_decode(user.data.accessToken)
        // console.log(
        //   '%c 🇮🇶: generateRoom -> jwtData ',
        //   'font-size:16px;background-color:#4d5b47;color:white;',
        //   jwtData
        // )
        await this.$axios.post(
          '/customer/clearroom',
          formUrlencodeBuilder({ link: jwtData.link })
        )
        await this.generateRoom(phonenumber)
      }
    },

    clipboard() {
      const copyText = new ClipboardJS('.copy-room')

      copyText.on('success', (e) => {
        console.info('Action:', e.action)
        console.info('Text:', e.text)
        console.info('Trigger:', e.trigger)

        e.clearSelection()
        this.$router.push(this.link)
      })
    },

    async enterRoom(event) {
      const phonenumber = '+' + event.target.value.match(/\d/g).join('')

      try {
        //https://scholarships.s20.online/v2api/2/teacher/index
        const myHeaders = new Headers()
        myHeaders.append('X-ALFACRM-TOKEN', this.$attrs.token)
        myHeaders.append('Content-Type', 'application/json')

        const raw = JSON.stringify({
          phone: phonenumber,
        })
        // const raw = `{\n"phone": "${phonenumber}"\n}`

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        }

        const teacher = await fetch(
          process.env.prod
            ? 'https://scholarships.s20.online/v2api/2/teacher/index'
            : 'https://cors-anywhere.herokuapp.com/https://scholarships.s20.online/v2api/2/teacher/index',
          requestOptions
        ).then((response) => response.json())

        // console.log(
        //   '%c 🎃: enterRoom -> teacher ',
        //   'font-size:16px;background-color:#39a48e;color:white;',
        //   teacher
        // )

        if (phonenumber && teacher.count > 0) {
          this.generateRoom(phonenumber)
        }

        if (phonenumber && !teacher.count) {
          this.link = null
        }
      } catch (error) {
        console.log(
          '%c 🌤️: enterRoom -> error ',
          'font-size:16px;background-color:#76fd2c;color:black;',
          error
        )
      }
    },
  },
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
  text-align: center;
}
.logo {
  width: 250px;
  display: flex;
  margin: 0 auto 30px;
}
.enter-form {
  align-self: center;
  width: 300px;
  margin: 0 auto;
}
.link-room {
  padding: 10px 15px;

  p {
    margin-bottom: 10px;
  }
}
.txt-wrap {
  word-wrap: break-word;
}
</style>
