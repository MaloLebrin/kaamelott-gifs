/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LikeButton from './LikeButton.vue'
import { useLike } from '~/composables/useLike'

// Mock du composable useLike
vi.mock('~/composables/useLike', () => ({
  useLike: vi.fn()
}))

describe('LikeButton', () => {
  const mockGifId = 123
  const mockUseLike = {
    isLoading: false,
    isLiked: false,
    likesCount: 42,
    toggleLike: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useLike as any).mockReturnValue(mockUseLike)
  })

  test('renders correctly with initial state', () => {
    const wrapper = mount(LikeButton, {
      props: {
        gifId: mockGifId
      }
    })

    // Vérifie que le bouton est rendu
    expect(wrapper.find('button').exists()).toBe(true)
    
    // Vérifie que l'icône est rendue
    expect(wrapper.find('button i').exists()).toBe(true)
    
    // Vérifie que le compteur est rendu
    expect(wrapper.find('button span').text()).toBe('42')
    
    // Vérifie que le bouton n'est pas en état "liked"
    expect(wrapper.find('button').classes()).not.toContain('bg-red-500/10')
  })

  test('renders correctly when liked', () => {
    ;(useLike as any).mockReturnValue({
      ...mockUseLike,
      isLiked: true
    })

    const wrapper = mount(LikeButton, {
      props: {
        gifId: mockGifId
      }
    })

    // Vérifie que le bouton est en état "liked"
    expect(wrapper.find('button').classes()).toContain('bg-red-500/10')
    
    // Vérifie que l'icône est en rouge
    expect(wrapper.find('button i').classes()).toContain('text-red-500')
  })

  test('calls toggleLike when clicked', async () => {
    const wrapper = mount(LikeButton, {
      props: {
        gifId: mockGifId
      }
    })

    // Simule un clic sur le bouton
    await wrapper.find('button').trigger('click')

    // Vérifie que toggleLike a été appelé
    expect(mockUseLike.toggleLike).toHaveBeenCalledTimes(1)
  })

  test('is disabled when loading', () => {
    ;(useLike as any).mockReturnValue({
      ...mockUseLike,
      isLoading: true
    })

    const wrapper = mount(LikeButton, {
      props: {
        gifId: mockGifId
      }
    })

    // Vérifie que le bouton est désactivé
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  test('formats likes count with locale string', () => {
    ;(useLike as any).mockReturnValue({
      ...mockUseLike,
      likesCount: 1000
    })

    const wrapper = mount(LikeButton, {
      props: {
        gifId: mockGifId
      }
    })

    // Vérifie que le nombre est formaté
    expect(wrapper.find('button span').text()).toBe('1\u202f000')
  })

  test('updates like count when toggled', async () => {
    // Simule un changement de compteur après le like
    const updatedCount = 43
    ;(useLike as any).mockReturnValue({
      ...mockUseLike,
      likesCount: updatedCount
    })

    const wrapper = mount(LikeButton, {
      props: {
        gifId: mockGifId
      }
    })

    // Vérifie le compteur initial
    expect(wrapper.find('button span').text()).toBe('43')

    // Simule le clic
    await wrapper.find('button').trigger('click')

    // Vérifie que le compteur est mis à jour
    expect(wrapper.find('button span').text()).toBe('43')
  })

  test('shows correct icon based on like state true', () => {
    // Change l'état à "liked"
    ;(useLike as any).mockReturnValue({
      ...mockUseLike,
      isLiked: true
    })

    const wrapper = mount(LikeButton, {
      props: {
        gifId: mockGifId
      }
    })

    // Vérifie l'icône en état "liked"
    expect(wrapper.find('button i').attributes('name')).toBe('ph:heart-fill')
  })

  test('shows correct icon based on like state false', () => {
    const wrapper = mount(LikeButton, {
      props: {
        gifId: mockGifId
      }
    })

    // Vérifie l'icône par défaut (non liké)
    expect(wrapper.find('button i').attributes('name')).toBe('ph:heart')
  })

  test('handles zero likes count', () => {
    ;(useLike as any).mockReturnValue({
      ...mockUseLike,
      likesCount: 0
    })

    const wrapper = mount(LikeButton, {
      props: {
        gifId: mockGifId
      }
    })

    // Vérifie que le compteur affiche 0
    expect(wrapper.find('button span').text()).toBe('0')
  })
}) 
