import type { IBankingDetails } from "@/models/bankingDetails.interface";
import { ref } from "vue";

export const useFetchBankingDetails = () => {
  const apiUrl = "https://money-pie-3.fly.dev/api/v1/users/{userId}/banking-details";
  const bankingDetails = ref<IBankingDetails | undefined>();
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function getBankingDetailsByUserId(userId: number) {

    try {

    } catch {

    } finally {
    }
  }

  // Exemple de fonctions supplémentaires
  // async function putBankingDetailsByUserId(userId: number, details: IBankingDetails) {}
  // async function deleteBankingDetailsByUserId(userId: number) {}

  return { bankingDetails, loading, error, getBankingDetailsByUserId };
};
