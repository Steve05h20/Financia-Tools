<script lang="ts" setup>
import InputLabelDiv from '../InputLabelDiv.vue'
import { watch, onMounted } from 'vue'
import { useUserStore } from '@/stores/useUserSotre'
import useValidationProfil from '@/services/useValidationProfil'

const userStore = useUserStore();
const validation = useValidationProfil();

onMounted(async () => {
  validation.resetErrors();
  emitValidationState();
});

const emit = defineEmits(['validation-change']);

const emitValidationState = () => {
  const hasErrors = Object.values(validation.errors.value).some(error => error !== '');
  emit('validation-change', hasErrors);
};

watch(() => validation.errors.value, () => {
  emitValidationState();
}, { deep: true });

watch(() => userStore.user.lastName, (newValue: string | undefined) => {
  if (!newValue || newValue.trim() === '') {
    validation.validateLastName(newValue, 'lastName');
  } else {
    validation.validateTextLength(newValue, 2, 50, 'lastName');
  }
});

watch(() => userStore.user.firstName, (newValue: string) => {
  if (!newValue || newValue.trim() === '') {
    validation.validateFirstname(newValue, 'firstName');
  } else {
    validation.validateTextLength(newValue, 2, 50, 'firstName');
  }
});

watch(() => userStore.user.birthDate, (newValue: string | Date | undefined) => {
  if (!newValue) {
    validation.errors.value.birthDate = validation.ErrorMessage.EMPTY_DATE;
  } else {
    validation.validatePrevDate(newValue, 'birthDate');
  }
});

watch(() => userStore.user.phone, (newValue: string | undefined) => {
  if (!newValue || newValue.trim() === '') {
    validation.errors.value.phone = validation.ErrorMessage.EMPTY_PHONE;
  } else {
    validation.validatePhone(newValue, 'phone');
  }
});

watch(() => userStore.user.email, (newValue: string) => {
  if (!newValue || newValue.trim() === '') {
    validation.errors.value.email = validation.ErrorMessage.EMPTY_EMAIL;
  } else {
    validation.validateEmail(newValue, 'email');
  }
});
</script>


 <template>
  <div class="grid grid-cols-3 max-sm:grid-cols-1 gap-5 transition-all">
    <div>
      <InputLabelDiv
        labelText="Nom de famille"
        htmlFor="lastName"
        required
        v-model="userStore.user.lastName"
        placeholder="placeholder"
      />
      <div v-if="validation.errors.value.lastName" class="text-red-500 text-sm mt-1">
        {{ validation.errors.value.lastName }}
      </div>
    </div>

    <div>
      <InputLabelDiv
        labelText="Prénom"
        htmlFor="firstName"
        required
        v-model="userStore.user.firstName"
        placeholder="placeholder"
      />
      <div v-if="validation.errors.value.firstName" class="text-red-500 text-sm mt-1">
        {{ validation.errors.value.firstName }}
      </div>
    </div>

    <div>
      <InputLabelDiv
        labelText="Date de naissance"
        htmlFor="birthDate"
        required
        v-model="userStore.user.birthDate"
        placeholder="placeholder"
        type="date"
      />
      <div v-if="validation.errors.value.birthDate" class="text-red-500 text-sm mt-1">
        {{ validation.errors.value.birthDate }}
      </div>
    </div>

    <div>
      <InputLabelDiv
        labelText="Téléphone"
        htmlFor="phone"
        required
        v-model="userStore.user.phone"
        placeholder="123-456-7890"
        type="tel"
      />
      <div v-if="validation.errors.value.phone" class="text-red-500 text-sm mt-1">
        {{ validation.errors.value.phone }}
      </div>
    </div>

    <div>
      <InputLabelDiv
        labelText="Courriel"
        htmlFor="email"
        required
        v-model="userStore.user.email"
        placeholder="exemple@domaine.com"
        type="email"
      />
      <div v-if="validation.errors.value.email" class="text-red-500 text-sm mt-1">
        {{ validation.errors.value.email }}
      </div>
    </div>
  </div>
</template>


<style>
</style>
