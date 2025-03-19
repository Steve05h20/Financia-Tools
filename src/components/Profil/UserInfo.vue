<script lang="ts" setup>
import InputLabelDiv from '../InputLabelDiv.vue'
import { ref, onMounted } from 'vue'
import type { IUser} from '@/models/user.interface'
import { useValidationStore } from '@/stores/profil/UseValidationStore'
import { useEditStore } from '@/stores/profil/useEditStore'

const validationStore = useValidationStore();
const editStore = useEditStore();

const user = ref<Partial<IUser>>({
  lastName: '',
  firstName: '',
  birthDate: undefined,
  phone: '',
  email: ''
})

const errors = ref<{ [key: string]: string }>({
  lastName: '',
  firstName: '',
  birthDate: '',
  phone: '',
  email: ''
});

const validateLastName = () => {
  if(!user.value.lastName) {
    errors.value.lastName = "Le nom est requis";
    return;
  }

  errors.value.lastName = validationStore.validateTextLength(
    user.value.lastName, 2, 50
  );
};

const validateFirstName = () => {
 if(!user.value.firstName) {
    errors.value.firstName = "Le prénom est requis";
    return;
  }

  errors.value.firstName = validationStore.validateTextLength(
    user.value.firstName, 2, 50
  );
};

const validateBirthDate = () => {
  errors.value.birthDate = validationStore.validatePrevDate(user.value.birthDate);
};

const validatePhone = () => {
  errors.value.phone = validationStore.validatePhone(user.value.phone);
};

const validateEmail = () => {
  errors.value.email = validationStore.validateEmail(user.value.email);
};


const validateForm = () => {
  validateLastName();
  validateFirstName();
  validateBirthDate();
  validatePhone();
  validateEmail();

  return isFormValid();
};

const isFormValid = () => {
  return Object.values(errors.value).every(error => error === '');
};

onMounted(() => {
  editStore.registerValidation(validateForm);
});

</script>


 <template>
  <div class="grid grid-cols-3 max-sm:grid-cols-1 gap-5 transition-all">
    <div>
      <InputLabelDiv
        labelText="Nom de famille"
        htmlFor="lastName"
        required
        v-model="user.lastName"
        placeholder="placeholder"
        @input="validateLastName"
        @blur="validateLastName"
      />
      <div v-if="errors.lastName" class="text-red-500 text-sm mt-1">
        {{ errors.lastName }}
      </div>
    </div>

    <div>
      <InputLabelDiv
        labelText="Prénom"
        htmlFor="firstName"
        required
        v-model="user.firstName"
        placeholder="placeholder"
        @input="validateFirstName"
        @blur="validateFirstName"
      />
      <div v-if="errors.firstName" class="text-red-500 text-sm mt-1">
        {{ errors.firstName }}
      </div>
    </div>

    <div>
      <InputLabelDiv
        labelText="Date de naissance"
        htmlFor="birthDate"
        required
        v-model="user.birthDate"
        placeholder="placeholder"
        type="date"
        @input="validateBirthDate"
        @blur="validateBirthDate"
      />
      <div v-if="errors.birthDate" class="text-red-500 text-sm mt-1">
        {{ errors.birthDate }}
      </div>
    </div>

    <div>
      <InputLabelDiv
        labelText="Téléphone"
        htmlFor="phone"
        required
        v-model="user.phone"
        placeholder="123-456-7890"
        type="tel"
        @input="validatePhone"
        @blur="validatePhone"
      />
      <div v-if="errors.phone" class="text-red-500 text-sm mt-1">
        {{ errors.phone }}
      </div>
    </div>

    <div>
      <InputLabelDiv
        labelText="Courriel"
        htmlFor="email"
        required
        v-model="user.email"
        placeholder="exemple@domaine.com"
        type="email"
        @input="validateEmail"
        @blur="validateEmail"
      />
      <div v-if="errors.email" class="text-red-500 text-sm mt-1">
        {{ errors.email }}
      </div>
    </div>
  </div>
</template>


<style>
</style>
