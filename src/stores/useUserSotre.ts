import type { IUser } from "@/models/user.interface";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import useFetchUser from "@/services/useFetchUser";
import { useFetchAddress } from "@/services/useFetchAddress";
import { useFetchTransaction } from "@/services/useFetchTransaction";
import { useFetchSchoolDetails } from "@/services/useFetchSchoolDetails";
import { useFetchBankingDetails } from "@/services/useFetchBankingDetails";
import useNotification from "@/services/useNotification";

export const useUserStore = defineStore('user', () => {
  // Services
  const userService = useFetchUser();
  const addressService = useFetchAddress();
  const transactionService = useFetchTransaction();
  const schoolDetailsService = useFetchSchoolDetails();
  const bankingDetailsService = useFetchBankingDetails();
  const notificationService = useNotification();

  // État
  const user = ref<IUser>({
    id: 0,
    firstName: "",
    lastName: "",
    birthDate: "",
    isActive: false,
    phone: "",
    email: "",
    password: "",
    addresses: [],
    transactions: [],
    schoolDetails: [],
    bankingDetails: []
  });

  // État global pour les erreurs et le chargement
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);

  // Surveiller les changements d'erreur dans les services
  watch([
    () => userService.error.value,
    () => addressService.error.value,
    () => transactionService.error.value,
    () => schoolDetailsService.error.value,
    () => bankingDetailsService.error.value
  ], (newErrors) => {
    newErrors.forEach((newError) => {
      if (newError) error.value = newError;
    });
  });

  // Surveiller les changements de chargement dans les services
  watch([
    () => userService.loading.value,
    () => addressService.loading.value,
    () => transactionService.loading.value,
    () => schoolDetailsService.loading.value,
    () => bankingDetailsService.loading.value
  ], (loadingValues) => {
    loading.value = loadingValues.some(value => value === true);
  });

  // Méthode pour gérer les erreurs
  const handleError = (err: unknown) => {
    error.value = err instanceof Error ? err.message : "Une erreur est survenue";
    notificationService.message(error.value, "error");
  };

  // Méthode pour réinitialiser l'utilisateur
  function resetUser() {
    user.value = {
      id: 0,
      firstName: "",
      lastName: "",
      birthDate: "",
      isActive: false,
      phone: "",
      email: "",
      password: "",
      addresses: [],
      transactions: [],
      schoolDetails: [],
      bankingDetails: []
    };
  }

  // Méthode pour charger toutes les données d'un utilisateur
  const loadUserData = async (email: string) => {
    error.value = null;
    try {
      // Récupérer l'utilisateur par son email
      await userService.GET_USER_BY_EMAIL(email);
      if (!userService.user.value || typeof userService.user.value.id !== 'number') {
        throw new Error("Utilisateur non trouvé ou ID invalide");
      }

      Object.assign(user.value, userService.user.value);
      const userId: number = userService.user.value.id;

      // Récupérer les adresses
      await addressService.getAddressesByUserId(userId);
      if (addressService.addresses.value) {
        user.value.addresses = addressService.addresses.value;
      }

      // Récupérer les transactions
      await transactionService.GET_TRANSACTIONS_BY_USER_ID(userId);
      if (transactionService.transactions.value) {
        user.value.transactions = transactionService.transactions.value;
      }

      // Récupérer les détails scolaires
      await schoolDetailsService.GET_SCHOOL_DETAILS_BY_USER_ID(userId);
      if (schoolDetailsService.schoolDetails.value) {
        user.value.schoolDetails = [schoolDetailsService.schoolDetails.value];
      }

      // Récupérer les détails bancaires
      await bankingDetailsService.getBankingDetailsByUserId(userId);
      if (bankingDetailsService.bankingDetails.value) {
        user.value.bankingDetails = [bankingDetailsService.bankingDetails.value];
      }

      notificationService.message("Toutes les données utilisateur ont été chargées", "success");
    } catch (err) {
      handleError(err);
    }
  };

  return {
    // État
    user,
    error,
    loading,

    // Services
    userService,
    addressService,
    schoolDetailsService,
    bankingDetailsService,
    notificationService,
    transactionService,

    // Méthodes utilitaires
    resetUser,
    loadUserData
  };
});

