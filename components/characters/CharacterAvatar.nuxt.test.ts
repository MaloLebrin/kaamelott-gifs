import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CharacterAvatar from './CharacterAvatar.vue'

describe('CharacterAvatar', () => {
  test('renders the character avatar when loaded', () => {
    // Simule une image chargée sans erreur
    vi.mock('@vueuse/core', () => ({
      useImage: vi.fn().mockReturnValue({ isLoading: false, error: false })
    }))

    const wrapper = mount(CharacterAvatar, {
      props: {
        character: {
          avatar: 'https://example.com/avatar.jpg',
          name: 'Perceval'
        },
        isSelected: false
      }
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/avatar.jpg')
    expect(img.attributes('alt')).toBe('Avatar de Perceval')
  })

  test('renders the fallback image when loading or error', () => {
    // Simule une image en chargement ou en erreur
    vi.mock('@vueuse/core', () => ({
      useImage: vi.fn().mockReturnValue({ isLoading: true, error: false })
    }))

    const wrapper = mount(CharacterAvatar, {
      props: {
        character: {
          avatar: 'https://example.com/avatar.jpg',
          name: 'Karadoc'
        }
      }
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('alt')).toBe('Avatar de Karadoc')
  })

  test('applies selected class when isSelected is true', () => {
    vi.mock('@vueuse/core', () => ({
      useImage: vi.fn().mockReturnValue({ isLoading: false, error: false })
    }))

    const wrapper = mount(CharacterAvatar, {
      props: {
        character: {
          avatar: 'https://example.com/avatar.jpg',
          name: 'Léodagan'
        },
        isSelected: true
      }
    })

    const img = wrapper.find('img')
    expect(img.classes()).toContain('ring-2')
    expect(img.classes()).toContain('ring-white')
    expect(img.classes()).toContain('ring-offset-2')
    expect(img.classes()).toContain('ring-offset-blue-500')
  })

  test('applies hover class when isSelected is false', () => {
    vi.mock('@vueuse/core', () => ({
      useImage: vi.fn().mockReturnValue({ isLoading: false, error: false })
    }))

    const wrapper = mount(CharacterAvatar, {
      props: {
        character: {
          avatar: 'https://example.com/avatar.jpg',
          name: 'Bohort'
        },
        isSelected: false
      }
    })

    const img = wrapper.find('img')
    expect(img.classes()).toContain('group-hover/btn:scale-110')
  })

  test('applies common classes regardless of state', () => {
    vi.mock('@vueuse/core', () => ({
      useImage: vi.fn().mockReturnValue({ isLoading: false, error: false })
    }))

    const wrapper = mount(CharacterAvatar, {
      props: {
        character: {
          avatar: 'https://example.com/avatar.jpg',
          name: 'Arthur'
        }
      }
    })

    const img = wrapper.find('img')
    expect(img.classes()).toContain('w-7')
    expect(img.classes()).toContain('h-7')
    expect(img.classes()).toContain('rounded-full')
    expect(img.classes()).toContain('object-cover')
    expect(img.classes()).toContain('transition-transform')
    expect(img.classes()).toContain('duration-300')
  })

  test('handles missing character name gracefully', () => {
    vi.mock('@vueuse/core', () => ({
      useImage: vi.fn().mockReturnValue({ isLoading: false, error: false })
    }))

    const wrapper = mount(CharacterAvatar, {
      props: {
        character: {
          avatar: 'https://example.com/avatar.jpg',
          name: ''
        }
      }
    })

    const img = wrapper.find('img')
    expect(img.attributes('alt')).toBe('Avatar de ')
  })
})
