import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import BaseInput from './BaseInput.vue'

describe('BaseInput', () => {
  test('renders correctly with required props', () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: 'Test value'
      }
    })

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').element.value).toBe('Test value')
  })

  test('renders with label', () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
        label: 'Test Label',
        id: 'test-id'
      }
    })

    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('label').text()).toBe('Test Label')
    expect(wrapper.find('input').attributes('id')).toBe('test-id')
  })

  test('emits update:modelValue on input', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: ''
      }
    })

    await wrapper.find('input').setValue('New value')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['New value'])
  })

  test('applies required attribute', () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
        required: true
      }
    })

    expect(wrapper.find('input').attributes('required')).toBeDefined()
  })

  test('applies placeholder', () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
        placeholder: 'Test placeholder'
      }
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('Test placeholder')
  })

  test('applies type attribute', () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
        type: 'email'
      }
    })

    expect(wrapper.find('input').attributes('type')).toBe('email')
  })
}) 
