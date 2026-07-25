export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();

  // On a hard page load (e.g. a direct link or refresh) the Supabase session is
  // restored from storage asynchronously, so `user.value` can still be null here
  // even for a signed-in user. Waiting for `getSession()` ensures we only bounce
  // genuinely unauthenticated visitors to the sign-in page — otherwise direct
  // links appear "broken" and only work after an in-app navigation.
  if (!user.value) {
    const supabase = useSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return navigateTo("/signin");
    }
  }
});
