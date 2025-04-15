import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from './SearchBar.vue'

describe('SearchBar', () => {
  test('renders correctly', () => {
    const wrapper = mount(SearchBar)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('button').exists()).toBe(true)
  })

  test('emits search event with correct value', async () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')
    const searchValue = 'test search'

    await input.setValue(searchValue)
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')?.[0]).toEqual([searchValue])
  })

  test('clears input after search', async () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')
    const searchValue = 'test search'

    await input.setValue(searchValue)
    await wrapper.find('button').trigger('click')

    expect(input.element.value).toBe('')
  })

  test('handles empty search gracefully', async () => {
    const wrapper = mount(SearchBar)
    const input = wrapper.find('input')

    await input.setValue('')
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('search')).toBeFalsy()
  })
}) 
