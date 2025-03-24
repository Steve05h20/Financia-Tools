<template>
  <div class="bg-white p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 rounded-lg shadow-md mb-4 sm:mb-5 md:mb-6">
    <h2 class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-5 md:mb-6">
      {{ form.category === 'Revenue' ? 'Ajouter un revenu' : 'Ajouter une facture' }}
    </h2>
    <form
      @submit.prevent="handleSubmit"
      class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8"
    >
      <!-- Description -->
      <div>
        <label class="block text-sm sm:text-base md:text-lg text-gray-600 mb-1 sm:mb-2">
          Description
        </label>
        <input
          v-model="form.description"
          type="text"
          :placeholder="
            form.category === 'Revenue' ? 'Description du revenu' : 'Description de la facture'
          "
          class="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base md:text-lg"
          :class="{ 'border-red-500': errors.description }"
        />
        <p
          v-if="errors.description"
          class="text-red-500 text-xs sm:text-sm md:text-base mt-1 sm:mt-2"
        >
          {{ errors.description }}
        </p>
      </div>

      <!-- Montant -->
      <div>
        <label class="block text-sm sm:text-base md:text-lg text-gray-600 mb-1 sm:mb-2">
          Montant
        </label>
        <input
          v-model.number="form.amount"
          type="number"
          placeholder="0"
          class="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base md:text-lg"
          :class="{ 'border-red-500': errors.amount }"
        />
        <p v-if="errors.amount" class="text-red-500 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
          {{ errors.amount }}
        </p>
      </div>

      <!-- Date de début -->
      <div>
        <label class="block text-sm sm:text-base md:text-lg text-gray-600 mb-1 sm:mb-2">
          Date de début
        </label>
        <input
          v-model="form.startDate"
          type="date"
          class="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base md:text-lg"
          :class="{ 'border-red-500': errors.startDate }"
        />
        <p
          v-if="errors.startDate"
          class="text-red-500 text-xs sm:text-sm md:text-base mt-1 sm:mt-2"
        >
          {{ errors.startDate }}
        </p>
      </div>

      <!-- Date de fin -->
      <div>
        <label class="block text-sm sm:text-base md:text-lg text-gray-600 mb-1 sm:mb-2">
          Date de fin
        </label>
        <input
          v-model="form.endDate"
          type="date"
          class="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base md:text-lg"
          :class="{ 'border-red-500': errors.endDate }"
        />
        <p v-if="errors.endDate" class="text-red-500 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
          {{ errors.endDate }}
        </p>
      </div>

      <!-- Fréquence -->
      <div>
        <label class="block text-sm sm:text-base md:text-lg text-gray-600 mb-1 sm:mb-2">
          Fréquence
        </label>
        <select
          v-model="form.frequency"
          class="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base md:text-lg"
          :class="{ 'border-red-500': errors.frequency }"
        >
          <option v-for="(value, key) in EFrequency" :key="key" :value="value">
            {{ key }}
          </option>
        </select>
        <p
          v-if="errors.frequency"
          class="text-red-500 text-xs sm:text-sm md:text-base mt-1 sm:mt-2"
        >
          {{ errors.frequency }}
        </p>
      </div>

      <!-- Catégorie -->
      <div>
        <label class="block text-sm sm:text-base md:text-lg text-gray-600 mb-1 sm:mb-2">
          Catégorie
        </label>
        <select
          v-model="form.category"
          class="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base md:text-lg"
          :class="{ 'border-red-500': errors.category }"
        >
          <option value="Factures">Factures</option>
          <option value="Revenue">Revenue</option>
        </select>
        <p v-if="errors.category" class="text-red-500 text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
          {{ errors.category }}
        </p>
      </div>

      <!-- Statut (Payée) -->
      <div class="flex items-center">
        <input
          v-model="form.isDone"
          type="checkbox"
          class="mr-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
        />
        <label class="text-sm sm:text-base md:text-lg text-gray-600">
          {{ form.category === 'Revenue' ? 'Reçu' : 'Payée' }}
        </label>
      </div>

      <!-- Bouton de soumission -->
      <div class="md:col-span-2 flex justify-center">
        <button
          type="submit"
          class="btn btn-primary text-sm sm:text-base md:text-lg px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
          {{ form.category === 'Revenue' ? 'Ajouter le revenu' : 'Ajouter la facture' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EFrequency, EType, ITransaction } from '../../models/transaction.interface'
import { useBudgetStore } from '../../stores/useBudgetStore'

const budgetStore = useBudgetStore()

const form = ref<Partial<ITransaction>>({
  description: '',
  amount: 0,
  startDate: undefined,
  endDate: undefined,
  frequency: EFrequency.Monthly,
  category: 'Factures',
  isDone: false,
})

const errors = ref<Partial<Record<keyof ITransaction, string>>>({})

const validateForm = () => {
  errors.value = {}

  // Validation de la description
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

  // Validation de la date de début - uniquement vérifier si le champ est rempli
  if (!form.value.startDate) {
    errors.value.startDate = 'La date de début est obligatoire.'
  }

  // Aucune validation complexe pour la date de fin

  // Validation de la fréquence
  if (!form.value.frequency) {
    errors.value.frequency = 'La fréquence est obligatoire.'
  } else if (!Object.values(EFrequency).includes(form.value.frequency)) {
    errors.value.frequency = 'La fréquence sélectionnée est invalide.'
  }

  // Validation de la catégorie
  if (!form.value.category) {
    errors.value.category = 'La catégorie est obligatoire.'
  } else if (!['Factures', 'Revenue'].includes(form.value.category)) {
    errors.value.category = 'La catégorie sélectionnée est invalide.'
  }

  return Object.keys(errors.value).length === 0
}

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
      startDate: undefined,
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
