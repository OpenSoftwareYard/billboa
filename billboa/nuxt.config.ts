// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: ["~/assets/scss/main.scss"],
  modules: ["@nuxtjs/supabase", "nuxt-icon"],
  supabase: {
    redirect: false,
  },
});
