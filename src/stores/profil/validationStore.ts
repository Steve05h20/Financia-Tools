import { defineStore } from "pinia";

export const useValidationStore = defineStore('validation', () => {
  // Type pour retours de validation
  type ValidationResult = {
    isValid: boolean;
    errorMessage: string;
  };

  // Fonction pour créer résultat de validation
  const createResult = (isValid: boolean, message: string = ''): ValidationResult => {
    return { isValid, errorMessage: isValid ? '' : message };
  };

  const validateEmail = (email: string): ValidationResult => {
    if (!email) return createResult(false, "Entrez une adresse email");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return createResult(regex.test(email), "Format d'email invalide");
  };

  const validateText = (text: string): ValidationResult => {
    if (!text) return createResult(false, "Ce champ est requis");
    const regex = /^[a-zA-Z]+$/;
    return createResult(regex.test(text), "Le texte doit contenir uniquement des lettres");
  };

  const validateTextLength = (text: string, min: number, max: number): ValidationResult => {
    if (!text) return createResult(false, "Ce champ est requis");
    const isValid = text.length >= min && text.length <= max;
    return createResult(isValid, `Le texte doit contenir entre ${min} et ${max} caractères`);
  };

  const validatePhone = (phone: string): ValidationResult => {
    if (!phone) return createResult(false, "Numéro de téléphone requis");
    const regex = /^\d{3}-\d{3}-\d{4}$/;
    return createResult(regex.test(phone), "Format de téléphone invalide (ex: 123-456-7890)");
  };

  const validateDate = (date: Date | null): ValidationResult => {
    if (!date) return createResult(false, "Entrez une date");
    const dateToday = new Date();
    return createResult(date >= dateToday, "La date doit être future ou aujourd'hui");
  };

  const validateAccountInfo = (value: string): ValidationResult => {
    if (!value) return createResult(false, "Numéro de compte requis");
    const regex = /^\d{12}$/;
    return createResult(regex.test(value), "Le numéro de compte doit contenir 12 chiffres");
  };

  const validateSelect = (value: string | number | null | undefined): ValidationResult => {
    if (value === null || value === undefined) return createResult(false, "Sélectionnez une option");
    if (typeof value === 'string' && value.trim() === '') return createResult(false, "Sélectionnez une option");
    if (typeof value === 'number' && isNaN(value)) return createResult(false, "Sélectionnez une option valide");
    return createResult(true);
  };


  return {
    validateEmail,
    validateText,
    validateTextLength,
    validatePhone,
    validateDate,
    validateAccountInfo,
    validateSelect,
  };
});
