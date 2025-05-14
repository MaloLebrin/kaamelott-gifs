export interface UiState {
  modalNameOpen: ModalNames | null;
  loadingCount: number;
  loadingMessage: string;
}

export enum ModalNames {
  AUTH_MODAL = 'AUTH_MODAL',
}

export const defaultUiState = (): UiState => {
  return {
    modalNameOpen: null,
    loadingCount: 0,
    loadingMessage: 'Chargement en cours...'
  }
}
export const uiState = defaultUiState()
