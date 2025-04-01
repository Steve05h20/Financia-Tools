import { computed, ref } from "vue";
import useNotification from "./useNotification";

//Types de sections
export enum AccordionSection {
  PERSONAL_INFO = 'personalInfo',
  ADDRESSES = 'addresses',
  SCHOOL_DETAILS = 'schoolDetails',
  BANKING_INFO = 'bankingInfo'
}

export default function useAccordionValidation() {
  const notification = useNotification();

  // Permettre null pour pouvoir fermer toutes les sections
  const activeSection = ref<AccordionSection | null>(AccordionSection.PERSONAL_INFO);

  // Refs pour suivre l'état de validation de chaque section
  const personalInfoHasErrors = ref<boolean>(false);
  const addressesHasErrors = ref<boolean>(false);
  const schoolDetailsHasErrors = ref<boolean>(false);
  const bankingInfoHasErrors = ref<boolean>(false);

  // Vérifier si une section contient des erreurs
  const hasSectionErrors = (section: AccordionSection | null): boolean => {
    if (section === null) return false;

    switch (section) {
      case AccordionSection.PERSONAL_INFO:
        return personalInfoHasErrors.value;
      case AccordionSection.ADDRESSES:
        return addressesHasErrors.value;
      case AccordionSection.SCHOOL_DETAILS:
        return schoolDetailsHasErrors.value;
      case AccordionSection.BANKING_INFO:
        return bankingInfoHasErrors.value;
      default:
        return false;
    }
  };

  const hasActiveErrors = computed(() => {
    if (activeSection.value === null) return false;
    return hasSectionErrors(activeSection.value);
  });

  const updatePersonalInfoValidation = (hasErrors: boolean) => {
    personalInfoHasErrors.value = hasErrors;
  };

  const updateAddressesValidation = (hasErrors: boolean) => {
    addressesHasErrors.value = hasErrors;
  };

  const updateSchoolDetailsValidation = (hasErrors: boolean) => {
    schoolDetailsHasErrors.value = hasErrors;
  };

  const updateBankingInfoValidation = (hasErrors: boolean) => {
    bankingInfoHasErrors.value = hasErrors;
  };

  // Changer de section avec validation
  const changeSection = (section: AccordionSection) => {
    // Si on clique sur la section déjà active, on la ferme
    if (activeSection.value === section) {
      activeSection.value = null;
      return;
    }

    // Si la section active a des erreurs, empêcher le changement
    if (activeSection.value !== null && hasActiveErrors.value) {
      notification.message("Veuillez corriger les erreurs avant de changer de section.", "error");
      return;
    }

    // Changer de section
    activeSection.value = section;
  };

  return {
    activeSection,
    hasSectionErrors,
    hasActiveErrors,
    updatePersonalInfoValidation,
    updateAddressesValidation,
    updateSchoolDetailsValidation,
    updateBankingInfoValidation,
    personalInfoHasErrors,
    addressesHasErrors,
    schoolDetailsHasErrors,
    bankingInfoHasErrors,
    changeSection
  };
}
