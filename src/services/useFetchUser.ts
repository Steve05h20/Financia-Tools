import { ref } from 'vue'
import type { IUser } from "@/models/user.interface"

export default function useFetchUser() {
  const user = ref<IUser | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<any>(null)

  const GET_USER_BY_ID = async (userId: number): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`https://money-pie-3.fly.dev/api/v1/users/${userId}`)

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }
      const data = await response.json()
      console.log('Données reçues:', data)
      user.value = data
      }
     catch (err) {
      error.value = err
      console.error('Erreur lors de la récupération de l\'utilisateur:', err)
    } finally {
      loading.value = false
    }
  }

  const POST_USER = async (newUser: IUser): Promise<void> => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch('https://money-pie-3.fly.dev/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      const data = await response.json()
      console.log('Données reçues après création:', data)
      user.value = data
     } catch(err){
        error.value = err
        console.error('Erreur lors de la récupération de l\'utilisateur:', err)
      } finally {
        loading.value = false
      }
    }

    const PUT_USER = async (userId: number, userData: IUser): Promise<void> => {
      loading.value = true
      error.value = null

      try {
        const response = await fetch(`https://money-pie-3.fly.dev/api/v1/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        })

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`)
        }

        const data = await response.json()
        console.log('Données reçues après création:', data)
        user.value = data
       } catch(err){
          error.value = err
          console.error('Erreur lors de la récupération de l\'utilisateur:', err)
        } finally {
          loading.value = false
        }
      }


    const DELETE_USER = async (userId: number): Promise<void> => {
      loading.value = true
      error.value = null

      try {
        const response = await fetch(`https://money-pie-3.fly.dev/api/v1/users/${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        })

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`)
        }

        const data = await response.json()
        console.log('Données reçues après suppression:', data)
        user.value = null
       } catch(err){
          error.value = err
          console.error('Erreur lors de la récupération de l\'utilisateur:', err)
        } finally {
          loading.value = false
        }
      }


  return {
    user,
    loading,
    error,
    GET_USER_BY_ID,
    POST_USER,
    PUT_USER,
    DELETE_USER,
  }
}

