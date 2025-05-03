import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FileUpload from './FileUpload.vue'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/vue/24/outline'

// Mock de useToast
const mockDenied = vi.fn()
vi.mock('~/composables/useToast', () => ({
  useToast: () => ({
    denied: mockDenied
  })
}))

describe('FileUpload', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(FileUpload)
    mockDenied.mockClear()
  })

  test('renders correctly', () => {
    expect(wrapper.find('input[type="file"]').exists()).toBe(true)
    expect(wrapper.find('.border-dashed').exists()).toBe(true)
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
    expect(wrapper.emitted('file-selected')).toBeTruthy()
    expect(wrapper.emitted('file-selected')?.[0]).toEqual([file])
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
    expect(wrapper.emitted('file-selected')).toBeTruthy()
    expect(wrapper.emitted('file-selected')?.[0]).toEqual([file])
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
    expect(wrapper.emitted('file-cleared')).toBeTruthy()
  })
}) 
