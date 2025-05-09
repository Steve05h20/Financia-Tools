import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { useUserStore } from '@/stores/useUserSotre'
import { useBudgetStore } from '@/stores/useBudgetStore'
import type { IUser } from '@/models/user.interface'
import useNotification from '@/services/useNotification'
import useValidation from '@/services/useValidation'


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
  const validation = useValidation()

  // État global de l'authentification
  const stateAcount = reactive({
    utilisateur: null as IUser | null,
    isConnected: false,
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

  // Utilisation du store userStore pour accéder à userService
  const userStore = useUserStore()
  const budgetStore = useBudgetStore()
  const userService = userStore.userService

  // Utilisateur actuel avec ref
  const user = ref<IUser | null>(null)

  const updateValidation = () => {
    // Réinitialiser les erreurs
    validation.resetErrors()

    validation.validateEmail(stateAcount.email, 'email')
    validation.validatePassword(stateAcount.pwd, 'password')
    validation.validateUserName(stateAcount.userName, 'userName')

    if (stateAcount.confirmPwd) {
      validation.validateConfirmPassword(stateAcount.confirmPwd, stateAcount.pwd, 'confirmPassword')
    }

    // Copier les erreurs de validation dans stateAcount.validationErrors
    stateAcount.validationErrors = {
      email: validation.errors.value.email || '',
      pwd: validation.errors.value.password || '',
      userName: validation.errors.value.userName || '',
      confirmPwd: validation.errors.value.confirmPassword || '',
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
    validation.validateEmail(email, 'email')
    stateAcount.validationErrors.email = validation.errors.value.email || ''
  }


  const validatePasswordRealTime = (password: string) => {
    validation.validatePassword(password, 'password')
    stateAcount.validationErrors.pwd = validation.errors.value.password || ''
  }

  const validateConfirmPasswordRealTime = (confirmPwd: string) => {
    validation.validateConfirmPassword(confirmPwd, stateAcount.pwd, 'confirmPassword')
    stateAcount.validationErrors.confirmPwd = validation.errors.value.confirmPassword || ''
  }
  const validateUserNameRealTime = (userName: string) => {
    validation.validateUserName(userName, 'userName')
    stateAcount.validationErrors.userName = validation.errors.value.userName || ''
  }

  // Propriétés computed pour connaître l'état de chaque champ individuellement
  const isEmailValid = computed(() => !stateAcount.validationErrors.email)
  const isPasswordValid = computed(() => !stateAcount.validationErrors.pwd)
  const isUserNameValid = computed(() => !stateAcount.validationErrors.userName)
  const isConfirmPasswordValid = computed(() => !stateAcount.validationErrors.confirmPwd)

  const resetForm = () => {
    stateAcount.userName = ''
    stateAcount.email = ''
    stateAcount.pwd = ''
    stateAcount.confirmPwd = ''
    stateAcount.errorMessage = ''
    stateAcount.validationErrors = {
      userName: '',
      email: '',
      pwd: '',
      confirmPwd: ''
    }
    validation.resetErrors()
  }

  // Action de finalisation commune
  const finallyAction = () => {
    stateAcount.loading = false
    resetForm()
  }

  /*=======================================================================
    Méthode de connexion (login)
  =======================================================================*/
  const connecterUtilisateur = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    updateValidation()
    if (!isValid.value) {
      message('Veuillez corriger les erreurs de validation', 'error')
      return
    }
    stateAcount.loading = true
    stateAcount.errorMessage = ''
    try {
      // Appel API pour récupérer l'utilisateur par email
      await userService.GET_USER_BY_EMAIL(stateAcount.email)

      // Vérifiez si userService.user est défini avant d'accéder à ses propriétés
      if (!userService.user || !userService.user) {
        throw new Error('Identifiants invalides')
      }

      // Vérification simple du mot de passe
      if (!userService.user || userService.user.password !== stateAcount.pwd) {
        throw new Error('Identifiants invalides')
      }

      // Mettre à jour l'état de l'utilisateur
      stateAcount.utilisateur = userService.user
      userStore.isConnected = true

      // Charger toutes les données de l'utilisateur
      await userStore.loadUserData(stateAcount.utilisateur.email)

      // Vérifier que l'utilisateur a bien un ID
      if (!userStore.user.id) {
        throw new Error('ID utilisateur non disponible')
      }

      stateAcount.lastActivity = new Date()
      message('Connexion reussie !', 'success')
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error && error.message ? error.message : ErrorMessage.SERVER_ERROR
      stateAcount.errorMessage = errorMsg
      message(errorMsg, 'error')
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
      stateAcount.errorMessage = ErrorMessage.PASSWORDS_DO_NOT_MATCH
      message(stateAcount.errorMessage, 'error')
      return
    }

    if (!isValid.value || !stateAcount.userName || stateAcount.pwd !== stateAcount.confirmPwd) {
      message('Veuillez corriger les erreurs de validation', 'error')
      return
    }
    stateAcount.loading = true
    stateAcount.errorMessage = ''
    try {
      // Ne pas inclure le téléphone s'il n'est pas défini ou vide
      const newUser:IUser = {
        firstName: stateAcount.userName,
        email: stateAcount.email,
        password: stateAcount.pwd,
        isActive: true,
        phone: '0000000000',
        birthDate: undefined,
        lastName: undefined
      }

      console.log('Données utilisateur avant création:', JSON.stringify(newUser, null, 2))
      await userService.POST_USER(newUser)

      // Récupérer l'utilisateur créé
      await userService.GET_USER_BY_EMAIL(stateAcount.email)
      console.log('Données utilisateur après récupération:', JSON.stringify(userService.user, null, 2))

      // Mettre à jour l'état de l'utilisateur
      if (userService.user) {
        stateAcount.utilisateur = userService.user
        userStore.isConnected = true
        userStore.user = userService.user

        // Charger toutes les données de l'utilisateur
        await userStore.loadUserData(stateAcount.utilisateur.email)
        console.log('Données utilisateur après chargement:', JSON.stringify(userStore.user, null, 2))

        stateAcount.lastActivity = new Date()
        message('Compte créé avec succès !', 'success')
      }
    } catch (error: unknown) {
      console.error('Erreur lors de la création:', error)
      const errorMsg =
        error instanceof Error && error.message ? error.message : ErrorMessage.CREATE_ACCOUNT_ERROR
      stateAcount.errorMessage = errorMsg
      message(errorMsg, 'error')
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
      // Réinitialiser l'état utilisateur
      userStore.resetUser()
      userStore.isConnected = false
      // Vider les transactions
      budgetStore.clearTransactions()
      message('Déconnexion réussie', 'success')
    } catch (error: unknown) {
      const errorMsg =
        error instanceof Error && error.message ? error.message : ErrorMessage.DECONNECTION_ERROR
      stateAcount.errorMessage = errorMsg
      message(errorMsg, 'error')
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
    resetForm
  }
})
