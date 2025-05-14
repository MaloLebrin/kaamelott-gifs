import { uiState, type ModalNames } from "~/stores/uiStore/state"

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
    openModal(modalName: ModalNames) {
      this.modalNameOpen = modalName
    },

    closeModal() {
      this.modalNameOpen = null
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
