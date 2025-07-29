import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import BaseTextarea from './BaseTextarea.vue'

describe('BaseTextarea', () => {
  test('renders correctly with required props', () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        modelValue: 'Test value'
      }
    })

    expect(wrapper.find('textarea').exists()).toBe(true)
    expect(wrapper.find('textarea').element.value).toBe('Test value')
  })

  test('renders with label', () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        modelValue: '',
        label: 'Test Label',
        id: 'test-id'
      }
    })

    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('label').text()).toBe('Test Label')
    expect(wrapper.find('textarea').attributes('id')).toBe('test-id')
  })

  test('emits update:modelValue on input', async () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        modelValue: ''
      }
    })

    await wrapper.find('textarea').setValue('New value')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['New value'])
  })

  test('applies required attribute', () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        modelValue: '',
        required: true
      }
    })

    expect(wrapper.find('textarea').attributes('required')).toBeDefined()
  })

  test('applies placeholder', () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        modelValue: '',
        placeholder: 'Test placeholder'
      }
    })

    expect(wrapper.find('textarea').attributes('placeholder')).toBe('Test placeholder')
  })

  test('applies rows attribute', () => {
    const wrapper = mount(BaseTextarea, {
      props: {
        modelValue: '',
        rows: 5
      }
    })

    expect(wrapper.find('textarea').attributes('rows')).toBe('5')
  })
}) 
