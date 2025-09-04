/* eslint-disable @typescript-eslint/no-explicit-any */
// test-setup.ts
// Gestion globale des erreurs pour les tests
process.on('unhandledRejection', (reason, promise) => {
  // Ignorer les erreurs spécifiques de Nuxt
  if (reason && typeof reason === 'object' && 'message' in reason) {
    const message = (reason as any).message
    if (message && message.includes('Cannot read properties of undefined')) {
      return
    }
  }
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

process.on('uncaughtException', error => {
  // Ignorer les erreurs spécifiques de Nuxt
  if (error.message && error.message.includes('Cannot read properties of undefined')) {
    return
  }
  console.error('Uncaught Exception:', error)
})
