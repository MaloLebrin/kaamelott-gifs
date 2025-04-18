import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from './Pagination.vue'

describe('Pagination', () => {
  test('renders correctly with 5 pages', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 5
      }
    })

    expect(wrapper.findAll('button')).toHaveLength(6) // 5 pages + prev/next
    expect(wrapper.find('button[disabled]').exists()).toBe(true) // prev button should be disabled
  })

  test('emits pageChange event when clicking a page', async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalPages: 5
      }
    })

    await wrapper.findAll('button')[2].trigger('click') // Click on page 2
    expect(wrapper.emitted('pageChange')).toBeTruthy()
    expect(wrapper.emitted('pageChange')?.[0]).toEqual([2])
  })

  test('disables next button on last page', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 5,
        totalPages: 5
      }
    })

    const buttons = wrapper.findAll('button')
    expect(buttons[buttons.length - 1].attributes('disabled')).toBeDefined()
  })

  test('shows ellipsis for large page counts', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 5,
        totalPages: 10
      }
    })

    expect(wrapper.find('span').text()).toBe('...')
  })
}) 
