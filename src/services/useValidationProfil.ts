import { ref } from 'vue';

enum ErrorMessage {
  EMPTY_LASTNAME = 'Nom requis',
  EMPTY_FIRSTNAME = 'Prénom requis',
  EMPTY_EMAIL = 'Email requis',
  EMPTY_ADDRESS = 'Addresse requise',
  EMPTY_CITY = 'Ville requise',
  EMPTY_STREET = 'Le nom de rue est requis',
  EMPTY_PHONE = 'Numéro de téléphone requis',
  EMPTY_INSTITUTION_NAME = 'Nom de votre institution bancaire requis',
  EMPTY_ACCOUNT_INFO = 'Numéro de compte requis',
  EMPTY_SELECT = 'Veuillez sélectionner une option',
  EMPTY_DATE = 'Veuillez entrer une date',
  ONLY_LETTERS = 'Veuillez entrer seulement des lettres',
  STRING_LENGTH = 'Veuillez entrer un texte entre 2 et 50 caractères',
  INVALID_EMAIL = 'Veuillez entrer un email valide',
  INVALID_PHONE = 'Le numéro de téléphone doit être sous le format 123-456-7890',
  INVALID_BANKING_INFO = 'Numéro de compte à 10 chiffres requis',
  DATE_PREVIOUS = 'Veuillez entrer une date antérieure à la date actuelle',
  DATE_FUTURE = 'Veuillez entrer une date postérieure à la date actuelle',
  DIGIT_IN_STREET_NUMBER = 'L\'addresse doit commencer et contenir des chiffres ex:102-A',
}

interface ValidationErrors {
  firstname: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  street: string;
  institutionName: string;
  accountInfo: string;
  birthDate: string;
  appointmentDate: string;
  select: string;
  [key: string]: string;
}

const useValidationProfil = () => {

  const errors = ref<ValidationErrors>({
    firstname: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    street: '',
    institutionName: '',
    accountInfo: '',
    birthDate: '',
    appointmentDate: '',
    select: ''
  });

  const resetErrors = (): void => {
    Object.keys(errors.value).forEach(key => {
      errors.value[key] = '';
    });
  };

  const validateEmail = (email: string | undefined, fieldName: keyof ValidationErrors = 'email'): boolean => {
    if (!email) {
      errors.value[fieldName] = ErrorMessage.EMPTY_EMAIL;
      return false;
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(email);

    errors.value[fieldName] = isValid ? '' : ErrorMessage.INVALID_EMAIL;
    return isValid;
  };

  const validateText = (text: string | undefined, fieldName: keyof ValidationErrors): boolean => {
    if (!text) {
      errors.value[fieldName] = "Ce champ est requis";
      return false;
    }

    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ'’ -]+$/;
    const isValid = regex.test(text);

    errors.value[fieldName] = isValid ? '' : ErrorMessage.ONLY_LETTERS;
    return isValid;
  };

  const validateDegitsStreet = (text: string | undefined, fieldName: keyof ValidationErrors): boolean => {
    if (!text) {
      errors.value[fieldName] = "Ce champ est requis";
      return false;
    }

    const regex = /^[0-9]+([a-zA-Z0-9-]*)?$/;
    const isValid = regex.test(text);

    errors.value[fieldName] = isValid ? '' : ErrorMessage.DIGIT_IN_STREET_NUMBER;
    return isValid;
  }

  const validateTextLength = (
    text: string | undefined,
    min: number,
    max: number,
    fieldName: keyof ValidationErrors
  ): boolean => {
    if (!text) {
      errors.value[fieldName] = "Ce champ est requis";
      return false;
    }

    const isValid = text.length >= min && text.length <= max;

    errors.value[fieldName] = isValid ? '' : ErrorMessage.STRING_LENGTH;
    return isValid;
  };

  const validateLastName = (lastName: string | undefined, fieldName: keyof ValidationErrors = 'lastName'): boolean => {
    if (!lastName) {
      errors.value[fieldName] = ErrorMessage.EMPTY_LASTNAME;
      return false;
    }

    const isValid = validateText(lastName, fieldName);

    return isValid;
  };

  const validateFirstname = (firstname: string | undefined, fieldName: keyof ValidationErrors = 'firstName'): boolean => {
    if (!firstname) {
      errors.value[fieldName] = ErrorMessage.EMPTY_FIRSTNAME;
      return false;
    }

    const isValid = validateText(firstname, fieldName);

    return isValid;
  };

  const validateCity = (city: string | undefined, fieldName: keyof ValidationErrors = 'city'): boolean => {
    if (!city) {
      errors.value[fieldName] = ErrorMessage.EMPTY_CITY;
      return false;
    }

    const isLengthValid = validateTextLength(city, 2, 50, fieldName);
    if (!isLengthValid) {
      return false;
    }

    const isValid = validateText(city, fieldName);

    return isValid;
  };

  const validateAddress = (address: string | undefined, fieldName: keyof ValidationErrors = 'address'): boolean => {
    if (!address) {
      errors.value[fieldName] = ErrorMessage.EMPTY_ADDRESS;
      return false;
    }

    const isLengthValid = validateTextLength(address, 1, 50, fieldName);
    if (!isLengthValid) {
      return false;
    }

    const isValid = validateDegitsStreet(address, fieldName);

    return isValid;
  };

  const validateStreet = (street: string | undefined, fieldName: keyof ValidationErrors = 'street'): boolean => {
    if (!street) {
      errors.value[fieldName] = ErrorMessage.EMPTY_STREET;
      return false;
    }

    const isValid = validateTextLength(street, 2, 50, fieldName);

    return isValid;
  };

  const validatePhone = (phone: string | undefined, fieldName: keyof ValidationErrors = 'phone'): boolean => {
    if (!phone) {
      errors.value[fieldName] = ErrorMessage.EMPTY_PHONE;
      return false;
    }

    const regex = /^\d{10}$|^\d{3}-\d{3}-\d{4}$/;
    const isValid = regex.test(phone);

    errors.value[fieldName] = isValid ? '' : ErrorMessage.INVALID_PHONE;
    return isValid;
  };

  const validatePrevDate = (
    date: Date | string | undefined,
    fieldName: keyof ValidationErrors = 'birthDate'
  ): boolean => {
    if (!date) {
      errors.value[fieldName] = ErrorMessage.EMPTY_DATE;
      return false;
    }

    let dateObj: Date;

    if (typeof date === 'string') {
      dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        errors.value[fieldName] = ErrorMessage.EMPTY_DATE;
        return false;
      }
    } else {
      dateObj = date;
    }

    const dateToday = new Date();
    const isValid = dateObj < dateToday;

    errors.value[fieldName] = isValid ? '' : ErrorMessage.DATE_PREVIOUS;
    return isValid;
  };

  const validateFutureDate = (
    date: Date | string | undefined,
    fieldName: keyof ValidationErrors = 'appointmentDate'
  ): boolean => {
    if (!date) {
      errors.value[fieldName] = '';
      return true;
    }

    let dateObj: Date;

    if (typeof date === 'string') {
      dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        errors.value[fieldName] = ErrorMessage.EMPTY_DATE;
        return false;
      }
    } else {
      dateObj = date;
    }

    const today = new Date();
    const todayNormalized = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const dateObjNormalized = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());

    const isValid = dateObjNormalized >= todayNormalized;

    errors.value[fieldName] = isValid ? '' : ErrorMessage.DATE_FUTURE;
    return isValid;
  };

  const validateInstitutionName = (institutionName: string | undefined, fieldName: keyof ValidationErrors = 'institutionName'): boolean => {
    if (!institutionName) {
      errors.value[fieldName] = ErrorMessage.EMPTY_INSTITUTION_NAME;
      return false;
    }

    const isValid = validateText(institutionName, fieldName);

    return isValid;
  };


  const validateAccountInfo = (
    value: string | undefined,
    fieldName: keyof ValidationErrors = 'accountInfo'
  ): boolean => {
    if (!value) {
      errors.value[fieldName] = ErrorMessage.EMPTY_ACCOUNT_INFO;
      return false;
    }

    const regex = /^\d{10}$/;
    const isValid = regex.test(value);

    errors.value[fieldName] = isValid ? '' : ErrorMessage.INVALID_BANKING_INFO;
    return isValid;
  };

  const validateSelect = (
    value: string | number | null | undefined,
    fieldName: keyof ValidationErrors = 'select'
  ): boolean => {
    const isEmpty =
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '');

    errors.value[fieldName] = isEmpty ? ErrorMessage.EMPTY_SELECT : '';
    return !isEmpty;
  };

  const validateAll = (user: any): boolean => {
    resetErrors();

    let isValid = true;

    // Validation des informations de base de l'utilisateur
    if (!validateLastName(user.lastName)) isValid = false;
    if (!validateFirstname(user.firstName)) isValid = false;
    if (!validateEmail(user.email)) isValid = false;
    if (!validatePhone(user.phone)) isValid = false;
    if (!validatePrevDate(user.birthDate, 'birthDate')) isValid = false;

    // Validation des informations bancaires
    if (user.bankingDetails && user.bankingDetails.length > 0) {
      const banking = user.bankingDetails[0];
      if (!validateInstitutionName(banking.institutionName, 'institutionName')) isValid = false;
      if (!validateAccountInfo(banking.accountInfo, 'accountInfo')) isValid = false;
    }

    // Validation des informations scolaires
    if (user.schoolDetails && user.schoolDetails.length > 0) {
      const school = user.schoolDetails[0];
      if (!validateInstitutionName(school.schoolName, 'schoolName')) isValid = false;
      if (!validateSelect(school.fieldOfStudy, 'fieldOfStudy')) isValid = false;
      if (!validatePrevDate(school.startDate, 'startDate')) isValid = false;
      if (!validateFutureDate(school.projectedEndDate, 'projectedEndDate')) isValid = false;
    }

    // Validation des adresses
    if (user.addresses && user.addresses.length > 0) {
      for (const address of user.addresses) {

        if (!validateAddress(address.streetNumber, 'streetNumber')) isValid = false;
        if (!validateStreet(address.streetName, 'streetName')) isValid = false;
        if (!validateCity(address.city, 'city')) isValid = false;
        if (!validateSelect(address.province, 'province')) isValid = false;
        if (!validateSelect(address.country, 'country')) isValid = false;
      }
    }

    return isValid;
  };

  return{
    validateEmail,
    validateText,
    validateDegitsStreet,
    validateTextLength,
    validateLastName,
    validateFirstname,
    validateCity,
    validateAddress,
    validateStreet,
    validatePhone,
    validatePrevDate,
    validateFutureDate,
    validateInstitutionName,
    validateAccountInfo,
    validateSelect,
    validateAll,
    ErrorMessage,
    resetErrors,
    errors
  }

};

export default useValidationProfil;
