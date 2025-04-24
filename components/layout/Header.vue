<template>
  <header class="bg-white/90 backdrop-blur-sm shadow-sm">
    <div class="max-w-6xl mx-auto py-4 px-4">
      <div class="flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center space-x-3">
          <img src="/KaamelottLogo.webp" alt="Logo Kaamelott" class="h-12 w-auto" />
          <span class="text-3xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200">
            GIFs
          </span>
        </NuxtLink>

        <nav class="flex space-x-4">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-gray-500 hover:text-gray-900 hidden md:block"
            active-class="bg-gray-100 text-gray-900"
            :v-posthog-capture="`click_header_link_${item.name}`"
            prefetch
          >
            {{ item.name }}
          </NuxtLink>
          <div class="flex md:hidden">
            <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              @click="mobileMenuOpen = true">
              <span class="sr-only">Open main menu</span>
              <Bars3Icon class="size-6" aria-hidden="true" />
            </button>
          </div>
        </nav>

        <Dialog class="md:hidden" @close="closeMobileMenu" :open="mobileMenuOpen">
          <div class="fixed inset-0 z-10" />
          <DialogPanel
            class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div class="flex items-center justify-between">
              <NuxtLink
                to="/"
                class="-m-1.5 p-1.5"
                prefetch
              >
                <span class="sr-only">Kaamelott GIFs</span>
                <img class="h-8 w-auto" src="/KaamelottLogo.webp" alt="Logo Kaamelott" />
              </NuxtLink>

              <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="closeMobileMenu">
                <span class="sr-only">Close menu</span>
                <XMarkIcon class="size-6" aria-hidden="true" />
              </button>
            </div>
            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y divide-gray-500/10">
                <div class="space-y-2 py-6">
                  <NuxtLink
                    v-for="item in navigation"
                    :key="item.name"
                    :to="item.href"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    :v-posthog-capture="`click_header_link_${item.name}`"
                    prefetch
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

<script setup>
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Livres', href: '/livres' },
  // { name: 'Personnages', href: '/characters' },
  { name: 'À propos', href: '/about' },
]
const mobileMenuOpen = ref(false)

function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>
