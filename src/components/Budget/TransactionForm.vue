<template>
  <div class="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-md mb-2 sm:mb-3 md:mb-4">
    <h2 class="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-4">
      {{ form.type === 'Revenue' ? 'Ajouter un revenu' : 'Ajouter une dépense' }}
    </h2>
    <form
      @submit.prevent="handleSubmit"
      class="grid grid-cols-1 md:grid-cols-2 gap-3 items-end"
    >
      <!-- Description -->
      <div>
        <label class="label text-primary ">
          Description
        </label>
        <input
          v-model="form.description"
          type="text"
          :placeholder="
            form.category === 'Revenue' ? 'Description du revenu' : 'Description de la dépense'
          "
          class="input input-bordered w-full input-sm"
          :class="{ 'border-red-500': errors.description }"
        />
        <p v-if="errors.description" class="text-red-500 text-xs mt-1">
          {{ errors.description }}
        </p>
      </div>

      <!-- Montant -->
      <div>
        <label class="label text-primary "> Montant </label>
        <input
          v-model.number="form.amount"
          type="number"
          placeholder="0"
          class="input input-bordered w-full input-sm"
          :class="{ 'border-red-500': errors.amount }"
        />
        <p v-if="errors.amount" class="text-red-500 text-xs mt-1">
          {{ errors.amount }}
        </p>
      </div>

      <!-- Date de début -->
      <div>
          <label class="label text-primary ">
          Date de début
        </label>
        <input
          v-model="form.startDate"
          type="date"
          class="input input-bordered w-full input-sm "
          :class="{ 'border-red-500': errors.startDate }"
        />
        <p v-if="errors.startDate" class="text-red-500 text-xs mt-1">
          {{ errors.startDate }}
        </p>
      </div>

      <!-- Date de fin -->
      <div>
        <label class="label text-primary ">
          Date de fin
        </label>
        <input
          v-model="form.endDate"
          type="date"
          class="input w-full input-sm"
          :class="{ 'border-red-500': errors.endDate }"
        />
        <p v-if="errors.endDate" class="text-red-500 text-xs mt-1">
          {{ errors.endDate }}
        </p>
      </div>

      <!-- Fréquence -->
      <div>
        <label class="label text-primary "> Fréquence </label>
        <select
          v-model="form.frequency"
          class="select select-bordered w-full input-sm"
          :class="{ 'border-red-500': errors.frequency }"
        >
          <option v-for="(label, key) in FREQUENCY_LABELS" :key="key" :value="EFrequency[key as keyof typeof EFrequency]">
            {{ label }}
          </option>
        </select>
        <p v-if="errors.frequency" class="text-red-500 text-xs mt-1">
          {{ errors.frequency }}
        </p>
      </div>

      <!-- Catégorie -->
      <div>
        <label class="label text-primary">Catégorie</label>
        <div class="dropdown w-full">
          <input
            v-model="form.category"
            type="text"
            class="input input-bordered w-full input-sm"
            :class="{ 'border-red-500': errors.category }"
            placeholder="Sélectionnez ou écrivez une catégorie"
            tabindex="0"
          />
          <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-full">
            <li v-for="categorie in categoriesDisponibles" :key="categorie">
              <a @click="selectCategory(categorie)">{{ categorie }}</a>
            </li>
          </ul>
        </div>
        <p v-if="errors.category" class="text-red-500 text-xs mt-1">
          {{ errors.category  }}
        </p>
      </div>

      <!-- type  -->
      <div>
        <label class="label text-primary "> Type </label>
        <select v-model="form.type" class="select select-bordered w-full input-sm" :class="{ 'border-red-500': errors.type }">
          <option value="" disabled selected>Sélectionnez un type</option>
          <option v-for="(value, key) in EType" :key="key" :value="value">
            {{ key === 'REVENUE' ? 'Revenue' : 'Dépense' }}
          </option>
        </select>
      </div>

      <!-- Statut (reccurent) -->
      <div class="flex items-center">
        <input v-model="form.isDone" type="checkbox" class="toggle toggle-success mr-2"/>
        <label class="label text-primary " :class="{ 'text-success': form.isDone }">
          Récurrent
        </label>
      </div>

      <!-- Bouton de soumission -->
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
import { ref, onMounted, computed } from 'vue'
import { EFrequency, EType, type ITransaction, FREQUENCY_LABELS } from '../../models/transaction.interface'
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
  category: '',
  isDone: false,
  type: EType.EXPENSE,
})

const todayDate = ref(formatTodayDate())

const errors = ref<Partial<Record<keyof ITransaction, string>>>({})



// Définition des catégories prédéfinies
const categoriesDepenses = [
  'Alimentation',
  'Transport',
  'Logement',
  'Loisirs',
  'Santé',
  'Éducation',
  'Factures',
  'Shopping',
  'Vacances',
  'Autres'
]

const categoriesRevenues = [
  'Salaire',
  'Freelance',
  'Investissements',
  'Remboursements',
  'Cadeaux',
  'Autres'
]


const categoriesDisponibles = computed(() => {
  return form.value.type === EType.REVENUE ? categoriesRevenues : categoriesDepenses
})

const validateForm = () => {
  errors.value = {}

  if (!form.value.description) {
    errors.value.description = 'La description est obligatoire.'
  } else if (form.value.description.length < 3) {
    errors.value.description = 'La description doit contenir au moins 3 caractères.'
  } else if (form.value.description.length > 100) {
    errors.value.description = 'La description ne peut pas dépasser 100 caractères.'
  }

  if (form.value.amount === undefined || form.value.amount === null) {
    errors.value.amount = 'Le montant est obligatoire.'
  } else if (form.value.amount <= 0) {
    errors.value.amount = 'Le montant doit être supérieur à 0.'
  }

  if (!form.value.startDate) {
    errors.value.startDate = 'La date de début est obligatoire.'
  }

  if (!form.value.frequency) {
    errors.value.frequency = 'La fréquence est obligatoire.'
  } else if (!Object.values(EFrequency).includes(form.value.frequency)) {
    errors.value.frequency = 'La fréquence sélectionnée est invalide.'
  }

  if (!form.value.category) {
    errors.value.category = 'La catégorie est obligatoire.'
  } else if (form.value.category.length < 2) {
    errors.value.category = 'La catégorie doit contenir au moins 2 caractères.'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  const type = form.value.type === EType.REVENUE ? EType.REVENUE : EType.EXPENSE

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
        user: userStore.user,
      },
      type,
    )

    form.value = {
      description: '',
      amount: 0,
      startDate: new Date(todayDate.value),
      endDate: undefined,
      frequency: EFrequency.Monthly,
      category: '',
      isDone: false,
      type: EType.EXPENSE,
    }
    errors.value = {}
    console.log('Ajout réussi, transactions actuelles :', budgetStore.transactions)
  } catch (error) {
    console.error('Erreur lors de l’ajout de la transaction :', error)
    alert('Une erreur est survenue lors de l’ajout de la transaction.')
  }
}

const selectCategory = (categorie: string) => {
  form.value.category = categorie
  const input = document.activeElement as HTMLElement
  input?.blur()
}

onMounted(() => {
  todayDate.value = formatTodayDate()
  form.value.startDate = new Date(todayDate.value)
})
</script>
