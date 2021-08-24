export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Enggo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/VuePlugins' },
    { src: '~/plugins/axiosport' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/svg-sprite'
  ],
  svgSprite: {
    input: '~/assets/svg/'
  },
  // add global variables and mixins
  styleResources: {
    scss: ['./assets/scss/_mixins.scss', './assets/scss/_variables.scss']
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: `http://${process.env.NODE_ENV === 'production' ? process.env.HOST : 'localhost'}:3001/api/v1`
  },

  telemetry: false,
  loading: false,
  loadingIndicator: false,

  server: {
    port: process.env.NODE_ENV === 'production' ? 80 : process.env.PORT, //80, //process.env.PORT,
    host: process.env.NODE_ENV === 'production' ? process.env.HOST : '127.0.0.1', //process.env.HOST,
    timing: false
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
    splitChunks: {
      layouts: false,
      pages: true,
      commons: true
    }
  },

  env: {
    prod: process.env.NODE_ENV === 'production' ? true : false,
    baseUrl: `http://${process.env.NODE_ENV === 'production' ? process.env.HOST : 'localhost:3000'}`,
  }
}
