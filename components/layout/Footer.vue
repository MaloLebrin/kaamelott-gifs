<template>
<footer class="bg-white/90 backdrop-blur-sm shadow-sm mt-8">
  <div class="flex justify-between items-center container mx-auto">
    <div/>
    <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <p class="text-center text-gray-500 text-sm">
        © {{ new Date().getFullYear() }} Kaamelott GIFs - Tous droits réservés
      </p>
    </div>
    <a
      href="https://github.com/MaloLebrin/kaamelott-gifs"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub du projet"
      title="GitHub du projet"
      class="flex items-center justify-center p-2"
    >
      <Icon
        name="uil-github"
        class="text-gray-500 !w-6 !h-6 hover:text-gray-700 transition-colors"
      />
    </a>
  </div>
</footer>
</template>
