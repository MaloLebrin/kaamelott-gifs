import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AppImage from './AppImage.vue'

describe('AppImage', () => {
  test('renders with default props', () => {
    const wrapper = mount(AppImage, {
      props: {
        src: 'test.jpg',
        alt: 'Test image'
      }
    })

    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('.animate-spin').exists()).toBe(true)
  })

  test('applies custom class', () => {
    const wrapper = mount(AppImage, {
      props: {
        src: 'test.jpg',
        alt: 'Test image',
        className: 'custom-class'
      }
    })

    expect(wrapper.find('.custom-class').exists()).toBe(true)
  })
}) 
