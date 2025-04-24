import { describe, test, expect, vi, beforeEach } from 'vitest'
import { usePagination } from './usePagination'

const mockRouter = {
  push: vi.fn()
}

const mockRoute = {
  query: {}
}

vi.mock('#app', () => ({
  useRouter: () => mockRouter,
  useRoute: () => mockRoute
}))

describe('usePagination', () => {
  const mockItems = [
    {
      id: 1,
      quote: 'C\'est pas faux !',
      characters: ['Perceval'],
      episode: 'Le donjon de naheulbeuk',
      season: 1
    },
    {
      id: 2,
      quote: 'C\'est pas faux !',
      characters: ['Perceval'],
      episode: 'Le donjon de naheulbeuk',
      season: 1
    },
    {
      id: 3,
      quote: 'C\'est pas faux !',
      characters: ['Perceval'],
      episode: 'Le donjon de naheulbeuk',
      season: 1
    }
  ]

  beforeEach(() => {
    mockRoute.query = {}
    mockRouter.push.mockClear()
  })

  test('should initialize with default values', () => {
    const { currentPage, totalPages, paginatedItems } = usePagination({
      items: mockItems
    })

    expect(currentPage.value).toBe(1)
    expect(totalPages.value).toBe(1)
    expect(paginatedItems.value.length).toBe(3)
  })

  test('should use custom itemsPerPage', () => {
    const { totalPages, paginatedItems } = usePagination({
      items: mockItems,
      itemsPerPage: 2
    })

    expect(totalPages.value).toBe(2)
    expect(paginatedItems.value.length).toBe(2)
  })

  test('should handle page change correctly', () => {
    const { currentPage, handlePageChange } = usePagination({
      items: mockItems,
      itemsPerPage: 2
    })

    handlePageChange(2)
    expect(currentPage.value).toBe(2)

    // Should not set page if out of bounds
    handlePageChange(0)
    expect(currentPage.value).toBe(2)
    handlePageChange(3)
    expect(currentPage.value).toBe(2)
  })

  test('should filter items by search query', () => {
    const { paginatedItems, handleSearch } = usePagination({
      items: mockItems
    })

    handleSearch('faux', '')
    expect(paginatedItems.value.length).toBe(3)

    handleSearch('autre', '')
    expect(paginatedItems.value.length).toBe(0)
  })

  test('should filter items by character', () => {
    const { paginatedItems, handleSearch } = usePagination({
      items: mockItems
    })

    handleSearch('', 'Perceval')
    expect(paginatedItems.value.length).toBe(3)

    handleSearch('', 'Arthur')
    expect(paginatedItems.value.length).toBe(0)
  })

  test('should filter items by both search and character', () => {
    const { paginatedItems, handleSearch } = usePagination({
      items: mockItems
    })

    handleSearch('faux', 'Perceval')
    expect(paginatedItems.value.length).toBe(3)

    handleSearch('faux', 'Arthur')
    expect(paginatedItems.value.length).toBe(0)
  })

  test('should reset to first page on new search', () => {
    const { currentPage, handleSearch, handlePageChange } = usePagination({
      items: mockItems,
      itemsPerPage: 2
    })

    handlePageChange(2)
    expect(currentPage.value).toBe(2)

    handleSearch('faux', '')
    expect(currentPage.value).toBe(1)
  })

  test('should use custom search and character fields', () => {
    const customItems = [
      {
        id: 1,
        text: 'C\'est pas faux !',
        actors: ['Perceval'],
        episode: 'Le donjon de naheulbeuk',
        season: 1
      }
    ]

    const { paginatedItems, handleSearch } = usePagination({
      items: customItems,
      searchField: 'text',
      characterField: 'actors'
    })

    handleSearch('faux', 'Perceval')
    expect(paginatedItems.value.length).toBe(1)
  })

  test('should handle empty search', () => {
    const { paginatedItems, handleSearch } = usePagination({
      items: mockItems
    })

    handleSearch('', '')
    expect(paginatedItems.value.length).toBe(3)
  })

  test('should handle URL query parameters', () => {
    mockRoute.query = {
      page: '2',
      q: 'faux',
      character: 'Perceval'
    }

    const { currentPage, searchQuery, selectedCharacter } = usePagination({
      items: mockItems
    })

    expect(currentPage.value).toBe(2)
    expect(searchQuery.value).toBe('faux')
    expect(selectedCharacter.value).toBe('Perceval')
  })
}) 
