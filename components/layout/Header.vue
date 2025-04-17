<template>
  <header class="bg-white/90 backdrop-blur-sm shadow-sm">
    <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        <NuxtLink to="/" class="flex items-center space-x-3">
          <img src="/KaamelottLogo.webp" alt="Logo Kaamelott" class="h-12 w-auto" />
          <span class="text-3xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200">
            GIFs
          </span>
        </NuxtLink>

        <nav class="flex space-x-4">
          <NuxtLink
            to="/"
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-gray-500 hover:text-gray-900"
            active-class="bg-gray-100 text-gray-900"
          >
            Accueil
          </NuxtLink>
          <NuxtLink
            to="/livres"
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-gray-500 hover:text-gray-900"
            active-class="bg-gray-100 text-gray-900"
          >
            Livres
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-gray-500 hover:text-gray-900"
            active-class="bg-gray-100 text-gray-900"
          >
            À propos
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>
