<script setup lang="ts">
import Header from '~/components/layout/Header.vue'
import Footer from '~/components/layout/Footer.vue'

const { toasts, removeToast } = useToast()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-900 relative">
    <div class="fixed inset-0 z-0">
      <img src="/fondKBg.webp" alt="Fond d'écran Kaamelott" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-white/20"></div>
    </div>

    <div class="relative z-10 flex flex-col min-h-screen">
      <Header />
      <main class="flex-1">
        <slot />
      </main>
      <Footer />
      <BaseToast :toasts="toasts" @remove="removeToast" />
    </div>
  </div>
</template>
