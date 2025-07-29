import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import AppImage from './AppImage.vue'

describe('AppImage', () => {
  test('renders with default props', () => {
    const wrapper = mount(AppImage, {
      props: {
        src: 'test.jpg',
        alt: 'Test image',
        format: 'jpg'
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
        format: 'jpg',
        className: 'custom-class'
      }
    })

    expect(wrapper.find('.custom-class').exists()).toBe(true)
  })
}) 
