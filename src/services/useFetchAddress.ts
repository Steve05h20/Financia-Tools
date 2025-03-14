import type { IAddress } from '@/models/address.interface'
import { EAddressType } from '@/models/address.interface'

import { ref } from 'vue'

const API_URL = 'https://money-pie-3.fly.dev/api/v1/users/{userId}/addresses'


enum ErrorMessage {
  USER_NOT_FOUND = 'Utilisateur non trouvé',
  ADDRESS_NOT_FOUND = "L'utilisateur n'a pas d'adresses",
  ADDRESS_TYPE_NOT_FOUND = "L'utilisateur n'a pas d'adresse de ce type",
  SERVER_ERROR = 'Erreur lors de la récupération des adresses',
  INVALID_USER_ID = '⚠️ Le paramètre userId doit être un nombre entier positif',
  INVALID_ADDRESS_TYPE = '⚠️ Le type d\'adresse n\'est pas valide',
  NOTADDRESS_PERSONAL = ' ⚠️ L\'utilisateur n\'a pas d\'adresse personnelle',
  NOTADDRESS_WORK = '⚠️ L\'utilisateur n\'a pas d\'adresse professionnelle',
}

const handleErrorResponse = (status: number, errorData: { message: string }): never => {
  if (status === 404) {
    if (errorData.message?.includes('not found')) {
      throw new Error(ErrorMessage.USER_NOT_FOUND)
    }
    if (errorData.message?.includes('does not have any addresses')) {
      throw new Error(ErrorMessage.ADDRESS_NOT_FOUND)
    }
    if (errorData.message?.includes('does not have an address of type PERSONAL')) {
      throw new Error(ErrorMessage.NOTADDRESS_PERSONAL)
    }
    if (errorData.message?.includes('does not have an address of type WORK')) {
      throw new Error(ErrorMessage.NOTADDRESS_WORK)
    }
  }
  throw new Error(ErrorMessage.SERVER_ERROR)
}

const validateUserId = (userId: number): void => {
  console.assert(typeof userId === 'number' && userId >= 0, ErrorMessage.INVALID_USER_ID)
}

const validateAddressType = (addressType: EAddressType): void => {
  console.assert(
    Object.values(EAddressType).includes(addressType),
    ErrorMessage.INVALID_ADDRESS_TYPE
  )
}

export const useFetchAddress = () => {
  const addresses = ref<IAddress[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)


  const getAddressesByUserId = async (userId: number): Promise<void> => {
    validateUserId(userId)
    error.value = null
    loading.value = true

    try {
      const response = await fetch(API_URL.replace('{userId}', userId.toString()))

      switch (response.status) {
        case 200: {
          const data = await response.json()
          if (!data || !Array.isArray(data)) {
            throw new Error(ErrorMessage.ADDRESS_NOT_FOUND)
          }

          if (data.length === 0) {
            throw new Error(ErrorMessage.ADDRESS_NOT_FOUND)
          }
          addresses.value = data
          break
        }
        default: {
          const errorData = await response.json()
          handleErrorResponse(response.status, errorData)
        }
      }
    } catch (err: unknown) {
      addresses.value = []
      error.value = err instanceof Error ? err.message : ErrorMessage.SERVER_ERROR
    } finally {
      loading.value = false
    }
  }


  const getAddressByType = async (userId: number, addressType: EAddressType): Promise<void> => {
    validateUserId(userId)
    validateAddressType(addressType)
    error.value = null
    loading.value = true

    try {
      const url = API_URL.replace('{userId}', userId.toString())+"/"+addressType


      const response = await fetch(url)

      switch (response.status) {
        case 200: {
          const data = await response.json()
          if (!data) {
            if (addressType === EAddressType.PERSONAL) {
            throw new Error(ErrorMessage.NOTADDRESS_PERSONAL)
          } else {
            throw new Error(ErrorMessage.NOTADDRESS_WORK)
          }}
          addresses.value = data

          break
        }
        default: {
          const errorData = await response.json()
          handleErrorResponse(response.status, errorData)
        }
      }
    } catch (err: unknown) {
      addresses.value = []
      error.value = err instanceof Error ? err.message : ErrorMessage.SERVER_ERROR
    } finally {
      loading.value = false
    }
  }


  const putAddressesByUserId = async (userId: number, addressData: Partial<EAddressType>): Promise<void> => {
    validateUserId(userId)
    error.value = null
    loading.value = true

    try {
      const response = await fetch(API_URL.replace('{userId}', userId.toString()), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addressData),
      })

      switch (response.status) {
        case 200: {
          await getAddressesByUserId(userId)
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


  const deleteAddressByType = async (userId: number, addressType: EAddressType): Promise<void> => {
    validateUserId(userId)
    validateAddressType(addressType)
    error.value = null
    loading.value = true

    try {
      const url = API_URL.replace('{userId}', userId.toString()) + "/" + addressType


      const response = await fetch(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })

      switch (response.status) {
        case 200:
        case 204: {

          await getAddressesByUserId(userId)

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
    addresses,
    loading,
    error,
    getAddressesByUserId,
    getAddressByType,
    putAddressesByUserId,
    deleteAddressByType,
    EAddressType
  }
}
