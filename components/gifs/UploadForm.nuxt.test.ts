import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import UploadForm from './UploadForm.vue'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/vue/24/outline'

// Mock de useToast
const mockDenied = vi.fn()
vi.mock('~/composables/useToast', () => ({
  useToast: () => ({
    success: vi.fn(),
    denied: mockDenied
  })
}))

describe('UploadForm', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(UploadForm)
    mockDenied.mockClear()
  })

  test('renders correctly', () => {
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="file"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  test('disables submit button when no file is selected', () => {
    const submitButton = wrapper.find('button[type="submit"]')
    expect(submitButton.attributes('disabled')).toBeDefined()
  })

  test('handles file selection correctly', async () => {
    const file = new File(['test'], 'test.gif', { type: 'image/gif' })
    const input = wrapper.find('input[type="file"]')

    // Simuler le changement de fichier
    Object.defineProperty(input.element, 'files', {
      value: [file]
    })
    await input.trigger('change')

    expect(wrapper.find('img').exists()).toBe(true)
    // Le bouton reste désactivé car le formulaire n'est pas valide
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeDefined()
  })

  test('shows error for non-GIF files', async () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' })
    const input = wrapper.find('input[type="file"]')

    // Simuler le changement de fichier
    Object.defineProperty(input.element, 'files', {
      value: [file]
    })
    await input.trigger('change')

    expect(wrapper.find('img').exists()).toBe(false)
    // Vérifier que le message d'erreur est affiché via useToast
    expect(mockDenied).toHaveBeenCalledWith('Veuillez sélectionner un fichier GIF valide.')
  })

  test('handles drag and drop correctly', async () => {
    const file = new File(['test'], 'test.gif', { type: 'image/gif' })
    const dropZone = wrapper.find('.border-dashed')

    // Simuler le drag over
    await dropZone.trigger('dragover')
    expect(dropZone.classes()).toContain('border-amber-500')
    expect(dropZone.classes()).toContain('bg-amber-50')

    // Simuler le drop
    const dataTransfer = {
      files: [file]
    }
    await dropZone.trigger('drop', { dataTransfer })

    expect(wrapper.find('img').exists()).toBe(true)
    expect(dropZone.classes()).not.toContain('border-amber-500')
    expect(dropZone.classes()).not.toContain('bg-amber-50')
  })

  test('clears file when clicking remove button', async () => {
    // D'abord, sélectionner un fichier
    const file = new File(['test'], 'test.gif', { type: 'image/gif' })
    const input = wrapper.find('input[type="file"]')

    // Simuler le changement de fichier
    Object.defineProperty(input.element, 'files', {
      value: [file]
    })
    await input.trigger('change')

    // Vérifier que l'image est affichée
    expect(wrapper.find('img').exists()).toBe(true)

    // Cliquer sur le bouton de suppression
    const removeButton = wrapper.find('button[type="button"]')
    await removeButton.trigger('click')

    // Vérifier que l'image a disparu
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeDefined()
  })

  test('emits upload-success event on successful upload', async () => {
    // Mock fetch
    global.fetch = vi.fn().mockResolvedValue({
      ok: true
    })

    // Sélectionner un fichier
    const file = new File(['test'], 'test.gif', { type: 'image/gif' })
    const input = wrapper.find('input[type="file"]')

    // Simuler le changement de fichier
    Object.defineProperty(input.element, 'files', {
      value: [file]
    })
    await input.trigger('change')

    // Remplir les champs requis
    await wrapper.find('#quote').setValue('Test quote')
    await wrapper.find('#characters').setValue('Arthur')
    await wrapper.find('#episode').setValue('S01E01')

    // Soumettre le formulaire
    await wrapper.find('form').trigger('submit')

    // Vérifier que l'événement a été émis
    expect(wrapper.emitted('upload-success')).toBeTruthy()
  })

  test('shows error on failed upload', async () => {
    // Mock fetch pour simuler une erreur
    global.fetch = vi.fn().mockResolvedValue({
      ok: false
    })

    // Sélectionner un fichier
    const file = new File(['test'], 'test.gif', { type: 'image/gif' })
    const input = wrapper.find('input[type="file"]')

    // Simuler le changement de fichier
    Object.defineProperty(input.element, 'files', {
      value: [file]
    })
    await input.trigger('change')

    // Remplir les champs requis
    await wrapper.find('#quote').setValue('Test quote')
    await wrapper.find('#characters').setValue('Arthur')
    await wrapper.find('#episode').setValue('S01E01')

    // Soumettre le formulaire
    await wrapper.find('form').trigger('submit')

    // Vérifier que l'événement n'a pas été émis
    expect(wrapper.emitted('upload-success')).toBeFalsy()
  })
}) 
