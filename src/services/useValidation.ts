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
  EMPTY_SCHOOL_NAME = 'Nom de votre établissement scolaire requis',
  EMPTY_ACCOUNT_INFO = 'Numéro de compte requis',
  EMPTY_SELECT = 'Veuillez sélectionner une option',
  EMPTY_DATE = 'Veuillez entrer une date',
  ONLY_LETTERS = 'Veuillez entrer seulement des lettres',
  STRING_LENGTH = 'Veuillez entrer entre {min} et {max} caractères',
  INVALID_EMAIL = 'Veuillez entrer un email valide',
  INVALID_PHONE = 'Le numéro de téléphone doit être sous le format 123-456-7890',
  INVALID_BANKING_INFO = 'Numéro de compte à 10 chiffres requis',
  DATE_PREVIOUS = 'Veuillez entrer une date antérieure à la date actuelle',
  DATE_FUTURE = 'Veuillez entrer une date postérieure à la date actuelle',
  DIGIT_IN_STREET_NUMBER = 'L\'addresse doit commencer et contenir des chiffres ex:102-A',
  USER_NOT_FOUND = 'Utilisateur non trouvé',
  USER_DETAILS_NOT_FOUND = "Données pour l'utilisateur non trouvées",
  PASSWORDS_DO_NOT_MATCH = 'Les mots de passe ne correspondent pas',
  EMPTY_PASSWORD = 'Mot de passe requis',
  INVALID_PASSWORD_UPPERCASE = 'Le mot de passe doit contenir au moins une lettre majuscule',
  INVALID_PASSWORD_LENGTH = 'Le mot de passe doit contenir au moins 6 caractères',
  INVALID_PASSWORD_DIGIT='Le mot de passe doit contenir au moins un chiffre',
  INVALID_USERNAME = 'Le nom d\'utilisateur doit contenir au moins 3 caractères',
  EMPTY_USERNAME = 'Le nom d\'utilisateur est requis',
  INVALID_FIRSTNAME='Le prénom doit contenir seulement des lettres',
  INVALID_LASTNAME='Le nom de famille doit contenir seulement des lettres',
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
  password: string;
  confirmPassword: string;
  [key: string]: string;
}

const useValidation = () => {

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
    select: '',
    password: '',
    confirmPassword: 'string'
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

  const getStringLengthError = (min: number, max: number): string => {
    return ErrorMessage.STRING_LENGTH.replace('{min}', min.toString()).replace('{max}', max.toString());
  };

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

    errors.value[fieldName] = isValid ? '' : getStringLengthError(min, max);
    return isValid;
  };

  const validateNonRequiredTextLength = (
    text: string | undefined,
    min: number,
    max: number,
    fieldName: keyof ValidationErrors
  ): boolean => {
    if (!text) {
      errors.value[fieldName] = '';
      return true;
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

    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\-_']+$/;
    if (!regex.test(lastName)) {
      errors.value[fieldName] = ErrorMessage.INVALID_LASTNAME;
      return false;
    }

    errors.value[fieldName] = '';
    return true;
  };

  const validateFirstname = (firstname: string | undefined, fieldName: keyof ValidationErrors = 'firstName'): boolean => {
    if (!firstname) {
      errors.value[fieldName] = ErrorMessage.EMPTY_FIRSTNAME;
      return false;
    }

    const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\-_']+$/;
    if (!regex.test(firstname)) {
      errors.value[fieldName] = ErrorMessage.INVALID_FIRSTNAME;
      return false;
    }
    errors.value[fieldName] = '';
    return true;
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

  const validateSchoolName = (schoolName: string | undefined, fieldName: keyof ValidationErrors = 'schoolName'): boolean => {
    if (!schoolName) {
      errors.value[fieldName] = ErrorMessage.EMPTY_SCHOOL_NAME;
      return false;
    }

    const isValid = validateText(schoolName, fieldName);

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

  const validateUserName = (userName: string | undefined, fieldName: keyof ValidationErrors = 'userName'): boolean => {
    if (!userName) {
      errors.value[fieldName] = ErrorMessage.EMPTY_USERNAME;
      return false;
    }

    if (userName.length < 3) {
      errors.value[fieldName] = ErrorMessage.INVALID_USERNAME;
      return false;
    }

    errors.value[fieldName] = '';
    return true;
  };

  const validatePassword = (password: string | undefined, fieldName: keyof ValidationErrors = 'password'): boolean => {
    if (!password) {
      errors.value[fieldName] = ErrorMessage.EMPTY_PASSWORD;
      return false;
    }

    if (password.length < 6) {
      errors.value[fieldName] = ErrorMessage.INVALID_PASSWORD_LENGTH;
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      errors.value[fieldName] = ErrorMessage.INVALID_PASSWORD_UPPERCASE;
      return false;
    }

    if (!/[0-9]/.test(password)) {
      errors.value[fieldName] = ErrorMessage.INVALID_PASSWORD_DIGIT;
      return false;
    }

    errors.value[fieldName] = '';
    return true;
  };

  const validateConfirmPassword = (confirmPassword: string | undefined, password: string | undefined, fieldName: keyof ValidationErrors = 'confirmPassword'): boolean => {
    if (!confirmPassword) {
      errors.value[fieldName] = ErrorMessage.EMPTY_PASSWORD;
      return false;
    }

    if (confirmPassword !== password) {
      errors.value[fieldName] = ErrorMessage.PASSWORDS_DO_NOT_MATCH;
      return false;
    }

    errors.value[fieldName] = '';
    return true;
  };

  // Dans useValidation.ts
  // Dans useValidation.ts
const validateAll = (user: any): boolean => {
  resetErrors();
  let isValid = true;

  // Validation des informations de base de l'utilisateur (toujours requises)
  if (!validateLastName(user.lastName)) isValid = false;
  if (!validateFirstname(user.firstName)) isValid = false;
  if (!validateEmail(user.email)) isValid = false;
  if (!validatePhone(user.phone)) isValid = false;
  if (!validatePrevDate(user.birthDate, 'birthDate')) isValid = false;

  // Validation des informations bancaires - seulement si des données sont présentes
  if (user.bankingDetails && user.bankingDetails.length > 0) {
    const banking = user.bankingDetails[0];
    const hasBankingData = banking.institutionName || banking.accountInfo || banking.loanInfo || banking.other;

    if (hasBankingData) {
      if (!validateInstitutionName(banking.institutionName, 'institutionName')) isValid = false;
      if (!validateAccountInfo(banking.accountInfo, 'accountInfo')) isValid = false;
    }
  }

  // Validation des informations scolaires - seulement si des données sont présentes
  if (user.schoolDetails && user.schoolDetails.length > 0) {
    const school = user.schoolDetails[0];
    const hasSchoolData = school.schoolName || school.fieldOfStudy || school.startDate || school.projectedEndDate;

    if (hasSchoolData) {
      if (!validateSchoolName(school.schoolName, 'schoolName')) isValid = false;
      if (!validateSelect(school.fieldOfStudy, 'fieldOfStudy')) isValid = false;
      if (!validatePrevDate(school.startDate, 'startDate')) isValid = false;
      if (!validateFutureDate(school.projectedEndDate, 'projectedEndDate')) isValid = false;
    }
  }

  // Validation des adresses - seulement si des données sont présentes
  if (user.addresses && user.addresses.length > 0) {
    for (const address of user.addresses) {
      const hasAddressData = address.streetNumber || address.streetName || address.city || address.province || address.country || address.type;

      if (hasAddressData) {
        if (!validateAddress(address.streetNumber, 'streetNumber')) isValid = false;
        if (!validateStreet(address.streetName, 'streetName')) isValid = false;
        if (!validateCity(address.city, 'city')) isValid = false;
        if (!validateSelect(address.province, 'province')) isValid = false;
        if (!validateSelect(address.country, 'country')) isValid = false;
        if (!validateSelect(address.type, 'type')) isValid = false;
      }
    }
  }

  return isValid;
};

  return{
    validateEmail,
    validateText,
    validateDegitsStreet,
    validateTextLength,
    validateNonRequiredTextLength,
    validateLastName,
    validateFirstname,
    validateCity,
    validateAddress,
    validateStreet,
    validatePhone,
    validatePrevDate,
    validateFutureDate,
    validateSchoolName,
    validateInstitutionName,
    validateAccountInfo,
    validateSelect,
    validateUserName,
    validatePassword,
    validateConfirmPassword,
    validateAll,
    ErrorMessage,
    resetErrors,
    errors
  }

};

export default useValidation;
