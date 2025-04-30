import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseToast from './BaseToast.vue'
import CheckCircle from '@heroicons/vue/24/outline/CheckCircleIcon'
import XCircle from '@heroicons/vue/24/outline/XCircleIcon'
import InformationCircle from '@heroicons/vue/24/outline/InformationCircleIcon'
import ExclamationCircleIcon from '@heroicons/vue/24/outline/ExclamationCircleIcon'

type Toast = {
  id: number
  type: 'success' | 'error' | 'info' | 'warning'
  message: string
}

describe('BaseToast', () => {
  const mockToasts: Toast[] = [
    { id: 1, type: 'success', message: 'Success message' },
    { id: 2, type: 'error', message: 'Error message' },
    { id: 3, type: 'info', message: 'Info message' },
    { id: 4, type: 'warning', message: 'Warning message' }
  ]

  test('renders all toasts', () => {
    const wrapper = mount(BaseToast, {
      props: {
        toasts: mockToasts
      }
    })

    const toastElements = wrapper.findAll('div[class*="min-w-[300px]"]')
    expect(toastElements).toHaveLength(4)
  })

  test('displays correct message for each toast', () => {
    const wrapper = mount(BaseToast, {
      props: {
        toasts: mockToasts
      }
    })

    mockToasts.forEach((toast, index) => {
      expect(wrapper.findAll('span')[index].text()).toBe(toast.message)
    })
  })

  test('applies correct background color based on type', () => {
    const wrapper = mount(BaseToast, {
      props: {
        toasts: mockToasts
      }
    })

    const toastElements = wrapper.findAll('div[class*="min-w-[300px]"]')
    expect(toastElements[0].classes()).toContain('bg-green-500')
    expect(toastElements[1].classes()).toContain('bg-red-500')
    expect(toastElements[2].classes()).toContain('bg-blue-500')
  })

  test('emits remove event when close button is clicked', async () => {
    const wrapper = mount(BaseToast, {
      props: {
        toasts: mockToasts
      }
    })

    const closeButtons = wrapper.findAll('button')
    await closeButtons[0].trigger('click')

    const emitted = wrapper.emitted('remove')
    expect(emitted).toBeTruthy()
    expect(emitted?.[0]).toEqual([1]) // First toast id
  })

  test('renders with empty toasts array', () => {
    const wrapper = mount(BaseToast, {
      props: {
        toasts: []
      }
    })

    const toastElements = wrapper.findAll('div[class*="min-w-[300px]"]')
    expect(toastElements).toHaveLength(0)
  })
})
