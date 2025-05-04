/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from '#app'

interface UsePaginationOptions<T> {
  items: T[]
  itemsPerPage?: number
  searchField?: string
  characterField?: string
}

export function usePagination<T>(options: UsePaginationOptions<T>) {
  const router = useRouter()
  const route = useRoute()
  
  const {
    items,
    itemsPerPage = 21,
    searchField = 'quote',
    characterField = 'characters'
  } = options

  const currentPage = ref(1)
  const searchQuery = ref('')
  const selectedCharacter = ref('')

  // Initialize from URL query parameters
  if (route.query.page) {
    currentPage.value = Number(route.query.page)
  }
  if (route.query.q) {
    searchQuery.value = String(route.query.q)
  }
  if (route.query.character) {
    selectedCharacter.value = String(route.query.character)
  }

  const filteredItems = computed(() => {
    return items.filter(item => {
      const matchesSearch = !searchQuery.value || 
        String((item as Record<string, any>)[searchField]).toLowerCase().includes(searchQuery.value.toLowerCase())
      
      const matchesCharacter = selectedCharacter.value === '' || 
        ((item as Record<string, any>)[characterField] && 
        (item as Record<string, any>)[characterField].includes(selectedCharacter.value))

      return matchesSearch && matchesCharacter
    })
  })

  const totalPages = computed(() => 
    Math.ceil(filteredItems.value.length / itemsPerPage)
  )

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredItems.value.slice(start, end)
  })

  const updateUrl = () => {
    const query: Record<string, string> = {}
    
    if (searchQuery.value) {
      query.q = searchQuery.value
    }
    if (selectedCharacter.value) {
      query.character = selectedCharacter.value
    }
    if (currentPage.value > 1) {
      query.page = String(currentPage.value)
    }

    router.push({ query })
  }

  const handleSearch = (query: string, character: string) => {
    searchQuery.value = query
    selectedCharacter.value = character
    currentPage.value = 1
    updateUrl()
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
      updateUrl()
    }
  }

  // Watch for URL changes
  watch(() => route.query, newQuery => {
    if (newQuery.page) {
      currentPage.value = Number(newQuery.page)
    } else {
      currentPage.value = 1
    }

    if (newQuery.q) {
      searchQuery.value = String(newQuery.q)
    }
    if (newQuery.character) {
      selectedCharacter.value = String(newQuery.character)
    } else {
      selectedCharacter.value = ''
    }
  })

  return {
    currentPage,
    totalPages,
    paginatedItems,
    searchQuery,
    selectedCharacter,
    handleSearch,
    handlePageChange
  }
} 
