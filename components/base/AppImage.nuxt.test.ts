import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppImage from './AppImage.vue'

describe('AppImage', () => {
  test('renders with default props', () => {
    const wrapper = mount(AppImage, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image'
      }
    })

    expect(wrapper.find('NuxtImg').exists()).toBe(true)
    expect(wrapper.find('NuxtImg').attributes('src')).toBe('test.jpg')
    expect(wrapper.find('NuxtImg').attributes('alt')).toBe('Test Image')
  })

  test('renders with custom props', () => {
    const wrapper = mount(AppImage, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image',
        width: 500,
        height: 300,
        provider: 'cloudinary',
        loading: 'eager',
        class: 'custom-class',
        quality: 90,
        format: 'webp',
        fit: 'contain',
        position: 'top',
        background: '#000000'
      }
    })

    const img = wrapper.find('NuxtImg')
    expect(img.attributes('width')).toBe('500')
    expect(img.attributes('height')).toBe('300')
    expect(img.attributes('provider')).toBe('cloudinary')
    expect(img.attributes('loading')).toBe('eager')
    expect(img.attributes('class')).toBe('custom-class')
    expect(img.attributes('fit')).toBe('contain')
    expect(img.attributes('position')).toBe('top')
    expect(img.attributes('background')).toBe('#000000')
  })

  test('emits load event', async () => {
    const wrapper = mount(AppImage, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image'
      }
    })

    await wrapper.find('NuxtImg').trigger('load')
    expect(wrapper.emitted('load')).toBeTruthy()
  })

  test('emits error event', async () => {
    const wrapper = mount(AppImage, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image'
      }
    })

    await wrapper.find('NuxtImg').trigger('error')
    expect(wrapper.emitted('error')).toBeTruthy()
  })
}) 
