// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-quasar-ui", "@nuxtjs/supabase", "@pinia/nuxt"],
  quasar: {
    config: {
      ripple: false,
      brand: {
        primary: "#26a69a",
        secondary: "#1976d2",
      },
    },
  },
  supabase: { redirect: false },
  typescript: { strict: true },
  nitro: {
    preset: "netlify",
  },
});
