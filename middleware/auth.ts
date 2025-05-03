export default defineNuxtRouteMiddleware((to, from) => {
  // À adapter selon ta logique d'authentification
  const user = useSupabaseUser()
  if (!user.value) {
    return navigateTo('/login')
  }
}) 
