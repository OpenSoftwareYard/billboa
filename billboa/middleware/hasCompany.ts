export default defineNuxtRouteMiddleware(async (to, from) => {
  const { currentCompany } = await useCurrentCompany();

  if (!currentCompany.value) {
    return navigateTo("/settings");
  }
});
