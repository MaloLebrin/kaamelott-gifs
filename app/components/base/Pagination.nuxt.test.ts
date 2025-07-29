import { mount } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import Pagination from './Pagination.vue'

// Mock useRoute
vi.mock('#app', () => ({
  useRoute: () => ({
    query: {}
  })
}))

describe('Pagination', () => {
  const createWrapper = (props = {}) => {
    return mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 5,
        ...props
      },
      global: {
        stubs: {
          NuxtLink: true
        }
      }
    })
  }

  test('renders pagination with correct number of pages', () => {
    const wrapper = createWrapper()
    const links = wrapper.findAllComponents({ name: 'NuxtLink' })
    
    // 5 pages + prev/next buttons
    expect(links).toHaveLength(5)
  })

  test('emits pageChange event when clicking a page', async () => {
    const wrapper = createWrapper()
    const links = wrapper.findAllComponents({ name: 'NuxtLink' })
    
    // Click on page 2
    await links[2]?.trigger('click')
    
    expect(wrapper.emitted('pageChange')).toBeTruthy()
    expect(wrapper.emitted('pageChange')?.[0]).toEqual([2])
  })

  test('disables prev button on first page', () => {
    const wrapper = createWrapper({ currentPage: 1 })
    const links = wrapper.findAllComponents({ name: 'NuxtLink' })
    
    expect(links[0]?.attributes('disabled')).toBeDefined()
  })

  test('disables next button on last page', () => {
    const wrapper = createWrapper({ currentPage: 5 })
    const links = wrapper.findAllComponents({ name: 'NuxtLink' })
    if (links.length > 0) {
      expect(links[links?.length - 1]?.attributes('disabled')).toBeDefined()
    }
  })

  test('shows ellipsis for large page counts', () => {
    const wrapper = createWrapper({ currentPage: 5, totalPages: 10 })
    
    expect(wrapper.findAll('span').some(span => span.text() === '...')).toBe(true)
  })

  test('handles page change within bounds', async () => {
    const wrapper = createWrapper({ currentPage: 3 })
    const links = wrapper.findAllComponents({ name: 'NuxtLink' })
    
    // Click on page 4
    await links[3]?.trigger('click')
    expect(wrapper.emitted('pageChange')?.[0]).toEqual([3])
  })

  test('ignores page change outside bounds', async () => {
    const wrapper = createWrapper({ currentPage: 1 })
    const links = wrapper.findAllComponents({ name: 'NuxtLink' })
    
    // Try to click prev (page 0)
    await links[0]?.trigger('click')
    expect(wrapper.emitted('pageChange')).toBeFalsy()
  })
})
