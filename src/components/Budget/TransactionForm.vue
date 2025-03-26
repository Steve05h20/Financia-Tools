<template>
  <div class="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-md mb-2 sm:mb-3 md:mb-4">
    <h2 class="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-4">
      {{ form.category === 'Revenue' ? 'Ajouter un revenu' : 'Ajouter une dépense' }}
    </h2>
    <form
      @submit.prevent="handleSubmit"
      class="grid grid-cols-1 md:grid-cols-2 gap-3"
    >
      <div>
<<<<<<< HEAD
        <label class="block text-xs sm:text-sm md:text-base text-gray-600 mb-1">Description</label>
=======
        <label class="label text-primary ">
          Description
        </label>
>>>>>>> refs/remotes/origin/PageBudget/cristian
        <input
          v-model="form.description"
          type="text"
          :placeholder="
            form.category === 'Revenue' ? 'Description du revenu' : 'Description de la dépense'
          "
          class="input input-bordered w-full input-sm"
          :class="{ 'border-red-500': errors.description }"
        />
        <p v-if="errors.description" class="text-red-500 text-xs mt-1">{{ errors.description }}</p>
      </div>
      <div>
<<<<<<< HEAD
        <label class="block text-xs sm:text-sm md:text-base text-gray-600 mb-1">Montant</label>
=======
        <label class="label text-primary "> Montant </label>
>>>>>>> refs/remotes/origin/PageBudget/cristian
        <input
          v-model.number="form.amount"
          type="number"
          placeholder="0"
          class="input input-bordered w-full input-sm"
          :class="{ 'border-red-500': errors.amount }"
        />
        <p v-if="errors.amount" class="text-red-500 text-xs mt-1">{{ errors.amount }}</p>
      </div>
      <div>
<<<<<<< HEAD
        <label class="block text-xs sm:text-sm md:text-base text-gray-600 mb-1"
          >Date de début</label
        >
=======
          <label class="label text-primary ">
          Date de début
        </label>
>>>>>>> refs/remotes/origin/PageBudget/cristian
        <input
          v-model="form.startDate"
          type="date"
          class="input input-bordered w-full input-sm "
          :class="{ 'border-red-500': errors.startDate }"
        />
        <p v-if="errors.startDate" class="text-red-500 text-xs mt-1">{{ errors.startDate }}</p>
      </div>
      <div>
<<<<<<< HEAD
        <label class="block text-xs sm:text-sm md:text-base text-gray-600 mb-1">Date de fin</label>
=======
        <label class="label text-primary ">
          Date de fin
        </label>
>>>>>>> refs/remotes/origin/PageBudget/cristian
        <input
          v-model="form.endDate"
          type="date"
          class="input w-full input-sm"
          :class="{ 'border-red-500': errors.endDate }"
        />
        <p v-if="errors.endDate" class="text-red-500 text-xs mt-1">{{ errors.endDate }}</p>
      </div>
      <div>
<<<<<<< HEAD
        <label class="block text-xs sm:text-sm md:text-base text-gray-600 mb-1">Fréquence</label>
=======
        <label class="label text-primary "> Fréquence </label>
>>>>>>> refs/remotes/origin/PageBudget/cristian
        <select
          v-model="form.frequency"
          class="input input-bordered w-full input-sm"
          :class="{ 'border-red-500': errors.frequency }"
        >
          <option v-for="(value, key) in EFrequency" :key="key" :value="value">{{ key }}</option>
        </select>
        <p v-if="errors.frequency" class="text-red-500 text-xs mt-1">{{ errors.frequency }}</p>
      </div>
      <div>
<<<<<<< HEAD
        <label class="block text-xs sm:text-sm md:text-base text-gray-600 mb-1">Catégorie</label>
=======
        <label class="label text-primary "> Catégorie </label>
>>>>>>> refs/remotes/origin/PageBudget/cristian
        <select
          v-model="form.category"
          class="input input-bordered w-full input-sm"
          :class="{ 'border-red-500': errors.category }"
        >
          <option value="Dépenses">Dépenses</option>
          <option value="Revenue">Revenue</option>
        </select>
        <p v-if="errors.category" class="text-red-500 text-xs mt-1">{{ errors.category }}</p>
      </div>
      <div class="flex items-center">
        <input v-model="form.isDone" type="checkbox" class="toggle toggle-success mr-2"/>
        <label class="label text-primary ">
          {{ form.category === 'Revenue' ? 'Reçu' : 'Payée' }}
        </label>
      </div>
<<<<<<< HEAD
=======


      <!-- Bouton de soumission -->
>>>>>>> refs/remotes/origin/PageBudget/cristian
      <div class="md:col-span-2 flex justify-center">
        <button
          type="submit"
          class="btn btn-primary "
        >
          {{ form.category === 'Revenue' ? 'Ajouter le revenu' : 'Ajouter la dépense' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { EFrequency, EType, type ITransaction } from '../../models/transaction.interface'
import { useBudgetStore } from '../../stores/useBudgetStore'
import { useUserStore } from '../../stores/useUserSotre'

const budgetStore = useBudgetStore()
const userStore = useUserStore()

const formatTodayDate = () => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

const form = ref<Partial<ITransaction>>({
  description: '',
  amount: 0,
  startDate: new Date(formatTodayDate()),
  endDate: undefined,
  frequency: EFrequency.Monthly,
  category: 'Dépenses',
  isDone: false,
})

const errors = ref<Partial<Record<keyof ITransaction, string>>>({})

const validateForm = () => {
  errors.value = {}
  if (!form.value.description) errors.value.description = 'La description est obligatoire.'
  if (form.value.amount === undefined || form.value.amount <= 0)
    errors.value.amount = 'Le montant doit être supérieur à 0.'
  if (!form.value.startDate) errors.value.startDate = 'La date de début est obligatoire.'
  if (!form.value.frequency) errors.value.frequency = 'La fréquence est obligatoire.'
  if (!form.value.category) errors.value.category = 'La catégorie est obligatoire.'
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  const type = form.value.category === 'Revenue' ? EType.REVENUE : EType.EXPENSE

  try {
    await budgetStore.addTransactionByType(
      {
        description: form.value.description!,
        amount: form.value.amount!,
        startDate: new Date(form.value.startDate!),
        endDate: form.value.endDate ? new Date(form.value.endDate) : undefined,
        frequency: form.value.frequency!,
        category: form.value.category!,
        isDone: form.value.isDone ?? false,
        user: userStore.user
      },
      type,
    )
    form.value = {
      description: '',
      amount: 0,
<<<<<<< HEAD
      startDate: formatTodayDate(),
=======
      startDate: new Date(todayDate.value),
>>>>>>> refs/remotes/origin/PageBudget/cristian
      endDate: undefined,
      frequency: EFrequency.Monthly,
      category: 'Dépenses',
      isDone: false,
    }
    errors.value = {}
  } catch (error) {
    console.error('Erreur lors de l’ajout :', error)
    alert('Erreur lors de l’ajout.')
  }
}

onMounted(() => {
<<<<<<< HEAD
  form.value.startDate = formatTodayDate()
=======
  todayDate.value = formatTodayDate()
  form.value.startDate = new Date(todayDate.value)
>>>>>>> refs/remotes/origin/PageBudget/cristian
})
</script>
