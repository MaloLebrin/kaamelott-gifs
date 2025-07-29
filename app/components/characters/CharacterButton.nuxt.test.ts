import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CharacterButton from '../../../components/characters/CharacterButton.vue'

describe('CharacterButton', () => {
  const mockCharacter = {
    name: 'Arthur',
    avatar: '/characters/arthur.jpg'
  }

  test('applies correct styles when selected', () => {
    const wrapper = mount(CharacterButton, {
      props: {
        character: mockCharacter,
        isSelected: true
      }
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('bg-gradient-to-r')
    expect(button.classes()).toContain('from-blue-300')
    expect(button.classes()).toContain('to-blue-900')
    expect(button.classes()).toContain('text-white')
    expect(button.classes()).toContain('scale-105')
  })

  test('applies correct styles when not selected', () => {
    const wrapper = mount(CharacterButton, {
      props: {
        character: mockCharacter,
        isSelected: false
      }
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('bg-white')
    expect(button.classes()).toContain('text-gray-700')
    expect(button.classes()).toContain('border')
    expect(button.classes()).toContain('border-gray-200')
  })

  test('emits select event when clicked', async () => {
    const wrapper = mount(CharacterButton, {
      props: {
        character: mockCharacter,
        isSelected: false
      }
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')?.[0]).toEqual(['Arthur'])
  })

  test('renders fallback avatar when avatar is not provided', () => {
    const wrapper = mount(CharacterButton, {
      props: {
        character: {
          name: 'Arthur',
          avatar: ''
        },
        isSelected: false
      }
    })

    expect(wrapper.find('img').attributes('src')).toBe('/characters/unknown.jpg')
  })
})
