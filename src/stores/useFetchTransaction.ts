import type { ITransaction } from "@/models/transaction.interface"
import { ref } from "vue"

const API_URL = "https://money-pie-3.fly.dev/api/v1/users/{userId}/transactions"
enum ErrorMessage {
  USER_NOT_FOUND = "Utilisateur non trouvé",
  TRANSACTIONS_NOT_FOUND = "L'utilisateur n'a pas de transactions",
  SERVER_ERROR = "Erreur lors de la récupération des transactions",
  INVALID_USER_ID = "⚠️ Le paramètre userId doit être un nombre entier positif",
  INVALID_TRANSACTION_ID = "⚠️ Le paramètre transactionId doit être un nombre entier positif",
  TRANSACTION_BY_ID_NOT_FOUND= "Aucune transaction trouvée avec l'id de transaction"
}

const handleErrorResponse = (status: number, errorData: {message: string} ): never => {
  if (status === 404) {
    if (errorData.message?.includes("not found")) {
      throw new Error(ErrorMessage.USER_NOT_FOUND);
    }
    if (errorData.message?.includes("any transactions with id:")) {
      throw new Error(ErrorMessage.TRANSACTION_BY_ID_NOT_FOUND);
    }
  }
  throw new Error(ErrorMessage.SERVER_ERROR);
};

const validateUserId = (userId: number): void => {
  console.assert(
    typeof userId === 'number' && userId >= 0,
    ErrorMessage.INVALID_USER_ID
  );
}

const validateTransactionId = (transactionId: number): void => {
  console.assert(
    typeof transactionId === 'number' && transactionId >= 0,
    ErrorMessage.INVALID_TRANSACTION_ID
  );
}

export const useFetchTransaction = () => {
  const transactions = ref<ITransaction[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)


  const GET_TRANSACTIONS_BY_USER_ID = async (userId: number) => {
    validateUserId(userId)
    const url = API_URL.replace("{userId}", userId.toString())
    loading.value = true
    try {
      const response = await fetch(url)
      switch (response.status) {
        case 200: {
          const data = await response.json()
          if (data.length === 0) {
            throw new Error(ErrorMessage.TRANSACTIONS_NOT_FOUND);
          }
          transactions.value = data
          break
        }
        default: {
          handleErrorResponse(response.status, await response.json())
        }
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : ErrorMessage.SERVER_ERROR
    } finally {
      loading.value = false
    }
  }

  const GET_TRANSACTIONS_BY_USER_ID_AND_TRANSACTION_ID = async (userId: number, transactionId: number) => {
    validateUserId(userId)
    validateTransactionId(transactionId)
    const url = API_URL.replace("{userId}", userId.toString()) + "/" + transactionId.toString()
    loading.value = true
    try {
      const response = await fetch(url)
      switch (response.status) {
        case 200: {
          const data = await response.json()
        transactions.value = data
          break
        }
        default: {
          handleErrorResponse(response.status, await response.json())
        }
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : ErrorMessage.SERVER_ERROR
    } finally {
      loading.value = false
    }
  }



  return { transactions, loading, error, GET_TRANSACTIONS_BY_USER_ID, GET_TRANSACTIONS_BY_USER_ID_AND_TRANSACTION_ID }
}
