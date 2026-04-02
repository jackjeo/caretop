export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

  app: {
    head: {
      title: '凯普软件 - 创新软件，驱动未来',
      htmlAttrs: { lang: 'zh-CN' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '凯普软件官方网站 - MindLink、HenryIway、Remote Desktop等创新软件产品' },
        { name: 'theme-color', content: '#6366F1' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js'
  },

  runtimeConfig: {
    public: {
      apiBase: '/api/v1'
    }
  },

  nitro: {
    routeRules: {
      '/api/**': {
        proxy: 'http://localhost:8080/api/v1/**'
      }
    }
  },

  typescript: {
    strict: false,
    typeCheck: false
  },

  compatibilityDate: '2024-04-03'
})

// Skip TypeScript type checking for build
