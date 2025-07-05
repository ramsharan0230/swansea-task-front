export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_API_BASE_URL || 'http://localhost:8000/api'
    }
  },
  vite: {
    resolve: {
      alias: {
        'form-data': 'form-data'
      }
    },
    define: {
      'window.FormData': 'undefined',
    }
  }
});