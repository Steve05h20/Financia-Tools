import { defineStore } from 'pinia'
import { useUserStore } from './useUserSotre'
import { ref } from 'vue'
import type { EType, ITransaction } from '@/models/transaction.interface'

export const useBudgetStore = defineStore('budget', () => {
  const userStore = useUserStore()
  const transactions = ref<ITransaction[]>([])
  const error = ref<string | null>(null)
  const loading = ref(false)

  const loadTransactions = async () => {
    try {
      loading.value = true
      error.value = null



      // Toujours copier les transactions pour garantir la réactivité
      transactions.value = [...(userStore.user.transactions || [])]
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

  const updateLocalTransaction = (idTransaction: number, updatedTransaction: Partial<ITransaction>) => {
    const index = transactions.value.findIndex(t => t.id === idTransaction)
    if (index !== -1) {
      transactions.value[index] = { ...transactions.value[index], ...updatedTransaction }
    }
  }

  const removeLocalTransaction = (idTransaction: number) => {
    transactions.value = transactions.value.filter(t => t.id !== idTransaction)
  }

  const addLocalTransaction = (transaction: ITransaction) => {
    transactions.value.push(transaction)
  }

  const updateTransaction = async (idTransaction: number, transaction: Partial<ITransaction>) => {
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

      // Mise à jour locale immédiate
      updateLocalTransaction(idTransaction, transaction)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors de la mise à jour de la transaction'
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

      // Suppression locale immédiate
      removeLocalTransaction(idTransaction)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors de la suppression de la transaction'
      console.error(error.value)
      throw err
    } finally {
      loading.value = false
    }
  }

  const addTransactionByType = async (transaction: Omit<ITransaction, 'id' | 'type'>, type: EType) => {
    try {
      if (typeof userStore.user.id !== 'number') {
        throw new Error('ID utilisateur non valide')
      }

      loading.value = true
      error.value = null

      const response = await userStore.transactionService.CREATE_TRANSACTION_BY_USER_ID(userStore.user.id, {
        ...transaction,
        type,
      })

      // Ajout local immédiat si la réponse est une transaction
      if (response && typeof response === 'object' && 'id' in response) {
        addLocalTransaction(response as ITransaction)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erreur lors de la création de la transaction'
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
