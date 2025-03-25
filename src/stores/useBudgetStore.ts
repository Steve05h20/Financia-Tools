import { defineStore } from 'pinia'
import { useUserStore } from './useUserSotre'
import { computed, ref } from 'vue'
import type { EType, ITransaction } from '@/models/transaction.interface'

export const useBudgetStore = defineStore('budget', () => {
  const userStore = useUserStore()
  const transactions = computed(() => userStore.user.transactions || [])
  const transactionService = userStore.transactionService

  const error = ref<string | null>(null)
  const loading = ref(false)

  const loadTransactions = async () => {
    try {
      loading.value = true
      error.value = null
      await userStore.loadUserData(userStore.user.email)
      console.log('Transactions chargées :', transactions.value)
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

      const newTransaction = await transactionService.CREATE_TRANSACTION_BY_USER_ID(userStore.user.id, {
        ...transaction,
        type,
      })


      if (userStore.user.transactions && newTransaction) {
        userStore.user.transactions.push(newTransaction)
      }

      await loadTransactions()
      console.log('Transactions après ajout :', transactions.value)
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

      await transactionService.DELETE_TRANSACTION_BY_USER_ID_AND_TRANSACTION_ID(userStore.user.id, idTransaction)
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

      await transactionService.UPDATE_TRANSACTION_BY_USER_ID_AND_TRANSACTION_ID(
        userStore.user.id,
        idTransaction,
        transaction
      )
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
    transactionService,
    loadTransactions,
    getTotalByType,
    addTransactionByType,
    deleteTransaction,
    updateTransaction,
    error,
    loading,
  }
})
