<template>
  <div class="bg-white p-5 rounded-lg shadow-md mb-5">
    <h2 class="text-lg font-semibold mb-4">Ajouter une facture</h2>
    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Description -->
      <div>
        <label class="block text-sm text-gray-600 mb-1">Description</label>
        <input
          v-model="form.description"
          type="text"
          placeholder="Description de la facture"
          class="w-full p-2 border rounded-md"
          :class="{ 'border-red-500': errors.description }"
        />
        <p v-if="errors.description" class="text-red-500 text-sm mt-1">{{ errors.description }}</p>
      </div>

      <!-- Montant -->
      <div>
        <label class="block text-sm text-gray-600 mb-1">Montant</label>
        <input
          v-model.number="form.amount"
          type="number"
          placeholder="0"
          class="w-full p-2 border rounded-md"
          :class="{ 'border-red-500': errors.amount }"
        />
        <p v-if="errors.amount" class="text-red-500 text-sm mt-1">{{ errors.amount }}</p>
      </div>

      <!-- Date de début -->
      <div>
        <label class="block text-sm text-gray-600 mb-1">Date de début</label>
        <input
          v-model="form.startDate"
          type="date"
          class="w-full p-2 border rounded-md"
          :class="{ 'border-red-500': errors.startDate }"
        />
        <p v-if="errors.startDate" class="text-red-500 text-sm mt-1">{{ errors.startDate }}</p>
      </div>

      <!-- Date de fin -->
      <div>
        <label class="block text-sm text-gray-600 mb-1">Date de fin</label>
        <input
          v-model="form.endDate"
          type="date"
          class="w-full p-2 border rounded-md"
          :class="{ 'border-red-500': errors.endDate }"
        />
        <p v-if="errors.endDate" class="text-red-500 text-sm mt-1">{{ errors.endDate }}</p>
      </div>

      <!-- Fréquence -->
      <div>
        <label class="block text-sm text-gray-600 mb-1">Fréquence</label>
        <select
          v-model="form.frequency"
          class="w-full p-2 border rounded-md"
          :class="{ 'border-red-500': errors.frequency }"
        >
          <option v-for="(value, key) in EFrequency" :key="key" :value="value">
            {{ key }}
          </option>
        </select>
        <p v-if="errors.frequency" class="text-red-500 text-sm mt-1">{{ errors.frequency }}</p>
      </div>

      <!-- Catégorie -->
      <div>
        <label class="block text-sm text-gray-600 mb-1">Catégorie</label>
        <select
          v-model="form.category"
          class="w-full p-2 border rounded-md"
          :class="{ 'border-red-500': errors.category }"
        >
          <option value="Factures">Factures</option>
          <option value="Revenue">Revenue</option>
        </select>
        <p v-if="errors.category" class="text-red-500 text-sm mt-1">{{ errors.category }}</p>
      </div>

      <!-- Statut (Payée) -->
      <div class="flex items-center">
        <input v-model="form.isDone" type="checkbox" class="mr-2" />
        <label class="text-sm text-gray-600">Payée</label>
      </div>

      <!-- Bouton de soumission -->
      <div class="md:col-span-2">
        <button type="submit" class="btn max-sm:btn-xl btn-primary">Ajouter la facture</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EFrequency, EType, ITransaction } from '../../models/transaction.interface'
import { useBudgetStore } from '../../stores/useBudgetStore'

const budgetStore = useBudgetStore()

// État du formulaire
const form = ref<Partial<ITransaction>>({
  description: '',
  amount: 0,
  startDate: new Date().toISOString().split('T')[0],
  endDate: undefined,
  frequency: EFrequency.Monthly,
  category: 'Factures',
  isDone: false,
})

// État des erreurs de validation
const errors = ref<Partial<Record<keyof ITransaction, string>>>({})

const getMinimumEndDate = (startDate: Date, frequency: EFrequency): Date => {
  const minEndDate = new Date(startDate)
  switch (frequency) {
    case EFrequency.Daily:
      minEndDate.setDate(startDate.getDate() + 1)
      break
    case EFrequency.Weekly:
      minEndDate.setDate(startDate.getDate() + 7)
      break
    case EFrequency.Monthly:
      minEndDate.setMonth(startDate.getMonth() + 1)
      break

    default:
      minEndDate.setDate(startDate.getDate() + 1)
  }
  return minEndDate
}

const validateForm = () => {
  errors.value = {}

  if (!form.value.description) {
    errors.value.description = 'La description est obligatoire.'
  } else if (form.value.description.length < 3) {
    errors.value.description = 'La description doit contenir au moins 3 caractères.'
  } else if (form.value.description.length > 100) {
    errors.value.description = 'La description ne peut pas dépasser 100 caractères.'
  }

  // Validation du montant
  if (form.value.amount === undefined || form.value.amount === null) {
    errors.value.amount = 'Le montant est obligatoire.'
  } else if (form.value.amount <= 0) {
    errors.value.amount = 'Le montant doit être supérieur à 0.'
  }

  // Validation de la date de début
  if (!form.value.startDate) {
    errors.value.startDate = 'La date de début est obligatoire.'
  } else {
    const startDate = new Date(form.value.startDate)
    if (isNaN(startDate.getTime())) {
      errors.value.startDate = 'La date de début doit être une date valide.'
    } else {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (startDate > today) {
        errors.value.startDate = 'La date de début ne peut pas être dans le futur.'
      }
    }
  }

  if (form.value.endDate) {
    const endDate = new Date(form.value.endDate)
    if (isNaN(endDate.getTime())) {
      errors.value.endDate = 'La date de fin doit être une date valide.'
    } else {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (endDate > today) {
        errors.value.endDate = 'La date de fin ne peut pas être dans le futur.'
      }

      if (form.value.startDate) {
        const startDate = new Date(form.value.startDate)
        if (endDate < startDate) {
          errors.value.endDate = 'La date de fin doit être postérieure ou égale à la date de début.'
        } else if (form.value.frequency) {
          const minEndDate = getMinimumEndDate(startDate, form.value.frequency)
          if (endDate < minEndDate) {
            errors.value.endDate = `La date de fin doit être au moins après le ${minEndDate.toISOString().split('T')[0]} en fonction de la fréquence sélectionnée.`
          }
        }
      }
    }
  }

  if (!form.value.frequency) {
    errors.value.frequency = 'La fréquence est obligatoire.'
  } else if (!Object.values(EFrequency).includes(form.value.frequency)) {
    errors.value.frequency = 'La fréquence sélectionnée est invalide.'
  }

  if (!form.value.category) {
    errors.value.category = 'La catégorie est obligatoire.'
  } else if (!['Factures', 'Revenue'].includes(form.value.category)) {
    errors.value.category = 'La catégorie sélectionnée est invalide.'
  }

  return Object.keys(errors.value).length === 0
}

// Gestion de la soumission
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

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
      },
      type,
    )

    form.value = {
      description: '',
      amount: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: undefined,
      frequency: EFrequency.Monthly,
      category: 'Factures',
      isDone: false,
    }
    errors.value = {}
  } catch (error) {
    console.error("Erreur lors de l'ajout de la transaction:", error)
    alert("Une erreur est survenue lors de l'ajout de la transaction.")
  }
}
</script>
