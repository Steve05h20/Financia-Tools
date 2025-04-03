import { ref } from 'vue'
import { useEditStore } from '@/stores/profil/useEditStore'

const useAddFormToggle = () => {
  const editStore = useEditStore()

  const showForm = ref<boolean>(false)

  const checkDataExists = (data: any[] | undefined): void => {
    showForm.value = Boolean(data && data.length > 0)
  }

  return {
    showForm,
    checkDataExists,
    editStore
  }
}

export default useAddFormToggle
