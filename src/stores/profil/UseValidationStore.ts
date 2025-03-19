import { defineStore } from "pinia";

export const useValidationStore = defineStore('validation', () => {

  const validateEmail = (email: string | undefined): string => {
    if (!email) return "Entrez une adresse email";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) ? '' : "Format d'email invalide";
  };

  const validateText = (text: string | undefined): string => {
    if (!text) return "Ce champ est requis";
    const regex = /^[a-zA-Z]+$/;
    return regex.test(text) ? '' : "Le texte doit contenir uniquement des lettres";
  };

  const validateTextLength = (text: string | undefined, min: number, max: number): string => {
    if (!text) return "Ce champ est requis";
    return (text.length >= min && text.length <= max)
      ? ''
      : `Doit contenir entre ${min} et ${max} caractères`;
  };

  const validatePhone = (phone: string | undefined): string => {
    if (!phone) return "Numéro de téléphone requis";
    const regex = /^\d{3}-\d{3}-\d{4}$/;
    return regex.test(phone) ? '' : "Format de téléphone invalide (ex: 123-456-7890)";
  };

  const validatePrevDate = (date: Date | string | undefined): string => {
    if (!date) return "Entrez une date";

    let dateObj: Date;

    if (typeof date === 'string') {
      dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        return "Format de date invalide";
      }
    } else {
      dateObj = date;
    }

    const dateToday = new Date();
    return dateObj < dateToday ? '' : "La date doit être passée";
  };

  const validateFutureDate = (date: Date | string | undefined): string => {
    if (!date) return "Entrez une date";

    let dateObj: Date;

    if (typeof date === 'string') {
      dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) {
        return "Format de date invalide";
      }
    } else {
      dateObj = date;
    }

    const today = new Date();
    const todayNormalized = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const dateObjNormalized = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());

    return dateObjNormalized >= todayNormalized ? '' : "La date doit être aujourd'hui ou future";
  };

  const validateAccountInfo = (value: string | undefined): string => {
    if (!value) return "Numéro de compte requis";
    const regex = /^\d{12}$/;
    return regex.test(value) ? '' : "Le numéro de compte doit contenir 12 chiffres";
  };

  const validateSelect = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined) return "Sélectionnez une option";
    if (typeof value === 'string' && value.trim() === '') return "Sélectionnez une option";
    if (typeof value === 'number' && isNaN(value)) return "Sélectionnez une option valide";
    return '';
  };

  const isFormValid = (errors: Record<string, string>): boolean => {
    return Object.values(errors).every(error => error === '');
  };

  return {
    validateEmail,
    validateText,
    validateTextLength,
    validatePhone,
    validatePrevDate,
    validateFutureDate,
    validateAccountInfo,
    validateSelect,
    isFormValid
  };
});
