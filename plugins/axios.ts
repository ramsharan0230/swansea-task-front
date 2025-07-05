import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.apiBaseUrl,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      'X-Requested-With': 'XMLHttpRequest'
    }
  })

  return {
    provide: {
      axios: api,
    }
  }
})
