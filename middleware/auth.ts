export default defineNuxtRouteMiddleware((to, from) => {
  // À adapter selon ta logique d'authentification
  const user = useAuthUser?.() ?? { value: null }
  if (!user.value) {
    return navigateTo('/login')
  }
}) 
