import { defineStore } from "pinia";
import { useUserStore } from "./useUserSotre";
import { computed } from "vue";
import type { EType, ITransaction } from "@/models/transaction.interface";



export const useBudgetStore = defineStore('budget', () => {


  const userStore = useUserStore();
  const transactions = computed(() => userStore.user.transactions);
  const transactionService = userStore.transactionService;

  const loadTransactions = async () => {
    await userStore.loadUserData(userStore.user.email);
  }

  const getTotalByType = (type: EType) => {
    if (!transactions.value || !Array.isArray(transactions.value)) {
      return 0;
    }
    return transactions.value
      .filter(transaction => transaction.type === type)
      .reduce((acc, transaction) => acc + (Number(transaction.amount) || 0), 0);
  }


  const addTransactionByType = async (transaction: Omit<ITransaction, "id" | "type">,type: EType) => {
    if (typeof userStore.user.id !== 'number') {
      throw new Error("ID utilisateur non valide");
    }
    await transactionService.CREATE_TRANSACTION_BY_USER_ID(userStore.user.id, {...transaction, type});
    await loadTransactions();
  }

  const deleteTransaction = async (idTransaction: number) => {
    if (typeof userStore.user.id !== 'number') {
      throw new Error("ID utilisateur non valide");
    }
    await transactionService.DELETE_TRANSACTION_BY_USER_ID_AND_TRANSACTION_ID(userStore.user.id, idTransaction);
    await loadTransactions();
  }

  const updateTransaction = async (idTransaction: number, transaction: ITransaction) => {
    if (typeof userStore.user.id !== 'number') {
      throw new Error("ID utilisateur non valide");
    }
    await transactionService.UPDATE_TRANSACTION_BY_USER_ID_AND_TRANSACTION_ID(userStore.user.id, idTransaction, transaction);
    await loadTransactions();
  }








  return {
    transactions,
    transactionService,
    loadTransactions,
    getTotalByType,
    addTransactionByType,
    deleteTransaction,
    updateTransaction
  }

})