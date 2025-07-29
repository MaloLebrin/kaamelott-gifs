/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRoute, useRouter } from '#app'
import { useDebounce } from '@vueuse/core'
import { computed, ref, watch } from 'vue'

/** Options de configuration pour le composable de pagination */
interface UsePaginationOptions<T> {
  /** Liste des éléments à paginer */
  items: T[]
  /** Nombre d'éléments par page (défaut: 21) */
  itemsPerPage?: number
  /** Champ à utiliser pour la recherche (défaut: 'quote') */
  searchField?: string
  /** Champ à utiliser pour le filtrage par personnage (défaut: 'characters') */
  characterField?: string
  /** Délai de debounce pour la recherche en ms (défaut: 300) */
  searchDebounceMs?: number
}

/**
 * Composable pour gérer la pagination, la recherche et le filtrage d'une liste d'éléments.
 * Gère automatiquement la synchronisation avec l'URL pour permettre le partage et la navigation.
 * 
 * @template T - Le type des éléments à paginer
 * @param options - Les options de configuration
 * @param options.items - Liste des éléments à paginer
 * @param [options.itemsPerPage=21] - Nombre d'éléments par page
 * @param [options.searchField='quote'] - Champ à utiliser pour la recherche
 * @param [options.characterField='characters'] - Champ à utiliser pour le filtrage par personnage
 * @param [options.searchDebounceMs=300] - Délai de debounce pour la recherche en ms
 * 
 * @returns Un objet contenant l'état et les méthodes de pagination
 * @property {Ref<number>} currentPage - La page courante
 * @property {ComputedRef<number>} totalPages - Le nombre total de pages
 * @property {ComputedRef<T[]>} paginatedItems - Les éléments de la page courante
 * @property {Ref<string>} searchQuery - La requête de recherche
 * @property {Ref<string>} selectedCharacter - Le personnage sélectionné
 * @property {Function} handleSearch - Fonction pour gérer la recherche et le filtrage
 * @property {Function} handlePageChange - Fonction pour changer de page
 * 
 * @example
 * ```ts
 * const { currentPage, totalPages, paginatedItems, handleSearch, handlePageChange } = usePagination({
 *   items: gifs,
 *   itemsPerPage: 12,
 *   searchField: 'quote',
 *   characterField: 'characters',
 *   searchDebounceMs: 300
 * })
 * ```
 */
export function usePagination<T>(options: UsePaginationOptions<T>) {
  const router = useRouter()
  const route = useRoute()
  
  const {
    items,
    itemsPerPage = 21,
    searchField = 'quote',
    characterField = 'characters',
    searchDebounceMs = 300
  } = options

  const currentPage = ref(1)
  const searchQuery = ref('')
  const selectedCharacter = ref('')

  // Ajouter le debounce sur la recherche
  const debouncedSearchQuery = useDebounce(searchQuery, searchDebounceMs)

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
      const matchesSearch = !debouncedSearchQuery.value || 
        String((item as Record<string, any>)[searchField]).toLowerCase().includes(debouncedSearchQuery.value.toLowerCase())
      
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
