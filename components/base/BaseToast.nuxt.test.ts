import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseToast from './BaseToast.vue'
import { useToast } from '~/composables/useToast'

// Mock the useToast composable
vi.mock('~/composables/useToast', () => ({
  useToast: () => ({
    toasts: [
      {
        id: 1,
        message: 'Success message',
        type: 'success'
      },
      {
        id: 2,
        message: 'Error message',
        type: 'error'
      },
      {
        id: 3,
        message: 'Info message',
        type: 'info'
      },
      {
        id: 4,
        message: 'Warning message',
        type: 'warning'
      }
    ],
    removeToast: vi.fn()
  })
}))

describe('BaseToast', () => {
  test('renders all toasts', () => {
    const wrapper = mount(BaseToast)
    const toasts = wrapper.findAll('div[class*="min-w-[300px]"]')
    
    expect(toasts).toHaveLength(4)
  })

  test('renders correct message for each toast', () => {
    const wrapper = mount(BaseToast)
    const messages = wrapper.findAll('span')
    
    expect(messages[0].text()).toBe('Success message')
    expect(messages[1].text()).toBe('Error message')
    expect(messages[2].text()).toBe('Info message')
    expect(messages[3].text()).toBe('Warning message')
  })

  test('applies correct classes based on toast type', () => {
    const wrapper = mount(BaseToast)
    const toasts = wrapper.findAll('div[class*="min-w-[300px]"]')
    
    expect(toasts[0].classes()).toContain('bg-green-500')
    expect(toasts[1].classes()).toContain('bg-red-500')
    expect(toasts[2].classes()).toContain('bg-blue-500')
  })

  test('renders correct icons for each toast type', () => {
    const wrapper = mount(BaseToast)
    const icons = wrapper.findAll('svg')
    
    // Check that we have the correct number of icons (4 toasts * 2 icons each = 8)
    expect(icons).toHaveLength(8)
  })
}) 
