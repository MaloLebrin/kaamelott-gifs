<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900 relative">
    <!-- Fond d'écran avec overlay léger -->
    <div class="fixed inset-0 z-0">
      <img
        src="/fondKBg.jpg"
        alt="Fond d'écran Kaamelott"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-white/80"></div>
    </div>

    <!-- Contenu principal -->
    <div class="relative z-10 flex flex-col min-h-screen">
      <header class="bg-white/90 backdrop-blur-sm shadow-sm">
        <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center">
            <NuxtLink to="/" class="flex items-center space-x-3">
              <img
                src="/KaamelottLogo.webp"
                alt="Logo Kaamelott"
                class="h-12 w-auto"
              />
              <span class="text-3xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200">
                GIFs
              </span>
            </NuxtLink>
            <nav class="flex space-x-4">
              <NuxtLink
                to="/"
                class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                :class="isHome ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'"
              >
                Accueil
              </NuxtLink>
            </nav>
          </div>
        </div>
      </header>
      <main class="flex-1">
        <slot />
      </main>
      <footer class="bg-white/90 backdrop-blur-sm shadow-sm mt-8">
        <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p class="text-center text-gray-500 text-sm">
            © {{ new Date().getFullYear() }} Kaamelott GIFs - Tous droits réservés
          </p>
        </div>
      </footer>
    </div>
  </div>
</template> 
