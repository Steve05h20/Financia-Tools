import type { ISchoolDetails } from '@/models/schoolDetails.interface'
import { ref } from 'vue'

const API_URL = 'https://money-pie-3.fly.dev/api/v1/users/{userId}/school-details'

enum ErrorMessage {
  USER_NOT_FOUND = 'Utilisateur non trouvé',
  SCHOOL_DETAILS_NOT_FOUND = "L'utilisateur n'a pas de détails scolaires",
  SERVER_ERROR = 'Erreur lors de la récupération des détails scolaires',
  INVALID_USER_ID = '⚠️ Le paramètre userId doit être un nombre entier positif',
}

const handleErrorResponse = (status: number, errorData: { message: string }): never => {
  if (status === 404) {
    if (errorData.message?.includes('not found')) {
      throw new Error(ErrorMessage.USER_NOT_FOUND)
    }
    if (errorData.message?.includes('does not have any saved school details')) {
      throw new Error(ErrorMessage.SCHOOL_DETAILS_NOT_FOUND)
    }
  }
  throw new Error(ErrorMessage.SERVER_ERROR)
}

const validateUserId = (userId: number): void => {
  console.assert(typeof userId === 'number' && userId >= 0, ErrorMessage.INVALID_USER_ID)
}

export const useFetchSchoolDetails = () => {
  const schoolDetails = ref<ISchoolDetails | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const GET_SCHOOL_DETAILS_BY_USER_ID = async (userId: number): Promise<void> => {
    validateUserId(userId)
    error.value = null
    loading.value = true

    try {
      const response = await fetch(API_URL.replace('{userId}', userId.toString()))

      switch (response.status) {
        case 200: {
          const data = await response.json()
          if (!data) {
            throw new Error(ErrorMessage.SCHOOL_DETAILS_NOT_FOUND)
          }
          schoolDetails.value = data
          break
        }
        default: {
          const errorData = await response.json()
          handleErrorResponse(response.status, errorData)
        }
      }
    } catch (err: unknown) {
      schoolDetails.value = null
      error.value = err instanceof Error ? err.message : ErrorMessage.SERVER_ERROR
    } finally {
      loading.value = false
    }
  }

  const PUT_SCHOOL_DETAILS_BY_USER_ID = async (userId: number, details: ISchoolDetails) => {
    validateUserId(userId)
    error.value = null
    loading.value = true

    try {
      const response = await fetch(API_URL.replace('{userId}', userId.toString()), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details),
      })

      switch (response.status) {
        case 200: {
          GET_SCHOOL_DETAILS_BY_USER_ID(userId)
          break
        }
        default: {
          const errorData = await response.json()
          handleErrorResponse(response.status, errorData)
        }
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : ErrorMessage.SERVER_ERROR
    } finally {
      loading.value = false
    }
  }

  const DELETE_SCHOOL_DETAILS_BY_USER_ID = async (userId: number) => {
    validateUserId(userId)
    error.value = null
    loading.value = true

    try {
      const response = await fetch(API_URL.replace('{userId}', userId.toString()), {
        method: 'DELETE',
      })

      switch (response.status) {
        case 200: {
          schoolDetails.value = null
          break
        }
        default: {
          const errorData = await response.json()
          handleErrorResponse(response.status, errorData)
        }
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : ErrorMessage.SERVER_ERROR
    } finally {
      loading.value = false
    }
  }

  return {
    schoolDetails,
    loading,
    error,
    GET_SCHOOL_DETAILS_BY_USER_ID,
    PUT_SCHOOL_DETAILS_BY_USER_ID,
    DELETE_SCHOOL_DETAILS_BY_USER_ID,
  }
}
