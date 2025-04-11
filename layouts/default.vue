<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-900 text-gray-100">
    <header class="bg-gray-800 shadow-lg">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="text-3xl font-bold text-amber-500 hover:text-amber-400 transition-colors duration-200">
            Kaamelott GIFs
          </NuxtLink>
          <nav class="flex space-x-4">
            <NuxtLink
              to="/"
              class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              :class="isHome ? 'bg-gray-700 text-amber-500' : 'text-gray-300 hover:text-amber-400'"
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
    <footer class="bg-gray-800 shadow-lg mt-8">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-gray-400 text-sm">
          © {{ new Date().getFullYear() }} Kaamelott GIFs - Tous droits réservés
        </p>
      </div>
    </footer>
  </div>
</template> 
