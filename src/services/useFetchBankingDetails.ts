import type { IBankingDetails } from "@/models/bankingDetails.interface";
import { ref } from "vue";

const API_URL = "https://money-pie-3.fly.dev/api/v1/users/{userId}/banking-details";

enum ErrorMessage {
  USER_NOT_FOUND = "Utilisateur non trouvé",
  BANKING_DETAILS_NOT_FOUND = "L'utilisateur n'a pas de détails bancaires",
  SERVER_ERROR = "Erreur lors de la récupération des détails bancaires",
  INVALID_USER_ID = "⚠️ Le paramètre userId doit être un nombre entier positif"
}

const handleErrorResponse = (status: number, errorData: {message: string} ): never => {
  if (status === 404) {
    if (errorData.message?.includes("not found")) {
      throw new Error(ErrorMessage.USER_NOT_FOUND);
    }
    if (errorData.message?.includes("does not have any saved banking details")) {
      throw new Error(ErrorMessage.BANKING_DETAILS_NOT_FOUND);
    }
  }
  throw new Error(ErrorMessage.SERVER_ERROR);
};

const validateUserId = (userId: number): void => {
  console.assert(
    typeof userId === 'number' && userId >= 0,
    ErrorMessage.INVALID_USER_ID
  );
};



export const useFetchBankingDetails = () => {
  const bankingDetails = ref<IBankingDetails | undefined>();
  const loading = ref(false);
  const error = ref<string | null>(null);


  async function getBankingDetailsByUserId(userId: number): Promise<void> {
    validateUserId(userId);
    error.value = null;

    try {
      loading.value = true;
      const response = await fetch(API_URL.replace("{userId}", userId.toString()));

      switch (response.status) {
        case 200: {
          const data = await response.json();
          if (!data) {
            throw new Error(ErrorMessage.BANKING_DETAILS_NOT_FOUND);
          }
          bankingDetails.value = data;
          break;
        }
        default: {
          const errorData = await response.json();
          handleErrorResponse(response.status, errorData);
        }
      }
    } catch (err: unknown) {
      bankingDetails.value = undefined;
      error.value = err instanceof Error ? err.message : ErrorMessage.SERVER_ERROR;
    } finally {
      loading.value = false;
    }
  }

  const putBankingDetailsByUserId = async (userId: number, details: IBankingDetails) => {
    validateUserId(userId);
    error.value = null;

    try {
      loading.value = true;
      const response = await fetch(API_URL.replace("{userId}", userId.toString()), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });

      switch (response.status) {
        case 200: {
          getBankingDetailsByUserId(userId);
          break;
        }
        default: {
          const errorData = await response.json();
          handleErrorResponse(response.status, errorData);
        }
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : ErrorMessage.SERVER_ERROR;
    } finally {
      loading.value = false;
    }
  }

  const deleteBankingDetailsByUserId = async (userId: number) => {
    validateUserId(userId);
    error.value = null;

    try {
      loading.value = true;
      const response = await fetch(API_URL.replace("{userId}", userId.toString()), {
        method: "DELETE",
      });

      switch (response.status) {
        case 200: {
          bankingDetails.value = undefined;
          getBankingDetailsByUserId(userId);
          break;
        }
        default: {
          const errorData = await response.json();
          handleErrorResponse(response.status, errorData);
        }
      }
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : ErrorMessage.SERVER_ERROR;
    } finally {
      loading.value = false;
    }
  }



  return { bankingDetails, loading, error, getBankingDetailsByUserId, putBankingDetailsByUserId ,deleteBankingDetailsByUserId};
};


