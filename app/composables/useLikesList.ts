import { type LikeableEntity } from '~~/shared/types/Entities'
import type { LikeWithRelation } from '~~/shared/types/Like'

interface UseLikesListOptions {
  /** Type d'entité à filtrer (optionnel) */
  entityType?: LikeableEntity
  /** Nombre d'éléments par page */
  itemsPerPage?: number
}

interface LikesListResponse {
  /** Liste des likes avec leurs relations */
  likes: LikeWithRelation[]
  /** Nombre total de likes */
  total: number
  /** Page courante */
  page: number
  /** Nombre d'éléments par page */
  itemsPerPage: number
  /** Nombre total de pages */
  totalPages: number
}

/**
 * Composable pour gérer la liste des likes avec pagination et filtrage
 * 
 * @param {UseLikesListOptions} options - Options de configuration
 * @returns {Object} Un objet contenant l'état et les méthodes de gestion des likes
 * @property {Ref<LikeWithRelation[]>} likes - Liste des likes
 * @property {Ref<number>} currentPage - Page courante
 * @property {Ref<number>} totalPages - Nombre total de pages
 * @property {Ref<boolean>} isLoading - Indique si le chargement est en cours
 * @property {Ref<Error | null>} error - Erreur éventuelle
 * @property {Function} setPage - Fonction pour changer de page
 * @property {Function} setEntityType - Fonction pour changer le type d'entité
 * @property {Function} refresh - Fonction pour rafraîchir la liste
 */
export const useLikesList = (options: UseLikesListOptions = {}) => {
  const route = useRoute()
  const router = useRouter()

  // États
  const currentPage = ref(Number(route.query.page) || 1)
  const selectedType = ref<LikeableEntity | undefined>(route.query.type as LikeableEntity || options.entityType)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  // Requête pour récupérer les likes
  const { data, refresh } = useFetch<LikesListResponse>('/api/likes', {
    query: computed(() => ({
      type: selectedType.value,
      page: currentPage.value,
      itemsPerPage: options.itemsPerPage || 21
    })),
    onRequest() {
      isLoading.value = true
      error.value = null
    },
    onResponse() {
      isLoading.value = false
    },
    onResponseError({ response }) {
      isLoading.value = false
      error.value = new Error(response._data?.message || 'Erreur lors de la récupération des favoris')
    }
  })

  // Computed properties
  const likes = computed(() => data.value?.likes || [])
  const totalPages = computed(() => data.value?.totalPages || 0)

  // Méthodes
  const setPage = (page: number) => {
    currentPage.value = page
    router.push({
      query: {
        ...route.query,
        page: page.toString()
      }
    })
  }

  const setEntityType = (type: LikeableEntity | undefined) => {
    selectedType.value = type
    currentPage.value = 1 // Réinitialiser la page à 1 lors du changement de type
    router.push({
      query: {
        ...route.query,
        type: type || undefined,
        page: '1'
      }
    })
  }

  // Watcher pour les changements d'URL
  watch(
    () => route.query,
    newQuery => {
      // Mettre à jour le type sélectionné
      const newType = newQuery.type as LikeableEntity | undefined
      if (newType !== selectedType.value) {
        selectedType.value = newType
      }

      // Mettre à jour la page
      const newPage = Number(newQuery.page) || 1
      if (newPage !== currentPage.value) {
        currentPage.value = newPage
      }
    },
    { immediate: true }
  )

  return {
    likes,
    currentPage,
    totalPages,
    isLoading,
    error,
    selectedType,
    setPage,
    setEntityType,
    refresh
  }
} 
