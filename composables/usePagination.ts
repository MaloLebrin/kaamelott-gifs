import { ref, computed } from 'vue'

interface UsePaginationOptions<T> {
  items: T[]
  itemsPerPage?: number
  initialPage?: number
}

export function usePagination<T>(options: UsePaginationOptions<T>) {
  const {
    items,
    itemsPerPage = 21,
    initialPage = 1
  } = options

  const router = useRouter()
  const currentPage = ref(initialPage)
  const totalPages = computed(() => Math.ceil(items.length / itemsPerPage))

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return items.slice(start, end)
  })

  const setPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
      router.push({
        query: {
          page: page
        }
      })
    }
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
      router.push({
        query: {
          page: currentPage.value
        }
      })
    }
  }

  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
      router.push({
        query: {
          page: currentPage.value
        }
      })
    }
  }

  return {
    currentPage,
    totalPages,
    paginatedItems,
    setPage,
    nextPage,
    previousPage
  }
} 
