import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import useFetchUser from '@/services/useFetchUser'
import type { IUser } from '@/models/user.interface'
import useNotification from '@/services/useNotification' // Importez useNotification

// Déclaration de l'enum des messages d'erreur
enum ErrorMessage {
  USER_NOT_FOUND = 'Utilisateur non trouvé',
  USER_DETAILS_NOT_FOUND = "Données pour l'utilisateur non trouvées",
  SERVER_ERROR = "Erreur lors de la récupération des données de l'utilisateur",
  INVALID_USER_ID = 'Le paramètre userId doit être un nombre entier positif',
  INVALID_CREDENTIALS = 'Identifiants invalides',
  CREATE_ACCOUNT_ERROR = 'Erreur lors de la création du compte',
  DECONNECTION_ERROR = 'Erreur lors de la déconnexion',
  PASSWORDS_DO_NOT_MATCH = 'Les mots de passe ne correspondent pas',
}

// Création du store d'authentification
export const useAuth = defineStore('auth', () => {
  const { message } = useNotification() // Utilisez useNotification

  // État global de l'authentification
  const stateAcount = reactive({
    utilisateur: null as IUser | null,
    connecte: false,
    email: '',
    pwd: '',
    confirmPwd: '',
    userName: '',
    loading: false,
    errorMessage: '',
    validationErrors: {
      email: '',
      pwd: '',
      confirmPwd: '',
      userName: '',
    },
    lastActivity: null as Date | null,
  })

  // Appel API du service User
  const userService = useFetchUser()

  // Utilisateur actuel avec ref
  const user = ref<IUser | null>(null) // Utilisateur actuel avec ref= ref<IUser | null>(null)

  /*=======================================================================
    Validation des champs
  =======================================================================*/
  const validateEmail = (email: string): string => {
    if (!email) return "L'email est requis"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Format d'email invalide"
    return ''
  }

  const validatePassword = (password: string): string => {
    if (!password) return 'Le mot de passe est requis'
    if (password.length < 6) return 'Le mot de passe doit contenir au moins 6 caractères'
    if (!/[A-Z]/.test(password)) return 'Le mot de passe doit contenir au moins une majuscule'
    if (!/[0-9]/.test(password)) return 'Le mot de passe doit contenir au moins un chiffre'
    return ''
  }

  const validateConfirmPassword = (confirmPwd: string): string => {
    if (!confirmPwd) return 'La confirmation du mot de passe est requise'
    if (confirmPwd !== stateAcount.pwd) return ErrorMessage.PASSWORDS_DO_NOT_MATCH
    return ''
  }

  const validateUserName = (userName: string): string => {
    if (!userName) return "Le nom d'utilisateur est requis"
    if (userName.length < 3) return "Le nom d'utilisateur doit contenir au moins 3 caractères"
    return ''
  }

  // Met à jour l'objet validationErrors
  const updateValidation = () => {
    stateAcount.validationErrors = {
      email: validateEmail(stateAcount.email),
      pwd: validatePassword(stateAcount.pwd),
      userName: validateUserName(stateAcount.userName),
      confirmPwd: validateConfirmPassword(stateAcount.confirmPwd),
    }
  }

  // Vérifie globalement si le formulaire est valide.
  const isValid = computed(() => {
    return (
      !stateAcount.validationErrors.email &&
      !stateAcount.validationErrors.pwd &&
      (stateAcount.userName ? !stateAcount.validationErrors.userName : true)
    )
  })

  // Fonctions de validation en temps réel
  const validateEmailRealTime = (email: string) => {
    stateAcount.validationErrors.email = validateEmail(email)
  }

  const validatePasswordRealTime = (password: string) => {
    stateAcount.validationErrors.pwd = validatePassword(password)
  }

  const validateConfirmPasswordRealTime = (confirmPwd: string) => {
    stateAcount.validationErrors.confirmPwd = validateConfirmPassword(confirmPwd)
  }
  const validateUserNameRealTime = (userName: string) => {
    stateAcount.validationErrors.userName = validateUserName(userName)
  }

  // Propriétés computed pour connaître l'état de chaque champ individuellement
  const isEmailValid = computed(() => !stateAcount.validationErrors.email)
  const isPasswordValid = computed(() => !stateAcount.validationErrors.pwd)
  const isUserNameValid = computed(() => !stateAcount.validationErrors.userName)
  const isConfirmPasswordValid = computed(() => !stateAcount.validationErrors.confirmPwd)

  // Action de finalisation commune
  const finallyAction = () => {
    stateAcount.loading = false
    stateAcount.email = ''
    stateAcount.pwd = ''
    setTimeout(() => {
      stateAcount.errorMessage = ''
    }, 5000)
  }

  /*=======================================================================
    Méthode de connexion (login)
  =======================================================================*/
  const connecterUtilisateur = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    updateValidation()
    if (!isValid.value) {
      message('Veuillez corriger les erreurs de validation', 'error') // Utilisez message
      return
    }
    stateAcount.loading = true
    stateAcount.errorMessage = ''
    try {
      // Appel API pour récupérer l'utilisateur par email
      await userService.GET_USER_BY_EMAIL(stateAcount.email)
      // Vérification simple du mot de passe
      if (!userService.user.value || userService.user.value.password !== stateAcount.pwd) {
        throw new Error('Identifiants invalides')
      }
      stateAcount.utilisateur = userService.user.value
      stateAcount.connecte = true
      stateAcount.lastActivity = new Date()
      message('Connexion réussie !', 'success') // Utilisez message
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error && error.message ? error.message : ErrorMessage.SERVER_ERROR
      stateAcount.errorMessage = errorMsg
      message(errorMsg, 'error') // Utilisez message
    } finally {
      finallyAction()
    }
  }

  /*=======================================================================
    Méthode d'inscription (création d'un compte)
  =======================================================================*/
  const creerUtilisateur = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    updateValidation()

    if (stateAcount.pwd !== stateAcount.confirmPwd) {
      stateAcount.errorMessage = ErrorMessage.PASSWORDS_DO_NOT_MATCH // Utilisation de l'enum
      message(stateAcount.errorMessage, 'error')
      return
    }

    if (!isValid.value || !stateAcount.userName || stateAcount.pwd !== stateAcount.confirmPwd) {
      message('Veuillez corriger les erreurs de validation', 'error') // Utilisez message
      return
    }
    stateAcount.loading = true
    stateAcount.errorMessage = ''
    try {
      const newUser = {
        firstName: stateAcount.userName,
        email: stateAcount.email,
        password: stateAcount.pwd,
        isActive: true,
      }
      await userService.POST_USER(newUser)
      stateAcount.utilisateur = userService.user.value ?? null
      stateAcount.connecte = true
      stateAcount.lastActivity = new Date()
      message('Compte créé avec succès !', 'success') // Utilisez message
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error && error.message ? error.message : ErrorMessage.CREATE_ACCOUNT_ERROR
      stateAcount.errorMessage = errorMsg
      message(errorMsg, 'error') // Utilisez message
    } finally {
      finallyAction()
    }
  }

  /*=======================================================================
    Méthode de déconnexion
  =======================================================================*/
  const deconnexion = async () => {
    stateAcount.loading = true
    stateAcount.errorMessage = ''
    try {
      // Réinitialiser l'état utilisateur.
      stateAcount.utilisateur = null
      stateAcount.connecte = false
      message('Déconnexion réussie', 'success') // Utilisez message
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error && error.message ? error.message : ErrorMessage.DECONNECTION_ERROR
      stateAcount.errorMessage = errorMsg
      message(errorMsg, 'error') // Utilisez message
    } finally {
      finallyAction()
    }
  }

  return {
    stateAcount,
    user,
    connecterUtilisateur,
    creerUtilisateur,
    deconnexion,
    updateValidation,
    isValid,
    validateEmailRealTime,
    validatePasswordRealTime,
    validateUserNameRealTime,
    validateConfirmPasswordRealTime,
    isEmailValid,
    isPasswordValid,
    isUserNameValid,
    isConfirmPasswordValid,
  }
})
