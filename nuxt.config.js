export default {
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.API_BASEURL || 'http://127.0.0.1:4000/',
    },
  },
  server: {
    host: process.env.APP_HOST || 'localhost',
    port: process.env.APP_PORT || 3000,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Qoligo Platform',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    script: [
      {
        hid: 'stripe',
        src: 'https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js',
        defer: true,
      },
      {
        hid: 'stripe',
        src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
        defer: true,
      },
      {
        hid: 'stripe',
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.7.6/jquery.nicescroll.min.js',
        defer: true,
      },
      {
        hid: 'stripe',
        type: 'text/javascript',
        src: '/js/stisla.js',
        defer: true,
      },
      {
        hid: 'stripe',
        type: 'text/javascript',
        src: '/js/scripts.js',
        defer: true,
      },
      {
        hid: 'stripe',
        type: 'text/javascript',
        src: '/js/custom.js',
        defer: true,
      },
      {
        hid: 'stripe',
        type: 'text/javascript',
        src: '/js/features-posts.js',
        defer: true,
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.7.2/css/all.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
    '@/assets/css/style.css',
    '@/assets/css/components.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vee-validate',
    '@/plugins/sweetalert2',
    '@/plugins/processLoading',
    '@/plugins/vue-i18n',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/router'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'vue-sweetalert2/nuxt',
    [
      'nuxt-fontawesome',
      {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas'],
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab'],
          },
        ],
      },
    ],
  ],

  router: {
    // middleware: ['auth'],
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'auth', method: 'post' },
          user: false,
          logout: false,
        },
      },
    },
    redirect: {
      login: '/login',
      home: '/',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {},
    transpile: ['vee-validate/dist/rules'],
    babel: { compact: true },
  },
}
