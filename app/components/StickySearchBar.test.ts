import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import StickySearchBar from '../../components/StickySearchBar.vue'

describe('StickySearchBar', () => {
  let wrapper: ReturnType<typeof mount>

  const mockCharacters = [
    { name: 'Arthur', avatar: '/characters/arthur.jpg' },
    { name: 'Perceval', avatar: '/characters/perceval.jpg' }
  ]

  // Mock d'une entrée IntersectionObserver
  const createMockEntry = (isIntersecting: boolean): IntersectionObserverEntry => ({
    isIntersecting,
    boundingClientRect: {} as DOMRectReadOnly,
    intersectionRatio: 0,
    intersectionRect: {} as DOMRectReadOnly,
    rootBounds: null,
    target: document.createElement('div'),
    time: 0
  })

  beforeEach(() => {
    // Mock IntersectionObserver
    const mockIntersectionObserver = vi.fn()
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    })
    window.IntersectionObserver = mockIntersectionObserver

    wrapper = mount(StickySearchBar, {
      props: {
        characters: mockCharacters,
        initialQuery: '',
        initialCharacter: ''
      },
      slots: {
        default: '<div class="test-content">Test Content</div>'
      }
    })
  })

  test('renders original search bar', () => {
    expect(wrapper.find('.test-content').exists()).toBe(true)
  })

  test('sticky bar is hidden by default', () => {
    const stickyBar = wrapper.find('.fixed')
    expect(stickyBar.exists()).toBe(true)
    expect(stickyBar.classes()).toContain('opacity-0')
  })

  test('sticky bar becomes visible when original bar is out of view', async () => {
    // Simuler l'intersection observer callback
    const observerCallback = vi.mocked(window.IntersectionObserver).mock.calls[0][0]
    observerCallback([createMockEntry(false)], {} as IntersectionObserver)

    // Attendre la transition
    await new Promise(resolve => setTimeout(resolve, 150))

    const stickyBar = wrapper.find('.fixed')
    expect(stickyBar.isVisible()).toBe(true)
    expect(stickyBar.classes()).toContain('opacity-100')
  })

  test('sticky bar hides when original bar is in view', async () => {
    // Simuler l'intersection observer callback
    const observerCallback = vi.mocked(window.IntersectionObserver).mock.calls[0][0]
    observerCallback([createMockEntry(true)], {} as IntersectionObserver)

    // Attendre la transition
    await new Promise(resolve => setTimeout(resolve, 150))

    const stickyBar = wrapper.find('.fixed')
    expect(stickyBar.classes()).toContain('opacity-0')
  })

  test('opens character menu when clicking the button', async () => {
    // Simuler l'intersection observer callback pour afficher la barre fixe
    const observerCallback = vi.mocked(window.IntersectionObserver).mock.calls[0][0]
    observerCallback([createMockEntry(false)], {} as IntersectionObserver)
    await new Promise(resolve => setTimeout(resolve, 150))

    // Cliquer sur le bouton de sélection de personnage
    const button = wrapper.find('button[aria-controls="sticky-character-menu"]')
    await button.trigger('click')

    // Attendre que le menu soit monté
    await new Promise(resolve => setTimeout(resolve, 0))
    const menu = wrapper.findComponent({ name: 'ListboxOptions' })
    expect(menu.exists()).toBe(true)
    expect(menu.isVisible()).toBe(true)
  })

  test('emits search event when selecting a character', async () => {
    // Simuler l'intersection observer callback pour afficher la barre fixe
    const observerCallback = vi.mocked(window.IntersectionObserver).mock.calls[0][0]
    observerCallback([createMockEntry(false)], {} as IntersectionObserver)
    await new Promise(resolve => setTimeout(resolve, 150))

    // Cliquer sur le bouton de sélection de personnage
    const button = wrapper.find('button[aria-controls="sticky-character-menu"]')
    await button.trigger('click')

    // Sélectionner un personnage
    const vm = wrapper.vm as unknown as { selectedCharacter: string; handleSearch: () => void };
    vm.selectedCharacter = 'Arthur';
    vm.handleSearch();

    // Vérifier que l'événement search est émis avec les bonnes valeurs
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')?.[0]).toEqual(['', 'Arthur'])
  })

  test('updates search query when typing', async () => {
    // Simuler l'intersection observer callback pour afficher la barre fixe
    const observerCallback = vi.mocked(window.IntersectionObserver).mock.calls[0][0]
    observerCallback([createMockEntry(false)], {} as IntersectionObserver)
    await new Promise(resolve => setTimeout(resolve, 150))

    // Simuler la saisie dans le champ de recherche
    const input = wrapper.find('#sticky-search-input')
    await input.setValue('test query')

    // Vérifier que l'événement search est émis avec la nouvelle requête
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')?.[0]).toEqual(['test query', ''])
  })

  test('character selection is not debounced', async () => {
    // Simuler l'intersection observer callback pour afficher la barre fixe
    const observerCallback = vi.mocked(window.IntersectionObserver).mock.calls[0][0]
    observerCallback([createMockEntry(false)], {} as IntersectionObserver)
    await new Promise(resolve => setTimeout(resolve, 150))

    // Cliquer sur le bouton de sélection de personnage
    const button = wrapper.find('button[aria-controls="sticky-character-menu"]')
    await button.trigger('click')

    // Sélectionner un personnage
    const characterOption = wrapper.findComponent({ name: 'ListboxOption' })
    await characterOption.trigger('click')

    // Vérifier que l'événement search est émis immédiatement
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')?.[0]).toEqual(['', 'Arthur'])
  })
}) 
