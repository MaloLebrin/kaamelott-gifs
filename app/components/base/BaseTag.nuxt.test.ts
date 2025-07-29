import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTag from '../../../components/base/BaseTag.vue'

describe('BaseTag', () => {

  test('renders with empty label', () => {
    const wrapper = mount(BaseTag, {
      props: {
        label: ''
      }
    })

    expect(wrapper.text()).toBe('')
  })

  test('renders with long label', () => {
    const longLabel = 'This is a very long label that should still be displayed correctly'
    const wrapper = mount(BaseTag, {
      props: {
        label: longLabel
      }
    })

    expect(wrapper.text()).toBe(longLabel)
  })

  test('has correct styling classes', () => {
    const wrapper = mount(BaseTag, {
      props: {
        label: 'Test Label'
      }
    })

    const tag = wrapper.find('span')
    expect(tag.classes()).toContain('px-3')
    expect(tag.classes()).toContain('py-1.5')
    expect(tag.classes()).toContain('border-[1px]')
    expect(tag.classes()).toContain('border-gray-200')
    expect(tag.classes()).toContain('bg-gray-100')
    expect(tag.classes()).toContain('rounded-full')
    expect(tag.classes()).toContain('text-sm')
    expect(tag.classes()).toContain('text-gray-600')
  })
})
