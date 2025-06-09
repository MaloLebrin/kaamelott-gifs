import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest'
import { usePagination } from './usePagination'
import { ref, watch } from 'vue'

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

// Mock useDebounce
vi.mock('@vueuse/core', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useDebounce: (value: any, delay: number) => {
    const debounced = ref(value.value)
    let timeout: NodeJS.Timeout

    watch(value, newValue => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        debounced.value = newValue
      }, delay)
    })

    return debounced
  }
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
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
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

  test('should filter items by search query with debounce', async () => {
    const { paginatedItems, handleSearch, searchQuery } = usePagination({
      items: mockItems,
      searchDebounceMs: 300
    })

    // Simuler une recherche rapide
    handleSearch('f', '')
    expect(searchQuery.value).toBe('f')
    expect(paginatedItems.value.length).toBe(3) // Pas encore filtré car debounce

    // Avancer le temps pour déclencher le debounce
    await vi.advanceTimersByTimeAsync(300)
    expect(paginatedItems.value.length).toBe(3) // Maintenant filtré avec 'f'

    // Simuler une autre recherche
    handleSearch('autre', '')
    expect(searchQuery.value).toBe('autre')
    expect(paginatedItems.value.length).toBe(3) // Pas encore filtré car debounce

    // Avancer le temps pour déclencher le debounce
    await vi.advanceTimersByTimeAsync(300)
    expect(paginatedItems.value.length).toBe(0) // Maintenant filtré avec 'autre'
  })

  test('should filter items by character without debounce', () => {
    const { paginatedItems, handleSearch, selectedCharacter } = usePagination({
      items: mockItems
    })

    handleSearch('', 'Perceval')
    expect(selectedCharacter.value).toBe('Perceval')
    expect(paginatedItems.value.length).toBe(3)

    handleSearch('', 'Arthur')
    expect(selectedCharacter.value).toBe('Arthur')
    expect(paginatedItems.value.length).toBe(0)
  })

  test('should filter items by both search and character', async () => {
    const { paginatedItems, handleSearch, searchQuery, selectedCharacter } = usePagination({
      items: mockItems,
      searchDebounceMs: 300
    })

    handleSearch('faux', 'Perceval')
    expect(searchQuery.value).toBe('faux')
    expect(selectedCharacter.value).toBe('Perceval')
    expect(paginatedItems.value.length).toBe(3) // Pas encore filtré par la recherche

    // Avancer le temps pour déclencher le debounce
    await vi.advanceTimersByTimeAsync(300)
    expect(paginatedItems.value.length).toBe(3) // Maintenant filtré par la recherche

    handleSearch('faux', 'Arthur')
    expect(searchQuery.value).toBe('faux')
    expect(selectedCharacter.value).toBe('Arthur')
    expect(paginatedItems.value.length).toBe(0) // Filtrage immédiat par personnage

    // Avancer le temps pour déclencher le debounce
    await vi.advanceTimersByTimeAsync(300)
    expect(paginatedItems.value.length).toBe(0) // Toujours filtré par personnage
  })

  test('should reset to first page on new search', async () => {
    const { currentPage, handleSearch, handlePageChange } = usePagination({
      items: mockItems,
      itemsPerPage: 2,
      searchDebounceMs: 300
    })

    handlePageChange(2)
    expect(currentPage.value).toBe(2)

    handleSearch('faux', '')
    expect(currentPage.value).toBe(1) // Reset immédiat à la première page

    // Avancer le temps pour déclencher le debounce
    await vi.advanceTimersByTimeAsync(300)
    expect(currentPage.value).toBe(1) // Toujours à la première page
  })

  test('should use custom search and character fields', async () => {
    const customItems = [
      {
        id: 1,
        text: 'C\'est pas faux !',
        actors: ['Perceval'],
        episode: 'Le donjon de naheulbeuk',
        season: 1
      }
    ]

    const { paginatedItems, handleSearch, searchQuery, selectedCharacter } = usePagination({
      items: customItems,
      searchField: 'text',
      characterField: 'actors',
      searchDebounceMs: 300
    })

    handleSearch('faux', 'Perceval')
    expect(searchQuery.value).toBe('faux')
    expect(selectedCharacter.value).toBe('Perceval')
    expect(paginatedItems.value.length).toBe(1) // Pas encore filtré par la recherche

    // Avancer le temps pour déclencher le debounce
    await vi.advanceTimersByTimeAsync(300)
    expect(paginatedItems.value.length).toBe(1) // Maintenant filtré par la recherche
  })

  test('should handle empty search', async () => {
    const { paginatedItems, handleSearch, searchQuery } = usePagination({
      items: mockItems,
      searchDebounceMs: 300
    })

    handleSearch('', '')
    expect(searchQuery.value).toBe('')
    expect(paginatedItems.value.length).toBe(3) // Pas encore filtré

    // Avancer le temps pour déclencher le debounce
    await vi.advanceTimersByTimeAsync(300)
    expect(paginatedItems.value.length).toBe(3) // Maintenant filtré
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

  test('should use custom debounce delay', async () => {
    const { paginatedItems, handleSearch, searchQuery } = usePagination({
      items: mockItems,
      searchDebounceMs: 500
    })

    handleSearch('faux', '')
    expect(searchQuery.value).toBe('faux')
    expect(paginatedItems.value.length).toBe(3) // Pas encore filtré

    // Avancer le temps de moins que le délai
    await vi.advanceTimersByTimeAsync(300)
    expect(paginatedItems.value.length).toBe(3) // Toujours pas filtré

    // Avancer le temps jusqu'au délai complet
    await vi.advanceTimersByTimeAsync(200)
    expect(paginatedItems.value.length).toBe(3) // Maintenant filtré
  })
}) 
