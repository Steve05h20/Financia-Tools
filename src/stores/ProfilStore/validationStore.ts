import { defineStore } from "pinia";

export const useValidationStore = defineStore('validation', () => {

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validateText = (text: string): boolean => {
    const regex = /^[a-zA-Z]+$/
    return regex.test(text)
  }

  const validateTextLenght = (text: string, min: number, max: number): boolean => {
    return text.length >= min && text.length <= max
  }

  const validatePhone = (phone: string): boolean => {
    const regex = /^\d{3}-\d{3}-\d{4}$/
    return regex.test(phone)
  }

  const validateDate = (date: Date): boolean => {
    const dateToday = new Date()
    return date >= dateToday
  }

  const validateAccountInfo = (value: string): boolean => {
    const regex = /^\d{12}$/
    return regex.test(value)
  }

  const validateSelect = (value: string | number | null | undefined): boolean => {
    if (typeof value === 'string') {
      return value.trim() !== ''
    }
    if (typeof value === 'number') {
      return !isNaN(value)
    }
    return value !== null && value !== undefined
  }

  return {
    validateEmail,
    validateText,
    validateTextLenght,
    validatePhone,
    validateDate,
    validateAccountInfo,
    validateSelect,
  }
})
