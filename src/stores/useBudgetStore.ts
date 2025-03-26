import { defineStore } from 'pinia'
<<<<<<< HEAD
import { useUserStore } from './useUserSotre' // Note : corrigez "useUserSotre" en "useUserStore" dans votre code
import { computed, ref } from 'vue'
=======
import { useUserStore } from './useUserSotre'
import { ref } from 'vue'
>>>>>>> refs/remotes/origin/PageBudget/cristian
import type { EType, ITransaction } from '@/models/transaction.interface'

export const useBudgetStore = defineStore('budget', () => {
  const userStore = useUserStore()
<<<<<<< HEAD
  const transactions = computed(() => userStore.user.transactions || []) // Ajout d'un fallback si transactions est undefined
  const transactionService = userStore.transactionService

=======
  const transactions = ref<ITransaction[]>([])
>>>>>>> refs/remotes/origin/PageBudget/cristian
  const error = ref<string | null>(null)
  const loading = ref(false)

  const loadTransactions = async () => {
    try {
      loading.value = true
      error.value = null
<<<<<<< HEAD
      await userStore.loadUserData(userStore.user.email)
      console.log('Transactions chargées :', transactions.value) // Débogage
=======

      // Ne pas recharger les données utilisateur si nous les avons déjà
      if (!userStore.user || !userStore.user.email) {
        console.log('Pas d\'utilisateur connecté, chargement des données utilisateur...')
        await userStore.loadUserData(userStore.user?.email || 'test@test.com')
      } else {
        console.log('Utilisateur déjà chargé, utilisation des transactions existantes')
      }

      // Toujours copier les transactions pour garantir la réactivité
      transactions.value = [...(userStore.user.transactions || [])]
      console.log('Transactions chargées :', transactions.value)
>>>>>>> refs/remotes/origin/PageBudget/cristian
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur de chargement des transactions'
      console.error(error.value)
    } finally {
      loading.value = false
    }
  }

  const getTotalByType = (type: EType) => {
    if (!transactions.value || !Array.isArray(transactions.value)) {
      return 0
    }
    return transactions.value
      .filter((transaction) => transaction.type === type)
      .reduce((acc, transaction) => acc + (Number(transaction.amount) || 0), 0)
  }

  const addTransactionByType = async (transaction: Omit<ITransaction, 'id' | 'type'>, type: EType) => {
    try {
      if (typeof userStore.user.id !== 'number') {
        throw new Error('ID utilisateur non valide')
      }

      loading.value = true
      error.value = null

      await userStore.transactionService.CREATE_TRANSACTION_BY_USER_ID(userStore.user.id, {
        ...transaction,
        type,
      })

<<<<<<< HEAD
      // Ajout temporaire pour mise à jour immédiate (optionnel si l'API retourne la transaction)
      if (userStore.user.transactions && newTransaction) {
        userStore.user.transactions.push(newTransaction)
      }

      await loadTransactions() // Recharge les données pour synchronisation
      console.log('Transactions après ajout :', transactions.value) // Débogage
=======
      // Recharger les transactions pour être sûr d'avoir les données à jour
      await loadTransactions()

      console.log('Transactions après ajout :', transactions.value)
>>>>>>> refs/remotes/origin/PageBudget/cristian
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors de la création de la transaction'
      console.error(error.value)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteTransaction = async (idTransaction: number) => {
    try {
      if (typeof userStore.user.id !== 'number') {
        throw new Error('ID utilisateur non valide')
      }

      loading.value = true
      error.value = null

      await userStore.transactionService.DELETE_TRANSACTION_BY_USER_ID_AND_TRANSACTION_ID(
        userStore.user.id,
        idTransaction
      )

      // Recharger les transactions
      await loadTransactions()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors de la suppression de la transaction'
      console.error(error.value)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateTransaction = async (idTransaction: number, transaction: ITransaction) => {
    try {
      if (typeof userStore.user.id !== 'number') {
        throw new Error('ID utilisateur non valide')
      }

      loading.value = true
      error.value = null

      await userStore.transactionService.UPDATE_TRANSACTION_BY_USER_ID_AND_TRANSACTION_ID(
        userStore.user.id,
        idTransaction,
        transaction
      )

      // Recharger les transactions
      await loadTransactions()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors de la mise à jour de la transaction'
      console.error(error.value)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    transactions,
    loadTransactions,
    getTotalByType,
    addTransactionByType,
    deleteTransaction,
    updateTransaction,
    error,
    loading,
  }
})
