import { ref } from 'vue'
import { useEditStore } from '@/stores/profil/useEditStore'

const useAddFormToggle = () => {
  const editStore = useEditStore()

  // État détermine si le formulaire doit être affiché
  const showForm = ref<boolean>(false)

  // Vérifie si les données existent et ne sont pas vides
  const checkDataExists = (data: any[] | undefined): void => {
    // Affiche le formulaire si le tableau existe et n'est pas vide
    showForm.value = Boolean(data && data.length > 0)
  }

  return {
    showForm,
    checkDataExists,
    editStore
  }
}

export default useAddFormToggle
