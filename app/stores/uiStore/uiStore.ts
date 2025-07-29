import { uiState, ModalNames } from '~/stores/uiStore/state'

export const useUiStore = defineStore('ui', {
  state: () => ({
    ...uiState,
  }),

  getters: {
    isModalOpen: state => {
      return (modalName: ModalNames) => state.modalNameOpen === modalName
    },
    isLoading: state => state.loadingCount > 0,
  },

  actions: {
    openModal(modalName: ModalNames, redirectUrl?: string) {
      this.modalNameOpen = modalName
      if (modalName === ModalNames.AUTH_MODAL && redirectUrl) {
        this.authRedirectUrl = redirectUrl
      }
    },

    closeModal() {
      this.modalNameOpen = null
      this.authRedirectUrl = null
    },

    IncLoading(message?: string) {
      this.loadingCount++
      if (message) {
        this.loadingMessage = message
      }
    },
    DecLoading() {
      this.loadingCount--
      if (this.loadingCount <= 0) {
        this.loadingMessage = 'Chargement en cours...'
      }
    },
  },
})
