<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="text-3xl font-bold text-gray-900 hover:text-gray-700">
            Kaamelott GIFs
          </NuxtLink>
          <nav class="flex space-x-4">
            <NuxtLink
              to="/"
              class="px-3 py-2 rounded-md text-sm font-medium"
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
    <footer class="bg-white shadow-sm mt-8">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-gray-500 text-sm">
          © {{ new Date().getFullYear() }} Kaamelott GIFs - Tous droits réservés
        </p>
      </div>
    </footer>
  </div>
</template> 
