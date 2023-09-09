// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-quasar-ui"],
  quasar: {
    config: {
      ripple: false,
      brand: {
        primary: "#26a69a",
        secondary: "#1976d2",
      },
    },
  },
  devtools: { enabled: true },
  typescript: { strict: true },
});
