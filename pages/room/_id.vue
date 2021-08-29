<template>
  <div class="room">
    <div class="room__inner">
      <div class="classroom" ref="classroom">
        <div class="room__panel">
          <div class="room__logo"><img src="/logo.png" alt="enggo" /></div>
          <div
            class="room__fullscreen"
            @click="toggleRoom"
            :class="{ active: this.full }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="#fff"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M21 3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zm-1 2H4v14h16V5zm-7 12v-2h3v-3h2v5h-5zM11 7v2H8v3H6V7h5z"
              />
            </svg>
          </div>
          <div
            class="room__fullscreen-mob"
            @click="toggleRoomMob"
            :class="{ active: this.full }"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="#fff"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M21 3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zm-1 2H4v14h16V5zm-7 12v-2h3v-3h2v5h-5zM11 7v2H8v3H6V7h5z"
              />
            </svg>
          </div>
        </div>
        <iframe
          src="https://online.enggo.kz/"
          width="100%"
          height="100%"
          scrolling="auto"
          frameborder="0"
          name="enggo"
          sandbox="allow-scripts allow-popups allow-same-origin"
        ></iframe>
      </div>
      <div class="linkchat" v-if="iframeForm" v-show="!full" ref="linkchat">
        <iframe
          v-if="linkchat"
          :src="linkchat"
          width="100%"
          height="100%"
          scrolling="auto"
          frameborder="0"
          allow="camera; microphone; fullscreen; speaker; display-capture"
          loading="lazy"
        ></iframe>
        <button v-else type="button" class="btn" @click="includeRoom">
          Подключиться
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { formUrlencodeBuilder } from '../../helpers'
import { jwtDecode } from '../../store/auth'
import jwt_decode from 'jwt-decode'
// import db from '../../data/db.json'
export default {
  data() {
    return {
      linkchat: '', //'https://linkchat.io/testik'
      main_room: '', // главная комната
      iframeForm: false,
      full: false,
    }
  },
  mounted() {
    // if (!this.has_room) {
    //   this.$router.push('/')
    // }
    const id_room = jwt_decode(this.link_room) || {}
    this.main_room = id_room.room
    if (this.$cookie.get('teacher')) {
      this.linkchat = `https://linkchat.io/${id_room.room}`
    }
    const engGo = document.querySelector('[name="enggo"]')
    engGo.onload = () => {
      alert()
      this.iframeForm = true
    }
  },
  methods: {
    onLoad() {
      this.iframeForm = true
    },
    toggleRoom() {
      const classroom = this.$refs.classroom
      // const linkchat = this.$refs.linkchat
      if (!this.full) {
        classroom.classList.width = '100%'
        this.full = true
      } else {
        this.full = false
      }
    },
    toggleRoomMob() {
      const classroom = this.$refs.classroom
      // const linkchat = this.$refs.linkchat
      if (this.full) {
        // classroom.classList.width = '100%'
        this.full = false
      } else {
        this.full = true
      }
    },

    async includeRoom() {
      const myHeaders = new Headers()
      // myHeaders.append('X-ALFACRM-TOKEN', this.$attrs.token)
      myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

      const raw = formUrlencodeBuilder({
        key: 'A8pJW1By456D45KLy4AYGHj2',
        validFor: 120, //valid for in minutes
        startDate: new Date(),
        roomId: this.main_room,
      })

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      }

      try {
        const guest = await fetch(
          // 'https://cors-anywhere.herokuapp.com/https://linkchat.io/api/guestlink',
          'https://linkchat.io/api/guestlink',
          requestOptions
        ).then((response) => response.json())

        this.linkchat = guest.link
      } catch (error) {
        console.log(
          '%c 🏋️‍♂️: includeRoom -> error ',
          'font-size:16px;background-color:#139ed0;color:white;',
          error
        )
      }
    },
  },
  async asyncData({ params, $axios, store }) {
    const link_room = params.id // When calling /abc the slug will be "abc"
    console.log(
      '%c ➖: Data -> link_room ',
      'font-size:16px;background-color:#a6f6bc;color:black;',
      link_room
    )
    if (!link_room) store.$router.push('/')
    try {
      let has_room = jwtDecode(link_room)
      if (!has_room) {
        const jwtData = jwt_decode(link_room)
        console.log(
          '%c 🇰🇭: Data -> jwtData ',
          'font-size:16px;background-color:#68d340;color:white;',
          jwtData
        )
        try {
          await $axios.$post(
            '/customer/clearroom',
            formUrlencodeBuilder({ link: jwtData.link })
          )
          // const myHeaders = new Headers()
          // myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
          // await fetch(`${process.env.apiUrl}/customer/clearroom`, {
          //   method: 'POST',
          //   headers: myHeaders,
          //   body: formUrlencodeBuilder({
          //     link: jwtData.link,
          //   }),
          //   redirect: 'follow',
          // })
        } catch (error) {
          console.log(
            '%c 🤞: Data -> error ',
            'font-size:16px;background-color:#6a9133;color:white;',
            error
          )
        }
      }
    } catch (error) {
      store.$router.push('/')
    }
    //
    return { link_room }
  },
}
</script>

<style lang="scss" scoped>
.room {
  height: 100vh;
  width: 100%;
}
.room__inner {
  display: flex;
  height: 100%;
  width: 100%;
}
.room__logo {
  display: flex;

  img {
    width: 130px;
  }
}
.room__fullscreen {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 680px) {
    display: none;
  }
}
.room__fullscreen-mob {
  display: none;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 680px) {
    display: block;
  }
}
.room__panel {
  position: absolute;
  top: 0;
  left: 0;
  height: 56px;
  width: 100%;
  background: #2196f3;

  &:after {
    content: '';
    position: absolute;
    right: 0;
    width: 100%;
    top: 100%;
    bottom: auto;
    height: 10px;
    pointer-events: none;
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(0, 0, 0, 0.3)),
      color-stop(40%, rgba(0, 0, 0, 0.1)),
      color-stop(50%, rgba(0, 0, 0, 0.05)),
      color-stop(80%, rgba(0, 0, 0, 0)),
      to(rgba(0, 0, 0, 0))
    );
    background: -webkit-linear-gradient(
      top,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.1) 40%,
      rgba(0, 0, 0, 0.05) 50%,
      rgba(0, 0, 0, 0) 80%,
      rgba(0, 0, 0, 0) 100%
    );
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.1) 40%,
      rgba(0, 0, 0, 0.05) 50%,
      rgba(0, 0, 0, 0) 80%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  @media (max-width: 680px) {
    position: fixed;
    z-index: 1;
  }
}
.classroom {
  flex: 1 0 auto;
  width: 65%;
  position: relative;
  padding-top: 56px;

  @media (max-width: 680px) {
    width: 100%;
  }
}
.linkchat {
  flex: 1 0 auto;
  width: 35%;
  display: flex;
  justify-content: center;

  .btn {
    align-self: center;
  }

  @media (max-width: 680px) {
    position: absolute;
    top: 56px;
    left: 0;
    height: 100%;
    background: cornsilk;
    z-index: 2;
    width: 100%;
  }
}
</style>
