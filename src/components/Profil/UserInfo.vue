<script lang="ts" setup>
import InputLabelDiv from '../InputLabelDiv.vue'
import { watch, onMounted } from 'vue'
import { useUserStore } from '@/stores/useUserSotre'
import useValidation from '@/services/useValidation'
import { useEditStore } from '@/stores/profil/useEditStore';

const userStore = useUserStore();
const validation = useValidation();
const editStore = useEditStore();

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
  let isValid = true;

  if (!newValue || newValue.trim() === '') {
    isValid = false;
    validation.validateLastName(newValue, 'lastName');
  } else {
    isValid = validation.validateTextLength(newValue, 2, 50, 'lastName');

    if (isValid) {
      validation.validateLastName(newValue, 'lastName');
    }
  }
});

watch(() => userStore.user.firstName, (newValue: string) => {
  let isValid = true;

  if (newValue && newValue.trim() !== '') {
    isValid = validation.validateTextLength(newValue, 2, 50, 'firstName');
  } else {
    isValid = false;
    validation.validateFirstname(newValue, 'firstName');
  }

  if (isValid) {
    validation.validateFirstname(newValue, 'firstName');
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
        :hasError="!!validation.errors.value.lastName"
        :errorMessage="validation.errors.value.lastName"
        :disabled="!editStore.isEditing"
      />
    </div>

    <div>
      <InputLabelDiv
        labelText="Prénom"
        htmlFor="firstName"
        required
        v-model="userStore.user.firstName"
        placeholder="placeholder"
        :hasError="!!validation.errors.value.firstName"
        :errorMessage="validation.errors.value.firstName"
        :disabled="!editStore.isEditing"
      />
    </div>

    <div>
      <InputLabelDiv
        labelText="Date de naissance"
        htmlFor="birthDate"
        required
        v-model="userStore.user.birthDate"
        placeholder="placeholder"
        type="date"
        :hasError="!!validation.errors.value.birthDate"
        :errorMessage="validation.errors.value.birthDate"
        :disabled="!editStore.isEditing"
      />
    </div>

    <div>
      <InputLabelDiv
        labelText="Téléphone"
        htmlFor="phone"
        required
        v-model="userStore.user.phone"
        placeholder="123-456-7890"
        type="tel"
        :hasError="!!validation.errors.value.phone"
        :errorMessage="validation.errors.value.phone"
        :disabled="!editStore.isEditing"
      />
    </div>

    <div>
      <InputLabelDiv
        labelText="Courriel"
        htmlFor="email"
        required
        v-model="userStore.user.email"
        placeholder="exemple@domaine.com"
        type="email"
        :hasError="!!validation.errors.value.email"
        :errorMessage="validation.errors.value.email"
        :disabled="!editStore.isEditing"
      />
    </div>
  </div>
</template>

