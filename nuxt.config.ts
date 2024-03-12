// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@sidebase/nuxt-auth'],
  auth: {
    baseUrl: process.env.AUTH_NO_ORIGIN,
    provider: {
      type: 'authjs'
    }
  },
  nitro: {
    plugins: ['~/server/index.ts']
  },
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
    mongodbUri: process.env.MONGODB_URI,
  }
})
