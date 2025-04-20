import { describe, test, expect, vi } from 'vitest'
import { usePagination } from './usePagination'

vi.mock('#app', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

describe('usePagination', () => {
  const mockItems = Array.from({ length: 50 }, (_, i) => ({ id: i + 1 }))

  test('should initialize with default values', () => {
    const { currentPage, totalPages, paginatedItems } = usePagination({
      items: mockItems
    })

    expect(currentPage.value).toBe(1)
    expect(totalPages.value).toBe(3) // 50 items / 21 per page = 3 pages
    expect(paginatedItems.value.length).toBe(21)
  })

  test('should use custom itemsPerPage', () => {
    const { totalPages, paginatedItems } = usePagination({
      items: mockItems,
      itemsPerPage: 10
    })

    expect(totalPages.value).toBe(5) // 50 items / 10 per page = 5 pages
    expect(paginatedItems.value.length).toBe(10)
  })

  test('should use custom initialPage', () => {
    const { currentPage, paginatedItems } = usePagination({
      items: mockItems,
      initialPage: 2
    })

    expect(currentPage.value).toBe(2)
    expect(paginatedItems.value[0].id).toBe(22) // First item of page 2
  })

  test('should handle setPage correctly', () => {
    const { currentPage, setPage } = usePagination({
      items: mockItems
    })

    setPage(2)
    expect(currentPage.value).toBe(2)

    // Should not set page if out of bounds
    setPage(0)
    expect(currentPage.value).toBe(2)
    setPage(4)
    expect(currentPage.value).toBe(2)
  })

  test('should handle nextPage correctly', () => {
    const { currentPage, nextPage } = usePagination({
      items: mockItems
    })

    nextPage()
    expect(currentPage.value).toBe(2)

    // Should not go beyond total pages
    nextPage()
    nextPage()
    expect(currentPage.value).toBe(3)
  })

  test('should handle previousPage correctly', () => {
    const { currentPage, previousPage, setPage } = usePagination({
      items: mockItems
    })

    setPage(3)
    previousPage()
    expect(currentPage.value).toBe(2)

    // Should not go below page 1
    previousPage()
    previousPage()
    expect(currentPage.value).toBe(1)
  })

  test('should return correct paginated items', () => {
    const { paginatedItems, setPage } = usePagination({
      items: mockItems,
      itemsPerPage: 10
    })

    // First page
    expect(paginatedItems.value.length).toBe(10)
    expect(paginatedItems.value[0].id).toBe(1)
    expect(paginatedItems.value[9].id).toBe(10)

    // Second page
    setPage(2)
    expect(paginatedItems.value.length).toBe(10)
    expect(paginatedItems.value[0].id).toBe(11)
    expect(paginatedItems.value[9].id).toBe(20)
  })

  test('should handle empty items array', () => {
    const { currentPage, totalPages, paginatedItems } = usePagination({
      items: []
    })

    expect(currentPage.value).toBe(1)
    expect(totalPages.value).toBe(0)
    expect(paginatedItems.value.length).toBe(0)
  })
}) 
