<template>
<header
  class="bg-white/90 backdrop-blur-sm shadow-sm"
  role="banner">
  <div class="max-w-6xl mx-auto py-4 px-4">
    <div class="flex justify-between items-center">
      <NuxtLink 
        to="/" 
        class="flex items-center space-x-3"
        aria-label="Retour à l'accueil"
      >
        <img
          src="/KaamelottLogo.webp"
          alt="Logo Kaamelott"
          class="h-12 w-auto" >
        <span class="text-3xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200">
          GIFs
        </span>
      </NuxtLink>

      <nav
        class="flex space-x-4"
        role="navigation"
        aria-label="Navigation principale">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.href"
          class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-gray-500 hover:text-gray-900 hidden md:block focus:outline-none "
          :class="{ 'bg-gray-100 text-gray-900': $route.path === item.href }"
          :aria-current="$route.path === item.href ? 'page' : undefined"
          :aria-label="item.name"
          :v-posthog-capture="`click_header_link_${item.name}`"
          prefetch
        >
          {{ item.name }}
        </NuxtLink>
        <div class="flex md:hidden">
          <button 
            type="button" 
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 focus:outline-none "
            aria-expanded="false"
            :aria-controls="mobileMenuOpen ? 'mobile-menu' : undefined"
            @click="mobileMenuOpen = true"
          >
            <span class="sr-only">Ouvrir le menu principal</span>
            <Bars3Icon
              class="size-6"
              aria-hidden="true" />
          </button>
        </div>
      </nav>

      <Dialog 
        class="md:hidden" 
        :open="mobileMenuOpen" 
        aria-label="Menu mobile"
        @close="closeMobileMenu"
      >
        <div class="fixed inset-0 z-10" />
        <DialogPanel
          id="mobile-menu"
          class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        >
          <div class="flex items-center justify-between">
            <NuxtLink
              to="/"
              class="-m-1.5 p-1.5"
              prefetch
              aria-label="Retour à l'accueil"
            >
              <span class="sr-only">Kaamelott GIFs</span>
              <img
                class="h-8 w-auto"
                src="/KaamelottLogo.webp"
                alt="Logo Kaamelott" >
            </NuxtLink>

            <button 
              type="button" 
              class="-m-2.5 rounded-md p-2.5 text-gray-700 focus:outline-none " 
              aria-label="Fermer le menu"
              @click="closeMobileMenu"
            >
              <span class="sr-only">Fermer le menu</span>
              <XMarkIcon
                class="size-6"
                aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="space-y-2 py-6">
                <NuxtLink
                  v-for="item in navigationItems"
                  :key="item.name"
                  :to="item.href"
                  class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 focus:outline-none "
                  :class="{ 'bg-gray-100': $route.path === item.href }"
                  :aria-current="$route.path === item.href ? 'page' : undefined"
                  :aria-hidden="item.isAdmin ? 'true' : 'false'"
                  :aria-label="item.name"
                  :v-posthog-capture="`click_header_link_${item.name}`"
                  prefetch
                  @click="closeMobileMenu"
                >
                  {{ item.name }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </div>
  </div>
</header>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import { isUserAdmin } from '~/shared/utils/auth/profiles'

const mobileMenuOpen = ref(false)

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

const user = useSupabaseUser()
const isAdmin = ref(false)

if (user.value) {
  const { data: profile } = await useFetch(`/api/auth/roles/${user.value.id}`)
  isAdmin.value = isUserAdmin(profile.value?.role)
}

const navigationItems = computed(() => getNavigationItems({ isAuth: Boolean(user.value), isAdmin: isAdmin.value }))

// Gérer l'état aria-expanded du bouton mobile
watch(mobileMenuOpen, newValue => {
  const button = document.querySelector('[aria-controls="mobile-menu"]')
  if (button) {
    button.setAttribute('aria-expanded', newValue.toString())
  }
})
</script>
