// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: ["~/assets/scss/main.scss"],
  modules: ["@nuxtjs/supabase", "nuxt-icon"],

  supabase: {
    redirect: false,
  },

  compatibilityDate: "2024-07-09",
  vite: {
    server: {
      allowedHosts: ["osy-devenv-vm"],
    },
  },
});
